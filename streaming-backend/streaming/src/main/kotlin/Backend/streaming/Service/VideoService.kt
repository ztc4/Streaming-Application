package Backend.streaming.Service

import Backend.streaming.Model.Video
import Backend.streaming.Model.VideoDTO
import Backend.streaming.Model.VideoEditDTO
import Backend.streaming.Model.VideoFeedback
import Backend.streaming.Repository.UserRepository
import Backend.streaming.Repository.VideoRepository
import Backend.streaming.Repository.videoFeedbackRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.nio.file.AccessDeniedException

@Service
class VideoService (
    private val videoRepository: VideoRepository,
    private val userRepository: UserRepository,
    private val videoFeedbackRepository: videoFeedbackRepository // To fetch user details
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
        return videoRepository.deleteVideoAuthenticated(videoId, username);
    }

    @Transactional
    fun editVideo( username: String,videoId: Long, videoEditDTO: VideoEditDTO ): Video{
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

}