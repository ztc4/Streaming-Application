package Backend.streaming.Model

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size

data class UserLoginDTO(

    @NotNull( message = "Email is required!")
    @NotBlank(message = "Email is Required")
    @Email( message = "Email needs to be Valid!")
    var email: String,

    @NotBlank(message = "Name is Required!")
    @NotNull
    @Size( min = 8, max = 24, message = "Username must be between 8 and 24 characters long" )
    var password: String,

    val username: String?

)
