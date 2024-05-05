package streamingapplication.backendkotlin.dbmodel

import jakarta.persistence.*


@Entity
@Table(name = "Users")
data class User(
    @Id
    var id: Long? = null,

    @Column(unique = true)
    val username: String,

    var subscribersCount: Long = 0
){
    constructor() : this(null, "", 0)
} // Constructor like this due to errors fetching the data


