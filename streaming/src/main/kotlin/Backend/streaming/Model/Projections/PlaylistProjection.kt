package Backend.streaming.Model.Projections

import Backend.streaming.Model.DB.User
import Backend.streaming.Model.Enum.PlaylistCategory

interface PlaylistProjection {
    fun getId(): Long
    fun getName(): String
    fun getCategory(): PlaylistCategory
    fun getUser(): User
}