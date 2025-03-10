package Backend.streaming.Controller

import Backend.streaming.Config.CustomUserPrincipal
import Backend.streaming.Model.DTO.SearchDTO
import Backend.streaming.Model.Enum.VideoCategory
import Backend.streaming.Service.PlaylistService
import Backend.streaming.Service.SearchService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/search")
class SearchController(val searchService: SearchService, val playlistService: PlaylistService) {


    // Videos
    @GetMapping("/videos")
    fun findVideos(
        @RequestParam(required = false) title: String?,
        @RequestParam(required = false) category: VideoCategory?,
        @RequestParam(required = false) username: String?,
        @RequestParam(required = false) sortBy: String?,
        @RequestParam(required = false) order: String?,
        @RequestParam(required = false) page: Int = 0,
        @RequestParam(defaultValue = "false") myVideos: Boolean
    ): ResponseEntity<Any> {
        return try {
            // Attempt to retrieve authentication details
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val usernameAuth = principal?.username  // Can be null if user is not authenticated

            // Ensure `myVideos` only applies when the user is authenticated
            val effectiveUsername = if (myVideos) {
                usernameAuth ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User must be authenticated to view their videos.")
            } else {
                username
            }

            // Create SearchDTO from query params
            val searchDTO = SearchDTO(
                title = title,
                category = category,
                username = effectiveUsername,
                sortBy = sortBy,
                order = order,
                page = page
            )

            // Fetch videos based on search criteria
            val videos = searchService.getVideo(searchDTO, usernameAuth)
            println(videos)
            ResponseEntity.ok().body(videos)
        } catch (e: Exception) {
            ResponseEntity.internalServerError().body(e.message)
        }
    }

    @GetMapping("/video/{videoId}")
    fun getVideo(@PathVariable videoId: Long): ResponseEntity<Any>{
        return try{
            val response = searchService.getVideoById(videoId)
            ResponseEntity.ok(response)
        }
        catch (e:Exception){
            when(e){
                is IllegalArgumentException -> ResponseEntity.badRequest().body(e)
                else -> ResponseEntity.internalServerError().body("There was an internal Server Error!")
            }
        }
    }

    @GetMapping("/video/expanded/{videoId}")
    fun getVideoExpanded(@PathVariable videoId: Long): ResponseEntity<Any>{
        return try{
            val response = searchService.getVideoExpanded(videoId)
            ResponseEntity.ok(response)
        }
        catch (e:Exception){
            when(e){
                is IllegalArgumentException -> ResponseEntity.badRequest().body(e)
                else -> ResponseEntity.internalServerError().body("There was an internal Server Error!")
            }
        }
    }


    @GetMapping("/video/latest/{userId}")
    fun getLatestVideoByUser(@PathVariable userId: Long): ResponseEntity<Any>{
        return try{
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val usernameAuth = principal?.username
            println("I'm right here! ${usernameAuth}")
            val response = searchService.getLatestVideoByUserId(userId, username = usernameAuth)
            ResponseEntity.ok(response)
        }
        catch (e: Exception){
            when(e){
                is IllegalArgumentException -> ResponseEntity.badRequest().body(e)
                else -> ResponseEntity.internalServerError().body(e)
            }
        }
    }
    //    Subscriptions
    @GetMapping("/subscriptions")
    fun getSubscriptions():ResponseEntity<Any>{
        return try{
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val username = principal!!.username
            val result = searchService.getSubscriptions(username)
            ResponseEntity
                .ok(result)
        }
        catch (e:Exception){
            ResponseEntity
                .internalServerError()
                .body("Failed to do this")
        }
    }
    //    Playlist
    @GetMapping("/playlist/{id}")
    fun getPlaylistVideos(@PathVariable id: Long, @RequestParam page: Int = 0): ResponseEntity<Any>{
        return try{
            val videos = playlistService.getPlaylistVideos(id,page);
//            val videos = playlistService.getPlaylistVideosTable(id)

            ResponseEntity.ok(videos)
        }
        catch (e:Exception){
            ResponseEntity.badRequest().body(e.message)
        }
    }



    @GetMapping("/videos/liked")
    fun likedVideos(
        @RequestParam(required = false) order: String = "descending",
        @RequestParam(required = false) page: Int = 0
    ): ResponseEntity<Any> {
        return try {
            // Get MiddleWare Values
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal
            val usernameAuth = principal?.username

            val videos = searchService.getLikedVideos(usernameAuth!!, order, page)
            ResponseEntity.ok(videos)
        } catch (e: Exception) {
            ResponseEntity.badRequest().body(e.message)  // Returning false in case of error
        }
    }

    @GetMapping("/user")
    fun getUser(
        @RequestParam(required = false) id: Long? = null,
        @RequestParam(required = true) me: Boolean = false

    ): ResponseEntity<Any>{
        return try {
            val authentication = SecurityContextHolder.getContext().authentication
            val principal = authentication?.principal as? CustomUserPrincipal;
            val usernameAuth = principal?.username;
            println(" The following is the username $usernameAuth")
            val username = if (me) usernameAuth else null
            println(" The following is the username 2 $username")
            val user = searchService.getUser(id,username);
            ResponseEntity.ok(user)
        }
        catch (e:Exception){
            when(e){
                is IllegalArgumentException -> ResponseEntity.badRequest().body(e.message)
                else -> ResponseEntity.internalServerError().body("There was an problem on our end!")
            }
        }
    }


}
