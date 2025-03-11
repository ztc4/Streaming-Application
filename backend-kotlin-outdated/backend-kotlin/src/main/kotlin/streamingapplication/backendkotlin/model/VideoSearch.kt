package streamingapplication.backendkotlin.model

data class VideoSearch(
    val query: String?,
    val category: Int?,
    val videoId: Long?,
    val userId: Long?,
    val page: Int = 0,
    val size: Int = 10,
)
