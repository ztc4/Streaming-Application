package streamingapplication.backendkotlin.model

data class CreateUserRequest(
    val username: String = "",
    val email: String = "",
    val password: String = "",
    val firstName: String = "",
    val lastName: String = "",
    val phoneNumber: Long? = null
)
