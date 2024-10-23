package Backend.streaming.Model

import jakarta.persistence.*


@Entity
@Table(name = "VideoFeedback")
class VideoFeedback (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id", nullable = false)
    val video: Video, // Reference to the Video entity

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User // Reference to the User entity
)
{
    constructor() : this(null, Video(), User())
}