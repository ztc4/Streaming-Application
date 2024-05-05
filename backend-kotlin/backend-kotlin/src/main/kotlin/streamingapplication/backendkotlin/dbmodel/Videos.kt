package streamingapplication.backendkotlin.dbmodel

import jakarta.persistence.*
import java.net.URL

@Entity
@Table(name = "Videos")
data class Videos(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val videoId: Long? = null,
    var views: Int = 0,
    val userId: Long,
    var title: String,
    var description: String?,
    var category: Int?,
    var likes: Int = 0,
    var dislikes: Int = 0,
    var s3Link: URL?
)