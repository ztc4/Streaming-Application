package Backend.streaming.Config

import org.springframework.security.core.context.SecurityContextHolder

object AuthUtil {
    fun getAuthenticatedInfo(): Pair<String, String> {
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication?.name ?: throw IllegalStateException("Username not found in SecurityContext")

        // Assuming the email is stored in the details map and is non-null
        val email = (authentication.details as? Map<String, String>)?.get("email")
            ?: throw IllegalStateException("Email not found in SecurityContext")

        return Pair(username, email)
    }

}