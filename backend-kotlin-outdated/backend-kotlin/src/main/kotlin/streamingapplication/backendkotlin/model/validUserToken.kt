package streamingapplication.backendkotlin.model

data class validUserToken(
    val validUser: Boolean,
    val id: Long?
)
