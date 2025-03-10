package Backend.streaming.Model.Projections

import java.time.LocalDateTime

interface PlaylistExpandedProjection {
    fun getVideoCount(): Int
    fun getPrivate(): Boolean
    fun getCreatedAt(): LocalDateTime
}