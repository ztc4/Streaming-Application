package Backend.streaming.Repository

import Backend.streaming.Model.DB.PlaylistVideo
import Backend.streaming.Model.Projections.VideoProjection
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface PlaylistVideoRepository: JpaRepository<PlaylistVideo, Long> {

    @Query("""
    SELECT v.id AS videoId, v.title AS title, v.user AS user, v.createdAt AS createdAt, 
           COALESCE(v.views, 0) AS views 
    FROM PlaylistVideo pv 
    JOIN pv.video v 
    WHERE pv.playlist.id = :playlistId 
    ORDER BY pv.position
""")
    fun findVideosByPlaylistId( playlistId: Long, pageable: Pageable): Page<VideoProjection>

    @Query("SELECT pv FROM PlaylistVideo pv WHERE pv.playlist.id = :playlistId AND pv.video.id = :videoId")
    fun findByPlaylistIdAndVideoId(@Param("playlistId") playlistId: Long, @Param("videoId") videoId: Long): PlaylistVideo?

    @Query("SELECT pv FROM PlaylistVideo pv WHERE pv.playlist.id = :playlistId ORDER BY pv.position")
    fun findByPlaylistIdOrdered(@Param("playlistId") playlistId: Long): List<PlaylistVideo>

    @Transactional
    fun deleteAllByPlaylistId(playlistId: Long)

    @Transactional
    fun deleteAllByVideoVideoId(videoId: Long)


    fun countByPlaylistId(playlistId: Long): Int
    fun countByVideoVideoId(playlistId: Long): Int
    @Query("SELECT CASE WHEN COUNT(pv) > 0 THEN TRUE ELSE FALSE END FROM PlaylistVideo pv WHERE pv.playlist.id = :playlistId AND pv.video.id = :videoId")
    fun existsByPlaylistIdAndVideoId(@Param("playlistId") playlistId: Long, @Param("videoId") videoId: Long): Boolean
}