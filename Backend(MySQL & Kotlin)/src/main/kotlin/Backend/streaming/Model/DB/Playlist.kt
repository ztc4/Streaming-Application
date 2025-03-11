package Backend.streaming.Model.DB

import Backend.streaming.Model.Enum.PlaylistCategory
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime

@Entity
@Table(name = "Playlist",
//    uniqueConstraints = [UniqueConstraint(columnNames = ["user_id"])]
)
data class Playlist(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    @CreationTimestamp
    var createdAt: LocalDateTime? = null, // Automatically set at creation

    var videoCount: Int = 0,
    var private: Boolean = true,

    @Enumerated(EnumType.STRING) // Store as a String in DB
    var category: PlaylistCategory = PlaylistCategory.NONE,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User, // Reference to the User entity






)
{
    constructor(): this(name = "", user = User(), category = PlaylistCategory.NONE)
}
