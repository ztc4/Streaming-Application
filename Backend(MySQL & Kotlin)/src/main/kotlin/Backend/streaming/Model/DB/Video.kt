package Backend.streaming.Model.DB

import Backend.streaming.Model.Enum.VideoCategory
import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import org.hibernate.annotations.CreationTimestamp
import java.net.URL
import java.time.LocalDateTime

@Entity
@Table(name = "Videos")
data class Video (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val videoId: Long? = null,

    var views: Int = 0,



    @NotBlank
    @Size( min = 5 , message = "Video title is too short, must be at least 5 characters ")
    @Size(max = 50, message = "Video is too long, larger than 50 characters")
    var title: String,

    @Size(max = 600, message = "Must be below 600 characters")
    var description: String?,


    @Enumerated(EnumType.STRING) // Store as a String in DB
    var category: VideoCategory,

    var likes: Int = 0,
    var dislikes: Int = 0,
    var s3Link: URL?,
    var failed: Boolean =  false,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    val user: User? = null,




    @CreationTimestamp
    var createdAt: LocalDateTime? = null // Automatically set at creation

){
    // No-argument constructor for Hibernate
    constructor() : this(null, 0, "", null, VideoCategory.NONE, 0, 0, null,false ,null)
}