package Backend.streaming.Model

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*
import jakarta.validation.constraints.Min

@Entity
@Table(name = "Users")
class User (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column(unique = true)
    val username: String,

    @Min(value = 0, message = "SubscriberCount can't be below 0" )
    var subscribersCount: Long = 0,

//    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
//    val userPrivate: UserPrivate? = null,

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    @JsonBackReference
    val videos: List<Video> = mutableListOf()
    )
{
    // No-argument constructor for Hibernate
    constructor() : this(null, "", 0, emptyList())
}