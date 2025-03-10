package Backend.streaming.Model.DTO

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

data class UserCreateDTO (


    val username: String,

    @NotBlank(message = "Name is Required!")
    @NotNull(message = "Name is Required!")
    @Size( min = 8, max = 24, message = "Username must be between 8 and 24 characters long" )
    var password: String,

     // Ensure email is unique
    @Email( message = "Email needs to be Valid!")
    @NotNull
    @NotBlank
    var email: String,
    @NotBlank
    var firstName: String,
    @NotBlank
    var lastName: String,

    var phoneNumber: Long? = null,
    )