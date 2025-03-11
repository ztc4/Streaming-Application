package Backend.streaming.Model.Projections

import Backend.streaming.Model.Enum.VideoCategory

interface VideoExpandedProjection {
    fun getVideoId(): Long
    fun getDescription(): String?
    fun getCategory(): VideoCategory
    fun getLikes(): Int
    fun getDislikes(): Int
}