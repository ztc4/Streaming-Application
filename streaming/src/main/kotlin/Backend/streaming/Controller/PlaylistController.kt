package Backend.streaming.Controller

import Backend.streaming.Config.CustomUserPrincipal
import Backend.streaming.Model.DTO.PlaylistEditDTO
import Backend.streaming.Model.Enum.PlaylistCategory
import Backend.streaming.Service.PlaylistService
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/playlist")
class PlaylistController(val playlistService: PlaylistService) {

    data class Title(val title: String)
    @PostMapping
    fun createPlaylist(@RequestBody title: Title):ResponseEntity<Any>{
        return try {
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val username = principal!!.username
            val createdPlaylist = playlistService.createPlaylist(username, title.title)
            ResponseEntity.ok(createdPlaylist)

        }
        catch (e:Exception){
            ResponseEntity.internalServerError().body("There was a failure on our end!")
        }

    }

    @PutMapping("/{playlistId}")
    fun editPlaylist(
        @PathVariable playlistId: Long,
        @RequestBody edit: PlaylistEditDTO
    ): ResponseEntity<Any>{
        return try {
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
                ?: return ResponseEntity.status(401).body("Unauthorized")

            val username = principal.username

            val updated = playlistService.editPlaylist(
                id = playlistId,
                username = username,
                title = edit.title,
                private  = edit.private
            )

            if (updated) {
                ResponseEntity.ok("Playlist updated successfully")
            } else {
                ResponseEntity.status(403).body("Unauthorized or playlist not found")
            }
        }
        catch (e: Exception){
            ResponseEntity.internalServerError().body("An error occurred while updating the playlist")
        }
    }
    @DeleteMapping
    fun deletePlaylist(
        @RequestParam pID: Long,
    ): ResponseEntity<Any>{
        return try {
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val username = principal!!.username
            playlistService.deletePlaylist(username = username, id = pID)
            ResponseEntity.ok("Successfully deleted the playlist!")

        }
        catch (e:Exception){
            when(e){
                is IllegalArgumentException->{
                    ResponseEntity.badRequest().body(e.message)
                }
                else->{
                    ResponseEntity.internalServerError().body("There was a failure on our end!")
                }
            }
        }
    }

    @GetMapping("/{playlistId}")
    fun getPlaylistExpandedByID(
        @PathVariable playlistId: Long,
        @RequestParam expanded: Boolean = false)
    : ResponseEntity<Any>{
        return try{
            if(expanded){
            val playlistExpanded = playlistService.getPlaylistExpandedInformation(playlistId)
                ResponseEntity.ok(playlistExpanded)
            }else{
                val playlist = playlistService.getPlaylistInformation(playlistId)
                ResponseEntity.ok(playlist)
            }
        }
        catch (e:Exception){
            ResponseEntity.badRequest().body(e.message)
        }
    }

    @GetMapping("/me")
    fun getMyPlaylist(
        @RequestParam(required = true) page: Int = 0,
        @RequestParam(required = true) category: PlaylistCategory = PlaylistCategory.NONE
    ):ResponseEntity<Any>{
        return try {
            println(category == PlaylistCategory.ACTIVITY)
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val username = principal!!.username
            val playlists = playlistService.getUsersPlaylist(username, category, page)
            println(playlists)
            ResponseEntity.ok(playlists)
        }
        catch (e:Exception){
            println(e.message)
            when(e){
                is IllegalArgumentException -> { ResponseEntity.badRequest().body(e.message)}
                else -> {ResponseEntity.internalServerError().body("There was an error on our End!")}
            }
        }

    }
    @PutMapping("/add")
    fun addVideoToPlaylist(
        @RequestParam(required = true) pID: Long? = null,
        @RequestParam(required = true) vID: Long,
        @RequestParam(required = true) category: PlaylistCategory? = null
    ):ResponseEntity<Any>{
        return try {
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val username = principal!!.username
            val playListSuccess = playlistService.addPlaylistVideo(pID, vID, username, category)

            ResponseEntity.ok(playListSuccess)
        }
        catch (e:Exception){
            when(e){
                is IllegalArgumentException -> { ResponseEntity.badRequest().body(e.message)}
                else -> {ResponseEntity.internalServerError().body("There was an error on our End!")}
            }
        }

    }
    @DeleteMapping("/delete")
    fun deleteVideoFromPlaylist(
        @RequestParam(required = true) pID: Long? = null,
        @RequestParam(required = true) vID: Long,
        @RequestParam(required = true) category: PlaylistCategory? = null
    ):ResponseEntity<Any>{
        return try {
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val username = principal!!.username
            val playListSuccess = playlistService.deleteVideoFromPlaylist(pID, vID, username, category)
            ResponseEntity.ok(playListSuccess)
        }
        catch (e:Exception){
            println(e)
            when(e){
                is IllegalArgumentException -> { ResponseEntity.badRequest().body(e.message)}
                else -> {ResponseEntity.internalServerError().body("There was an error on our End!")}
            }
        }
    }



}