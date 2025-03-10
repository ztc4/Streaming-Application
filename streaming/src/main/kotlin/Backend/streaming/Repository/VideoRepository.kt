package Backend.streaming.Repository


import Backend.streaming.Model.DB.Video
import Backend.streaming.Model.Enum.VideoCategory
import Backend.streaming.Model.Projections.VideoExpandedProjection
import Backend.streaming.Model.Projections.VideoProjection
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.transaction.annotation.Transactional

interface VideoRepository: JpaRepository<Video, Long> {


    @Modifying
    @Transactional
    @Query("DELETE FROM Video v WHERE v.videoId = :id AND v.user.username = :username")
    fun deleteVideoAuthenticated(id: Long, username:String): Int



//    Search
    fun findByTitleContainingIgnoreCaseAndCategory(
        title: String,
        category: VideoCategory?,
        pageable: Pageable
    ): Page<VideoProjection>

    fun findByTitleContainingIgnoreCase(title: String,pageable: Pageable): Page<VideoProjection>

    fun findByUserUsername(username: String, pageable: Pageable): Page<VideoProjection>

    fun existsByVideoIdAndUserUsername(id: Long, username: String): Boolean

    fun findByCategory(category: VideoCategory?, pageable: Pageable): Page<VideoProjection>

    @Query("SELECT v FROM Video v WHERE v.user.id = :userId ORDER BY v.createdAt DESC LIMIT 1 ")
    fun findLatestVideoByUserId( userId: Long): VideoProjection?

    //Expanded
    fun findByVideoId(id: Long): VideoExpandedProjection?

    @Query("SELECT v FROM Video v ORDER BY v.createdAt DESC")
    fun findAllWithProjection(pageable: Pageable): Page<VideoProjection>




}