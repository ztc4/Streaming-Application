package streamingapplication.backendkotlin.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import streamingapplication.backendkotlin.config.S3SignedUrlGenerator
import streamingapplication.backendkotlin.db.VideoFeedbackRepository
import streamingapplication.backendkotlin.db.VideoRepository
import streamingapplication.backendkotlin.dbmodel.VideoFeedback
import streamingapplication.backendkotlin.dbmodel.Videos
import streamingapplication.backendkotlin.model.VideoLike
import streamingapplication.backendkotlin.model.VideoSearch
import streamingapplication.backendkotlin.model.VideoUpload

@Service
class VideoService( private val videoRepository: VideoRepository, private val videoFeedbackRepository: VideoFeedbackRepository) {

    // Upload Videos
    fun uploadVideoInitial(id: Long, newVideo: VideoUpload): ResponseEntity<Any>{
        // check if all values were passed In
        val errors = ArrayList<String>()


        if(newVideo.title == ""){
            errors.add("Title is invalid")
        }
        if(newVideo.category == null){
            errors.add("Please enter an Category")
        }
        if (errors.size > 0){
            return ResponseEntity
                .status(300)
                .body(errors)
        }

        try {
            // generate signedURL
            val createdVideo = videoRepository.save(Videos(
                    title = newVideo.title,
                    description = newVideo.description,
                    category = newVideo.category,
                    userId = id, s3Link = null
                ))
            val s3link = S3SignedUrlGenerator.generateSignedUrl(
                "video",
                "$id|${createdVideo.videoId}"
            )
            createdVideo.s3Link = s3link
            videoRepository.save(createdVideo)
            return ResponseEntity
                .status(200)
                .body(s3link)
        }
        catch (ex:Exception){
            return ResponseEntity
                .status(400)
                .body(ex)
        }
    }

    // Like Videos
    fun likeVideoIfNotExists(videoLike: VideoLike): ResponseEntity<Any> {
        try {
            if (videoLike.videoId == null || videoLike.userWhoLikedVideo == null) {
                return ResponseEntity
                    .status(400)
                    .body("Both videoId and userWhoLikedVideo must be provided")
            }

            // Check if a feedback with the same videoId and userWhoLikedVideo already exists
            val existingFeedback = videoFeedbackRepository.findByVideoIdAndUserWhoLikedVideo(
                videoLike.videoId,
                videoLike.userWhoLikedVideo!!
            )

            return if (existingFeedback == null) {
                val newFeedback =  VideoFeedback(
                    videoId = videoLike.videoId,
                    userWhoLikedVideo = videoLike.userWhoLikedVideo!!
                )
                videoFeedbackRepository.save(newFeedback)
                ResponseEntity.status(201).body("The video was successfully liked")
            } else {
                // delete the feedback
                val deletedCount = videoFeedbackRepository.deleteByVideoIdAndUserWhoLikedVideo(videoLike.videoId,
                    videoLike.userWhoLikedVideo!!
                )
                if (deletedCount > 0) {
                    ResponseEntity.status(202).body("Video was unliked")
                } else {
                    ResponseEntity.status(404).body("Video feedback not found")
                }

            }
        } catch (ex: Exception) {
            return ResponseEntity.status(500).body("Internal Server Error")
        }
    }
    fun checkIfUserLikedVideo(videoLike: VideoLike): ResponseEntity<Any>{
        try {
            if (videoLike.videoId == null || videoLike.userWhoLikedVideo == null) {
                return ResponseEntity
                    .status(400)
                    .body("Both videoId and userWhoLikedVideo must be provided")
            }

            // Check if a feedback with the same videoId and userWhoLikedVideo already exists
            val existingFeedback = videoFeedbackRepository.findByVideoIdAndUserWhoLikedVideo(
                videoLike.videoId,
                videoLike.userWhoLikedVideo!!
            )

            return if (existingFeedback == null) {
                ResponseEntity
                    .status(201)
                    .body(false) // is not liked
            } else {
                ResponseEntity
                    .status(202)
                    .body(true) // is liked
            }
        } catch (ex: Exception) {
            return ResponseEntity
                .status(500)
                .body("Internal Server Error")
        }

    }

    // Search Services
    fun getUserVideos(videoInfo: VideoSearch): ResponseEntity<Any>{

        try{
            if(videoInfo.userId == null){
                throw NullPointerException("User ID cannot be null")
            }
            val pageable = PageRequest.of(
                videoInfo.page,
                videoInfo.size,
                Sort.by("views").descending()
            )
            val videos = videoRepository.findByUserId(
                videoInfo.userId,
                pageable
            )
            if(videos.isEmpty){
                return ResponseEntity
                    .status(400)
                    .body(if(videoInfo.page == 0) "User hasn't uploaded any other videos" else "User doesn't have anymore videos" )
            }
            return ResponseEntity
                .status(200)
                .body(videos)
        }
        catch (ex:Exception){
            return ResponseEntity
                .status(400)
                .body("Can't get videos for invalid user")
        }


    }
    fun getPopularVideos(videoInfo: VideoSearch): ResponseEntity<Any>{
        return try {
            val pageable = PageRequest.of(
                videoInfo.page,
                videoInfo.size,
                Sort.by("likes").descending()
            )
            val videos = videoRepository.findByLikes(
                Int.MAX_VALUE,
                pageable
            )
            ResponseEntity
                .status(200)
                .body(videos)
        } catch (ex: Exception){
            ResponseEntity
                .status(400)
                .body("There was error fetching the data")

        }


    }

    fun getVideosByCategory(videoInfo:VideoSearch):ResponseEntity<Any>{

        return try {
            val pageable = PageRequest.of(
                videoInfo.page,
                videoInfo.size,
                Sort.by("likes").descending()
            )
            val videos = videoRepository.findByCategory(
                1,
                pageable
            )

            ResponseEntity
                .status(200)
                .body(videos)

        }
        catch (ex: Exception){
            ResponseEntity
                .status(400)
                .body("There was error fetching the data")
        }

    }
    fun searchVideos(videoInfo:VideoSearch): ResponseEntity<Any>{
        try{
            if (videoInfo.query == null){
                return ResponseEntity.status(400).body("Please enter a valid query")
            }
            val pageable = PageRequest.of(
                videoInfo.page,
                videoInfo.size,
                Sort.by("likes").descending()
            )
            val pageResult = videoRepository.findByTitleContainingIgnoreCase(videoInfo.query, pageable)
            if (pageResult.isEmpty) {
                return ResponseEntity.status(404).body("No videos matched the title")
            }
            return ResponseEntity.status(404).body(pageResult)

        }
        catch (ex:Exception){
            return ResponseEntity.status(404).body("No videos matched the title")
        }


    }

    fun getVideo(videoInfo:VideoSearch):ResponseEntity<Any>{

        try {
            if(videoInfo.videoId == null || videoInfo.videoId.toString().toLongOrNull() == null ){
                return ResponseEntity
                    .status(400)
                    .body("Invalid videoId")
            }
            val video: Videos? = videoRepository.findById(videoInfo.videoId).orElse(null);

            return if (video == null){
                ResponseEntity
                    .status(404)
                    .body("The following video doesn't exist")
            } else{
                ResponseEntity
                    .status(200)
                    .body(video)
            }

        }
        catch (ex:Exception){
            return ResponseEntity
                .status(500)
                .body("There was an problem on our end")
        }
    }

    fun deleteVideo(){}

}