package Backend.streaming.Config

import Backend.streaming.Service.JWTService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthMiddleware : OncePerRequestFilter() {
    @Autowired
    private lateinit var jwtService: JWTService

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
//        println("Authorization Header: $authHeader")

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            println("No authentication found, proceeding without user context.")
            filterChain.doFilter(request, response)
            return
        }

        val jwtToken = authHeader.substring(7)

        try {
            val username = jwtService.extractUsername(jwtToken)
            val email = jwtService.extractEmail(jwtToken)

            println("Extracted Username: $username, Email: $email")

            if (username != null && SecurityContextHolder.getContext().authentication == null) {
                if (jwtService.validateToken(jwtToken, username)) {
                    val authentication = UsernamePasswordAuthenticationToken(
                        CustomUserPrincipal(username, email),
                        null,
                        emptyList()
                    )

                    SecurityContextHolder.getContext().authentication = authentication
//                    println("User authenticated: $username")
                } else {
                    println("Invalid JWT token for user: $username")
                }
            }

            filterChain.doFilter(request, response)

        } catch (e: Exception) {
            e.printStackTrace()
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            response.writer.write("You are currently not logged in!")
            return
        }
    }
}

data class CustomUserPrincipal(
    val username: String,
    val email: String
)
