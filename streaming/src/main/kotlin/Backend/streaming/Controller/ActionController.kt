package Backend.streaming.Controller

import Backend.streaming.Config.CustomUserPrincipal
import Backend.streaming.Service.ActionService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/action")
class ActionController(val actionService: ActionService) {

    @PostMapping("/likeVideo/{videoId}")
    fun likeVideo(@PathVariable videoId: Long): ResponseEntity<String> {
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        return try{
            actionService.likeVideo(videoId, username)
            ResponseEntity.ok("Video liked successfully.")
        }
        catch (e:Exception){
            ResponseEntity
                .badRequest()
                .body("Error liking the Video:${e.message}")
        }

    }

    @PutMapping("/unlikeVideo/{videoId}")
    fun unlikeVideo(@PathVariable videoId: Long): ResponseEntity<String> {
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        return try {
            actionService.unlikeVideo(videoId, username)
            ResponseEntity
                .ok("Video unliked successfully.")
        }
        catch (e:Exception){
            ResponseEntity
                .badRequest()
                .body("Error Unliking the Video:${e.message}")
        }
    }

    // Subscribe to User
    @PostMapping("/subscription/subscribe/{id}")
    fun subscribe(@PathVariable id: Long){
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        try{
            actionService.subscribe(username, id)
            ResponseEntity.ok()
        }
        catch(e: Exception){
            when(e){
                is IllegalStateException -> ResponseEntity.status(HttpStatus.CONFLICT).body(e.message)
                is RuntimeException -> ResponseEntity.badRequest().body(e.message)
                else -> ResponseEntity.internalServerError().body("Ran into an Error on the Server!")
            }
        }

    }
    @DeleteMapping("/subscription/unsubscribe/{id}")
    fun unsubscribe(@PathVariable id: Long){
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        try{
            actionService.unsubscribe(username, id)
            ResponseEntity.ok()
        }
        catch(e: Exception){
            when(e){
                is RuntimeException -> ResponseEntity.badRequest().body(e.message)
                else -> ResponseEntity.internalServerError().body("Ran into an Error on the Server!")
            }
        }

    }
}