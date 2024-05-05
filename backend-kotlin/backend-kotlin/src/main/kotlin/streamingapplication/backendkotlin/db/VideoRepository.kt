package streamingapplication.backendkotlin.db

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import streamingapplication.backendkotlin.dbmodel.Token
import streamingapplication.backendkotlin.dbmodel.Videos

@Repository
interface VideoRepository: JpaRepository<Videos, Long> {

    fun findByLikes(likes: Int,pageable: Pageable): Page<Videos>

    fun findByCategory(category: Int?,pageable: Pageable): Page<Videos>

    fun findByUserId(userId: Long,pageable: Pageable): Page<Videos>
    fun findByTitleContainingIgnoreCase(title: String, pageable: Pageable): Page<Videos>

}