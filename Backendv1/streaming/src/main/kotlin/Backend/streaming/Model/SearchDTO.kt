package Backend.streaming.Model

data class SearchDTO(
    val title: String? ,
    val category: Int?,
    val username: String?,
    val sortBy: String? , // For Examples Sort by likes || Another Example order by createdTime
    val order: String? // order by most to least || Get Recent
)