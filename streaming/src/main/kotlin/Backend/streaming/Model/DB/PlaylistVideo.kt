package Backend.streaming.Model.DB

import jakarta.persistence.*
import java.time.LocalDateTime


@Entity
@Table(name = "playlist_videos")
data class PlaylistVideo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "playlist_id", nullable = false)
    val playlist: Playlist,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id", nullable = false)
    val video: Video,

    var position: Int = 0,  // Position in the playlist

    @Column(nullable = false, updatable = false)
    val addedAt: LocalDateTime = LocalDateTime.now()

){
    constructor() : this(0, Playlist(), Video(), 0)  // Default constructor
}