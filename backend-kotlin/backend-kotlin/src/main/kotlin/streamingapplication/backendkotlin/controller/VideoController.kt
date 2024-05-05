package streamingapplication.backendkotlin.controller

import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import streamingapplication.backendkotlin.model.VideoLike
import streamingapplication.backendkotlin.model.VideoSearch
import streamingapplication.backendkotlin.model.VideoUpload
import streamingapplication.backendkotlin.service.TokenService
import streamingapplication.backendkotlin.service.UserService
import streamingapplication.backendkotlin.service.VideoService

@RestController
@RequestMapping("/api/video")
class VideoController( val tokenService: TokenService, val videoService: VideoService,val userService: UserService) {

    @PostMapping("upload")
    fun addVideo(@RequestHeader("Authorization") auth: String, @RequestBody videoInformation: VideoUpload): ResponseEntity<Any>{
        if (auth.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            val token = auth.substringAfter("Bearer ").trim()
            // deconstruct toke for userId, then checks if the there is a user associated with that userId
            val validUserForId = userService.checkIfTokenIsValidUser(token)
            if (!validUserForId.validUser || validUserForId.id ==  null){
                return ResponseEntity.status(400).body("Your not properly logged in")
            }
            return videoService.uploadVideoInitial(id = validUserForId.id,videoInformation)
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid authorization header")
        }
    }
    @PostMapping("toggleLike")
    fun toggleLikeVideo(@RequestHeader("Authorization") auth: String, @RequestBody feedbackInfo: VideoLike): ResponseEntity<Any>{
        if (auth.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            val token = auth.substringAfter("Bearer ").trim()
            // deconstruct toke for userId, then checks if the there is a user associated with that userId
            val validUserForId = userService.checkIfTokenIsValidUser(token)
            if (!validUserForId.validUser || validUserForId.id ==  null){
                return ResponseEntity.status(400).body("Your not properly logged in")
            }
            feedbackInfo.userWhoLikedVideo = validUserForId.id
            return videoService.likeVideoIfNotExists(feedbackInfo)
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid authorization header")
        }
    }

    @GetMapping("/checkvideoliked/{videoId}")
    fun checkIfVideoLiked(@RequestHeader("Authorization") auth: String, @PathVariable videoId: Long):ResponseEntity<Any>{
        if (auth.startsWith("Bearer ")) {
            require(videoId > 0) { "ID must be greater than 0" }

            // Extract the token part after "Bearer "
            val token = auth.substringAfter("Bearer ").trim()
            // deconstruct toke for userId, then checks if the there is a user associated with that userId
            val validUserForId = userService.checkIfTokenIsValidUser(token)
            if (!validUserForId.validUser || validUserForId.id ==  null){
                return ResponseEntity.status(400).body("Your not properly logged in")
            }

            return videoService.checkIfUserLikedVideo(VideoLike(videoId, validUserForId.id))
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid authorization header")
        }
    }

    // Search

    @GetMapping("/search")
    fun searchVideos(
        @RequestParam query: String? = null,
        @RequestParam(required = false) category: Int? = null,
        @RequestParam(required = false) videoId: Long? = null,
        @RequestParam(required = false) userId: Long? = null ,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int
    ): ResponseEntity<Any> {
        return try {
            val videoSearch = VideoSearch(query, category,videoId, userId,page, size)
            videoService.searchVideos(videoSearch)

        } catch (ex: Exception) {
            ResponseEntity.status(500).body("Internal server error")
        }
    }
    @GetMapping("/getVideo/{id}")
    fun getVideo(@PathVariable id: Long):ResponseEntity<Any>{
        return try {
            val videoSearch = VideoSearch( category = null, query = null, userId = null,videoId = id)
            videoService.getVideo(videoSearch)
        }
        catch (ex: Exception) {
            ResponseEntity.status(500).body("Internal server error")
        }

    }

    @GetMapping("testAuthSent")
    fun testAuthenticationTokenIsReceived(@RequestHeader("Authorization") auth: String ): ResponseEntity<Any>{
        if (auth != null && auth.startsWith("Bearer ")) {
            // Extract the token part after "Bearer "
            val token = auth.substringAfter("Bearer ").trim()

            // add tokenService that verify users exist and check if
            return ResponseEntity.ok("Authorization token: $token")
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid authorization header")
        }
    }

}