package Backend.streaming.Model.Projections

import Backend.streaming.Model.DB.User
import java.time.LocalDateTime

interface VideoProjection {
    fun getVideoId(): Long?

    fun getTitle():String
    fun getUser(): User
    fun getCreatedAt(): LocalDateTime
    fun getViews(): Int
}