package Backend.streaming.Repository

import Backend.streaming.Model.DB.Playlist
import Backend.streaming.Model.DB.User
import Backend.streaming.Model.Enum.PlaylistCategory
import Backend.streaming.Model.Projections.PlaylistExpandedProjection
import Backend.streaming.Model.Projections.PlaylistProjection
import jakarta.transaction.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface PlaylistRepository: JpaRepository<Playlist, Long> {


    fun findByUserUsernameAndCategory(username: String, category: PlaylistCategory = PlaylistCategory.NONE, pageable: Pageable): Page<PlaylistProjection>

    @Query("SELECT p FROM Playlist p WHERE p.id = :id")
    fun findPlaylistById(id: Long): PlaylistProjection?

    @Query("SELECT p FROM Playlist p WHERE p.id = :id")
    fun findPlaylistByIdExpanded(id: Long): PlaylistExpandedProjection?

    @Query("SELECT p.id FROM Playlist p WHERE p.user.username = :username AND p.category = :category")
    fun findPlaylistIdByUserUsernameAndCategory(username: String, category: PlaylistCategory): Long?

    fun findByUserAndCategory(user: User, category: PlaylistCategory): PlaylistProjection?


    @Modifying
    @Transactional
    @Query(
        """
    UPDATE Playlist p 
    SET p.name = COALESCE(:newTitle, p.name), 
        p.private = COALESCE(:newPrivate, p.private) 
    WHERE p.id = :playlistId 
    AND p.user.username = :username
    """
    )
    fun updatePlaylist(playlistId: Long, username: String, newTitle: String? , newPrivate: Boolean?): Int

    fun existsByIdAndUserUsername(id: Long, username: String): Boolean
    fun deleteByIdAndUserUsername(id: Long, username: String): Int
}