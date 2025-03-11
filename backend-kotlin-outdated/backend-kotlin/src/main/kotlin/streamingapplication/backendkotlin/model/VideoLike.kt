package streamingapplication.backendkotlin.model

data class VideoLike(

    val videoId: Long? = null,
    var userWhoLikedVideo: Long? = null
)
