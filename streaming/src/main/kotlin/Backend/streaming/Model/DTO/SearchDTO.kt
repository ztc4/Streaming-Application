package Backend.streaming.Model.DTO

import Backend.streaming.Model.Enum.VideoCategory

data class SearchDTO(
    val title: String? ,
    val category: VideoCategory?,
    val username: String?,
    val sortBy: String? , // For Examples Sort by likes || Another Example order by createdTime
    val order: String?, // order by most to least || Get Recent
    val page: Int = 0
)