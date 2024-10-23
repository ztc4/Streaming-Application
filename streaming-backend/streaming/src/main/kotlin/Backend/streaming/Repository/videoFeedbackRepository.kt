package Backend.streaming.Repository

import Backend.streaming.Model.User
import Backend.streaming.Model.Video
import Backend.streaming.Model.VideoFeedback
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface videoFeedbackRepository : JpaRepository <VideoFeedback, Long>  {
    fun findByVideoAndUser(video: Video, user: User): VideoFeedback?

    @Modifying
    @Query("DELETE FROM VideoFeedback vf WHERE vf.video = :video AND vf.user = :user")
    fun deleteByVideoAndUser(video: Video, user: User): Int
}