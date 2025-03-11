package Backend.streaming.Service

import Backend.streaming.Model.DB.Playlist
import Backend.streaming.Model.DB.PlaylistVideo
import Backend.streaming.Model.DB.User
import Backend.streaming.Model.DTO.isLikedVideoDTO
import Backend.streaming.Model.Enum.PlaylistCategory
import Backend.streaming.Model.Projections.PlaylistExpandedProjection
import Backend.streaming.Model.Projections.PlaylistProjection
import Backend.streaming.Model.Projections.VideoProjection
import Backend.streaming.Repository.PlaylistRepository
import Backend.streaming.Repository.PlaylistVideoRepository
import Backend.streaming.Repository.UserRepository
import Backend.streaming.Repository.VideoRepository
import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service


@Service
class PlaylistService (
    private val videoService: VideoService,
    private val UserRepository: UserRepository,
    private val playlistRepository: PlaylistRepository,
    private val videoRepository: VideoRepository,
    private  val playlistVideoRepository: PlaylistVideoRepository
){

    fun createPlaylist(username:String,name:String): Playlist{
        val user = UserRepository.findByUsername(username) ?: throw IllegalArgumentException(" Your currently not logged in")
        val playlist = Playlist( user = user,name = name)
        return playlistRepository.save(playlist)
    }


    fun editPlaylist(id: Long, username: String, title: String?, private: Boolean?): Boolean {
        val updatedRows = playlistRepository.updatePlaylist(id, username , title, private)
        return updatedRows > 0
    }

    @Transactional
    fun deletePlaylist(username: String, id:Long){
        println("Atleast we made it here??")
        if(!playlistRepository.existsByIdAndUserUsername(id,username)){
            throw IllegalArgumentException("Failed to delete the following ")
        }
        playlistVideoRepository.deleteAllByPlaylistId(id)
        val result = playlistRepository.deleteByIdAndUserUsername(id,username)


        if(result == 0) throw IllegalArgumentException("Problem deleting playlist with the Id of $id and owned by user with the following username : $username!")
    }

    // Playlist Videos

    @Transactional
    fun addPlaylistVideo(playlistId: Long? = null, videoId: Long, username: String, playlistCategory: PlaylistCategory? = null) {
        val idOfPlaylist: Long = playlistId ?: playlistCategory?.let {
            playlistRepository.findPlaylistIdByUserUsernameAndCategory(username, it)
        } ?: throw IllegalArgumentException("The playlist doesn't exist!")

        if(!playlistRepository.existsById(idOfPlaylist)){
            throw IllegalArgumentException("Playlist wasnt found!")
        }
        val playlistRef = playlistRepository.getReferenceById(idOfPlaylist)
        val videoRef = videoRepository.getReferenceById(videoId)

        val nextPosition = playlistVideoRepository.countByPlaylistId(idOfPlaylist) + 1
        val playlistVideo = PlaylistVideo(
            playlist = playlistRef,
            video = videoRef,
            position = nextPosition
        )
        playlistVideoRepository.save(playlistVideo)

    }
    @Transactional
    fun deleteVideoFromPlaylist(playlistId: Long? = null, videoId: Long, username: String, playlistCategory: PlaylistCategory? = null) {

        val idOfPlaylist: Long = playlistId ?: playlistCategory?.let {
            playlistRepository.findPlaylistIdByUserUsernameAndCategory(username, it)
        } ?: throw IllegalArgumentException("There playlist doesn't exist!")

        val playlist = playlistRepository.findById(idOfPlaylist)
            .orElseThrow { IllegalArgumentException("Playlist not found!") }

        // Ensure user owns the playlist
        if (playlist.user.username != username) {
            throw IllegalArgumentException("You don't have permission to modify this playlist!")
        }

        val playlistVideo = playlistVideoRepository.findByPlaylistIdAndVideoId(idOfPlaylist, videoId)
            ?: throw IllegalArgumentException("Video not found in the playlist!")

        // Delete the video from the playlist
        playlistVideoRepository.delete(playlistVideo)

        // Reorder remaining videos' positions
        val remainingVideos = playlistVideoRepository.findByPlaylistIdOrdered(idOfPlaylist)
        remainingVideos.forEachIndexed { index, pv ->
            pv.position = index + 1
        }
        playlistVideoRepository.saveAll(remainingVideos)
    }





    fun getPlaylistVideos(playlistId: Long, page:Int): Page<isLikedVideoDTO> {
        val pageRequest = PageRequest.of(page, 10)

        val videos: Page<VideoProjection> = playlistVideoRepository.findVideosByPlaylistId(playlistId, pageRequest)
        println("Here it goes")
        println(videos)
        return videos.map{ it ->
            isLikedVideoDTO(video = it, isLiked = false, isSubscribed = false )
        }
    }
    fun getUsersPlaylist(username: String, playlistCategory: PlaylistCategory = PlaylistCategory.NONE, page:Int): Page<PlaylistProjection> {
        val pageRequest = PageRequest.of(page, 10)
        return playlistRepository.findByUserUsernameAndCategory(username, playlistCategory, pageRequest);
    }

    fun getPlaylistInformation(id: Long): PlaylistProjection {
        return playlistRepository.findPlaylistById(id) ?: throw IllegalArgumentException("Couldn't Get the Playlist!")
    }
    fun getPlaylistExpandedInformation(id: Long): PlaylistExpandedProjection{
        return playlistRepository.findPlaylistByIdExpanded(id) ?: throw IllegalArgumentException("Couldn't Get the Playlist!")
    }



    fun getUserPlaylist(user: User, playlistCategory: PlaylistCategory): PlaylistProjection {
        return playlistRepository.findByUserAndCategory(user, playlistCategory)
            ?: throw IllegalArgumentException("Activity playlist not found for user: ${user.id}")
    }

    fun createUserDefaultPlaylist(username:String){
        val user = UserRepository.findByUsername(username) ?: throw IllegalArgumentException(" Your currently not logged in");
        val pastActivity = Playlist(user = user, name = "Past Activity" , category = PlaylistCategory.ACTIVITY);
        val watchLater = Playlist(user = user, name = "Watch Later", category = PlaylistCategory.LATER);
        val playlist = listOf(watchLater, pastActivity);
        playlistRepository.saveAll(playlist);
    }
}