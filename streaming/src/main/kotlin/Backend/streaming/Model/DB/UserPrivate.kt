package Backend.streaming.Model.DB

import jakarta.persistence.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size


@Entity
@Table(name = "UsersPrivate")
data class UserPrivate (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val userId: Long? = null,

    @NotBlank(message = "Name is Required!")
    @NotNull
    @Size( min = 8, max = 24, message = "Username must be between 8 and 24 characters long" )
    var password: String,

    @Column(unique = true) // Ensure email is unique

    @NotNull( message = "Email is required!")
    @NotBlank (message = "Email is Required")
    @Email( message = "Email needs to be Valid!")
    var email: String,

    @NotBlank
    var firstName: String,

    @NotBlank
    var lastName: String,

    var phoneNumber: Long? = null,

    @OneToOne(cascade = [CascadeType.ALL], orphanRemoval = true) // Enable cascading delete
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: User? = null
){
    // No-argument constructor for Hibernate
    constructor() : this(null, "", "", "", "", null, null)
}