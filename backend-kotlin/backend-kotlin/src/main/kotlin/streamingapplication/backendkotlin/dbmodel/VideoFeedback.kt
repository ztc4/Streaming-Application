package streamingapplication.backendkotlin.dbmodel

import jakarta.persistence.*


@Entity
@Table(name = "VideoFeedback")
data class VideoFeedback(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val videoId: Long,
    val userWhoLikedVideo: Long
){
    constructor() : this(0,0,0)
}