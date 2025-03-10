package Backend.streaming.Controller

import Backend.streaming.Config.AuthUtil
import Backend.streaming.Model.VideoDTO
import Backend.streaming.Model.VideoEditDTO
import Backend.streaming.Service.ActionService
import Backend.streaming.Service.VideoService
import jakarta.validation.Valid
import jakarta.validation.constraints.Min
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/video")
class VideoController ( val videoService: VideoService, val actionService: ActionService){

    @PostMapping("/createVideo")
    fun createVideo(@Valid @RequestBody videoDTO: VideoDTO): ResponseEntity<Any>{
        val (username, _) = AuthUtil.getAuthenticatedInfo()
        return try {
            val video = videoService.createVideo(videoDTO, username)
            ResponseEntity.ok().body(video)
        }
        catch (e:Exception){
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

    @DeleteMapping("/deleteVideo/{videoId}")
    fun deleteVideo(
        @PathVariable
        @Min(value = 1, message = "Video ID isn't valid!") videoId: Long
    ): ResponseEntity<String> {
        val (username, _) = AuthUtil.getAuthenticatedInfo()

        return try {
            videoService.deleteVideo(username, videoId)
            ResponseEntity.ok("Video deleted successfully")
        } catch (e: Exception) {
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
        val (username, _) = AuthUtil.getAuthenticatedInfo()

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

    @PostMapping("/likeVideo/{videoId}")
    fun likeVideo(@PathVariable videoId: Long): ResponseEntity<String> {
        val (username, _) = AuthUtil.getAuthenticatedInfo()
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

    @PostMapping("/unlikeVideo/{videoId}")
    fun unlikeVideo(@PathVariable videoId: Long): ResponseEntity<String> {
        val (username, _) = AuthUtil.getAuthenticatedInfo()
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



    @GetMapping("/test")
    fun test():String{
        return "Hello"
    }
}