package Backend.streaming.Repository


import Backend.streaming.Model.Video
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface VideoRepository: JpaRepository<Video, Long> {

    @Query("DELETE FROM Video v WHERE v.videoId = :id AND v.user.username = :username")
    fun deleteVideoAuthenticated(id: Long, username:String)

//    Search
    fun findByTitleContainingIgnoreCaseAndCategory(
        title: String,
        category: Int?,
        pageable: Pageable
    ): Page<Video>

    fun findByTitleContainingIgnoreCase(title: String,pageable: Pageable): Page<Video>

    fun findByUserUsername(username: String, pageable: Pageable): Page<Video>

    fun findByCategory(category: Int?, pageable: Pageable): Page<Video>


}