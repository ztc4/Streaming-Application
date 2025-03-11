package Backend.streaming.Controller

import Backend.streaming.Config.CustomUserPrincipal
import Backend.streaming.Model.DTO.VideoDTO
import Backend.streaming.Service.JWTService
import Backend.streaming.Service.VideoService
import jakarta.validation.Valid
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/test")
class TestController(
    val jwtService: JWTService,
    val videoService: VideoService
) {

    @GetMapping("/video/jwt")
    fun testVideoJWT(): String{
        return jwtService.generateTokenForS3(1,"video/mp4","ztc4")
    }

    @PostMapping("/createVideo")
    fun createBasicVideo(@Valid @RequestBody videoDTOs: List<VideoDTO>): ResponseEntity<Any> {
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val username = principal!!.username
        return try {
            //if user can give an id || video jwt
            val createdVideos = videoDTOs.map { videoDTO ->
                val video = videoService.createVideo(videoDTO, username)
                val videoJWT = jwtService.generateTokenForVideo(video?.videoId!!, username)
                mapOf(
                    "video" to video,
                    "videoJWT" to videoJWT
                )
            }

            ResponseEntity.ok().body(createdVideos)
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
}