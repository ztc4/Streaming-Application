package Backend.streaming.Controller

import Backend.streaming.Config.CustomUserPrincipal
import Backend.streaming.Model.DTO.VideoDTO
import Backend.streaming.Model.DTO.VideoEditDTO
import Backend.streaming.Service.ActionService
import Backend.streaming.Service.JWTService
import Backend.streaming.Service.VideoService
import jakarta.validation.Valid
import jakarta.validation.constraints.Min
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/video")
class VideoController ( val jwtService: JWTService,val videoService: VideoService, val actionService: ActionService){



    @PostMapping("/createVideo")
    fun createBasicVideo(@Valid @RequestBody videoDTO: VideoDTO): ResponseEntity<Any>{
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        return try {
            //if user can give an id || video jwt
            val video = videoService.createVideo(videoDTO, username);
            val videoJWT = jwtService.generateTokenForVideo(video?.videoId!!, username)
            ResponseEntity.ok().body(
                mapOf(
                    "video" to video,
                    "videoJWT" to videoJWT,
                )
            )
        }
        catch (e:Exception){
            println("Exception is: ${e.message}")
            when(e) {
                is RuntimeException -> {
                    ResponseEntity.badRequest().body(e.message)
                }

                is DataIntegrityViolationException -> {
                    ResponseEntity.badRequest().body("Data doesn't meet validation!")
                }

                else -> {
                    ResponseEntity.internalServerError().body(" An error occurred while creating account")
                }
            }
        }
    }

    @DeleteMapping("/deleteVideo/{videoId}")
    fun deleteVideo(
        @PathVariable
        @Min(value = 1, message = "Video ID isn't valid!") videoId: Long
    ): ResponseEntity<String> {
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username

        return try {
            videoService.deleteVideo(username, videoId)
            ResponseEntity.ok("Video deleted successfully")
        } catch (e: Exception) {
            println(e)
            // Handle specific exceptions like DataIntegrityViolation, EmptyResultDataAccessException, etc.
            ResponseEntity.internalServerError()
                .body("Failed to delete video: ${e.message}")
        }
    }

    @PutMapping("/editVideo/{videoId}")
    fun editVideo(
        @PathVariable videoId: Long,
        @RequestBody @Valid videoEditDTO: VideoEditDTO // DTO to handle the request
    ): ResponseEntity<String> {
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username

        return try {
            videoService.editVideo(username, videoId, videoEditDTO)
            ResponseEntity.ok("Video updated successfully")
        } catch (e: Exception) {
            when(e){
                is AccessDeniedException ->
                    { ResponseEntity.badRequest().body("The following video doesn't belong to you!")}
                else ->{
                    ResponseEntity.internalServerError()
                        .body("Failed to update video: ${e.message}")
                }
            }

        }
    }

    @GetMapping("/test")
    fun test():String{
        return "Hello"
    }
    // Removed!

    @PostMapping("/createVideo2") // Out of Commission
    fun createVideo(@Valid @RequestBody videoDTO: VideoDTO, ): ResponseEntity<Any>{
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        return try {
            val video = videoService.createVideo(videoDTO, username)
            val videoJWT = jwtService.generateTokenForS3(video?.videoId!!,videoDTO.videoContentType!!,username)
            val imageJWT = jwtService.generateTokenForS3(video.videoId, videoDTO.imageContentType!!,username)
            ResponseEntity.ok().body(
                mapOf(
                    "video" to video,
                    "videoJWT" to videoJWT,
                    "imageJWT" to imageJWT
                )
            )
        } catch (e:Exception){
            println("Exception is: ${e.message}")
            when(e){
                is RuntimeException -> {
                    ResponseEntity.badRequest().body(e.message)
                }
                is DataIntegrityViolationException -> {
                    ResponseEntity.badRequest().body("Data doesn't meet validation!")
                }
                else ->{
                    ResponseEntity.internalServerError().body(" An error occurred while creating account")
                }
            }
        }

    }

}