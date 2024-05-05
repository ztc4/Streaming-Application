package streamingapplication.backendkotlin.dbmodel

import jakarta.persistence.*

@Entity
@Table(name = "UsersPrivate")
data class UserPrivate(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userId: Long? = null,
    var password: String,

    @Column(unique = true) // Ensure email is unique
    var email: String,

    var firstName: String,
    var lastName: String,
    var phoneNumber: Long? = null
){
    constructor() : this(null, "", "", "", "",0)
} // Constructor like this due to errors fetching the data
