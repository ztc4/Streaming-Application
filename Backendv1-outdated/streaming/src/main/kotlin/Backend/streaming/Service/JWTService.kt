package Backend.streaming.Service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.security.Key
import java.util.*
import java.util.function.Function


@Service
open class JWTService {
    // Generate token with given user name
    fun generateToken(username: String, email: String): String {
        val claims: MutableMap<String, Any?> = HashMap()
        claims["username"] = username  // Store the username in the claims
        claims["email"] = email        // Store the email in the claims
        return createToken(claims, username)
    }

    // Create a JWT token with specified claims and subject (user name)
    private fun createToken(claims: Map<String, Any?>, subject: String): String {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)  // Use email as subject
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 30 * 10))  // Token valid for 30 minutes * 10
            .signWith(signKey, SignatureAlgorithm.HS256)
            .compact()
    }

    private val signKey: Key
        // Get the signing key for JWT token
        private get() {
            val keyBytes = Decoders.BASE64.decode(SECRET)
            return Keys.hmacShaKeyFor(keyBytes)
        }

    // Extract the Email from the token
    fun extractUsername(token: String?): String {
        return extractClaim(token) { claims: Claims -> claims["username"] as String }
    }

    // Extract the email from the token
    fun extractEmail(token: String?): String {
        return extractClaim(token) { claims: Claims -> claims["email"] as String }
    }

    // Extract the expiration date from the token
    fun extractExpiration(token: String?): Date {
        return extractClaim(token) { obj: Claims -> obj.expiration }
    }

    // Extract a claim from the token
    fun <T> extractClaim(token: String?, claimsResolver: Function<Claims, T>): T {
        val claims = extractAllClaims(token)
        return claimsResolver.apply(claims)
    }

    // Extract all claims from the token
    private fun extractAllClaims(token: String?): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(signKey)
            .build()
            .parseClaimsJws(token)
            .body
    }

    // Check if the token is expired
    private fun isTokenExpired(token: String?): Boolean {
        return extractExpiration(token).before(Date())
    }

    // Validate the token against user details and expiration
    fun validateToken(token: String?, username: String): Boolean {
        val extractedUsername = extractUsername(token)
        return extractedUsername == username && !isTokenExpired(token)
    }

    companion object {
        // Replace this with a secure key in a real application, ideally fetched from environment variables
        const val SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437"
    }
}
