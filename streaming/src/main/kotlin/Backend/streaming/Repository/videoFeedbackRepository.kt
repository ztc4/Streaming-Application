package Backend.streaming.Repository

import Backend.streaming.Model.DB.User
import Backend.streaming.Model.DB.Video
import Backend.streaming.Model.DB.VideoFeedback
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
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

    @Query("SELECT vf.video FROM VideoFeedback vf WHERE vf.user.id = :userId")
    fun findByUserId( userId: Long, pageable: Pageable): Page<Video>
//    fun findByUserId(userId: Long, pageable: Pageable): Page<Video>
}