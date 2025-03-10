package Backend.streaming.Service

import Backend.streaming.Model.DB.User
import Backend.streaming.Model.DB.Video
import Backend.streaming.Model.DTO.VideoDTO
import Backend.streaming.Model.DTO.VideoEditDTO
import Backend.streaming.Model.Projections.VideoProjection
import Backend.streaming.Repository.PlaylistVideoRepository
import Backend.streaming.Repository.UserRepository
import Backend.streaming.Repository.VideoRepository
import Backend.streaming.Repository.videoFeedbackRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.nio.file.AccessDeniedException
import java.time.LocalDateTime

@Service
class VideoService (
    private val videoRepository: VideoRepository,
    private val userRepository: UserRepository,
    private val videoFeedbackRepository: videoFeedbackRepository ,// To fetch user details
    private val playlistVideoRepository: PlaylistVideoRepository
) {

    @Transactional
    fun createVideo(VideoDTO: VideoDTO, username: String): Video? {
        // Fetch the user from the repository using userId
        val user = userRepository.findByUsername(username) ?: throw RuntimeException("User doesn't exist!")

        // Create a new Video instance
        val video = Video(
            title = VideoDTO.title,
            description = VideoDTO.description,
            category = VideoDTO.category,
            s3Link = null,
            user = user // Set the user reference
        )

        // Save the video to the database
        return videoRepository.save(video)
    }

    @Transactional
    fun deleteVideo(username:String, videoId: Long){
        println(" $username and the id is $videoId")
        if(!videoRepository.existsByVideoIdAndUserUsername(videoId, username)){
            throw IllegalArgumentException("Video wasn't Found or Video not owned by User!")
        }
        playlistVideoRepository.deleteAllByVideoVideoId(videoId)
        // Double-check if any references remain (defensive check)
        if (playlistVideoRepository.countByVideoVideoId(videoId) > 0) {
            println("Made it Here!")
            throw IllegalStateException("Failed to remove video from playlists")
        }
        val deletedRows = videoRepository.deleteVideoAuthenticated(videoId, username)

        if (deletedRows == 0) {
            throw IllegalArgumentException("Video not found or user not authorized to delete it")
        }
    }

    @Transactional
    fun editVideo( username: String,videoId: Long, videoEditDTO: VideoEditDTO): Video {
        val video = videoRepository.findById(videoId)
            .orElse(null) ?: throw Exception("Video not found!")

        if (video.user?.username != username) {
            throw AccessDeniedException("You are not authorized to edit this video")
        }

        // Update the video fields if they are present in the DTO
        video.apply {
            videoEditDTO.title?.let{ title = it}
            videoEditDTO.description?.let { description = it }
            videoEditDTO.category?.let { category = it }
        }

        return videoRepository.save(video)
    }

    fun isVideoLiked(videoId: Long, username: String): Boolean {
        val video = videoRepository.findById(videoId)
            .orElseThrow { Exception("Video not found!") }

        val user = userRepository.findByUsername(username)
            ?: throw Exception("User not found!")

        // Check if the user has already liked the video
        val existingFeedback = videoFeedbackRepository.findByVideoAndUser(video, user)
        if (existingFeedback != null) {
            println("We made it to the true line!")
            return true
        } else {
            println("We made it to here")
            return false
        }
    }

    public fun videoToVideoProjection(video: Video): VideoProjection {
        return object : VideoProjection {
            override fun getVideoId(): Long = video.videoId ?: 0L
            override fun getViews(): Int = video.views
            override fun getTitle(): String = video.title
            override fun getUser(): User = video.user ?: User() // Handle null user if needed
            override fun getCreatedAt(): LocalDateTime = video.createdAt ?: LocalDateTime.now() // Handle null createdAt if needed
        }
    }

}