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
    private lateinit var jwtService: JWTService // Assuming you have a JwtService for token handling

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")

        // Log header for debugging
        println("Authorization Header: $authHeader")

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // If no auth header, continue with filter chain
            filterChain.doFilter(request, response)
            return
        }

        val jwtToken = authHeader.substring(7)
        println("JWT Token: $jwtToken")

        try {
            // Extract username and email from JWT
            val username = jwtService.extractUsername(jwtToken)
            val email = jwtService.extractEmail(jwtToken)

            println("Extracted Username: $username, Email: $email")

            // Validate the token
            if (username != null && SecurityContextHolder.getContext().authentication == null) {
                if (jwtService.validateToken(jwtToken, username)) {
                    // Create authentication object
                    val authentication = UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        emptyList() // or populate with roles if needed
                    )

                    // Optionally set email in details for later use
                    authentication.details = mapOf("email" to email)

                    // Set authentication in the security context
                    SecurityContextHolder.getContext().authentication = authentication
                    println("User authenticated: $username")
                } else {
                    println("Invalid JWT token for user: $username")
                }
            }

            // Continue with the filter chain
            filterChain.doFilter(request, response)

        } catch (e: Exception) {
            // Log the exception for better debugging
            e.printStackTrace()
            response.status = HttpServletResponse.SC_UNAUTHORIZED
            response.writer.write("You are currently not logged in!")
            return
        }
    }

}