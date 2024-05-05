package streamingapplication.backendkotlin.db

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import streamingapplication.backendkotlin.dbmodel.User
import streamingapplication.backendkotlin.dbmodel.VideoFeedback

@Repository
interface VideoFeedbackRepository: JpaRepository<VideoFeedback, Long> {
    fun findByVideoIdAndUserWhoLikedVideo(videoId: Long, userWhoLikedVideo: Long): VideoFeedback?

    fun deleteByVideoIdAndUserWhoLikedVideo(videoId: Long, userWhoLikedVideo: Long): Int

}