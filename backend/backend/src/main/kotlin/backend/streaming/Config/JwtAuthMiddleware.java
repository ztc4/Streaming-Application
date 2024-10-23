package backend.streaming.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthMiddleware : OncePerRequestFilter() {

@Autowired
private lateinit var jwtService: JwtService  // Assuming you have a JwtService for token handling

        override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
        ) {
            val authHeader = request.getHeader("Authorization")
            val jwtToken: String?
            val username: String?

        // Check if the header is valid and starts with "Bearer "
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response)
            return
            }

        // Extract the JWT token and username from the header
            jwtToken = authHeader.substring(7)
            username = jwtService.extractUsername(jwtToken)

        // If username is found and there's no authentication in the SecurityContext
            if (username != null && SecurityContextHolder.getContext().authentication == null) {
            if (jwtService.validateToken(jwtToken, username)) {
            // Set the authentication in the security context
            val authentication = UsernamePasswordAuthenticationToken(username, null, emptyList())
            SecurityContextHolder.getContext().authentication = authentication
            }
            }

        // Continue with the filter chain
            filterChain.doFilter(request, response)
            }
}
