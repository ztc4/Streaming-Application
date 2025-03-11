package Backend.streaming.Model.DTO

import Backend.streaming.Model.Projections.VideoProjection


data class isLikedVideoDTO(
    val video: VideoProjection,
    val isLiked :Boolean,
    val isSubscribed: Boolean,
)
