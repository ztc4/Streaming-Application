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
        return createToken(claims, username, 1000 * 60 * 30 * 200)
    }
    fun generateTokenForS3(id:Long, contentType: String, username: String): String {
        val claims: MutableMap<String, Any?> = HashMap()
        claims["id"] = id
        claims["contentType"] = contentType
        claims["username"] = username
        return createToken(claims, "VideoUploadS3")
    }
    fun generateTokenForVideo(id:Long,username: String):String{
        val claims: MutableMap<String, Any?> = HashMap()
        claims["videoId"] = id;
        claims["username"] = username
        return createToken(claims,"VideoEdit")
    }

    // Create a JWT token with specified claims and subject (username)
    private fun createToken(claims: Map<String, Any?>, subject: String, expiration: Long = 1000 * 60 * 30 ): String {
        return Jwts.builder()
            .claims(claims)
            .subject(subject)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + expiration)) // Token valid for 30 minutes
            .signWith(signKey, SignatureAlgorithm.HS256) // Use the new way of signing
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
        return Jwts.parser()
            .setSigningKey(SECRET) // Use parserBuilder for newer JJWT versions
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
