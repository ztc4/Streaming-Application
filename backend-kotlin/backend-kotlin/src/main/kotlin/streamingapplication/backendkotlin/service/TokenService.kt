package streamingapplication.backendkotlin.service

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import streamingapplication.backendkotlin.db.TokenRepository
import streamingapplication.backendkotlin.dbmodel.Token
import java.util.*

@Service
class TokenService {

    @Autowired
    private lateinit var tokenRepository: TokenRepository
    private val secretKey = "mySecretKeyIsJustGettingStarted7837842739Gelhello" // Replace with a strong, secret key

    fun generateToken(userId: Long): String? {
        val expirationTime = 1000 * 60 * 60 * 10 // 10 hours in milliseconds
        val jwt =  Jwts.builder()
            .setSubject(userId.toString())
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + expirationTime))
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact()

        val result = addTokenToDatabase(userId, jwt)
        return if(result){
            jwt
        }else{
            null
        }
    }


    private fun addTokenToDatabase(userId: Long, tokenValue: String): Boolean {
        val token = Token(userId= userId, token = tokenValue)
        return try {
            tokenRepository.save(token)
            true
        }
        catch (ex: Exception){
            false
        }
    }

    fun findTokenByValue(tokenValue: String): Token? {
        return tokenRepository.findByToken(tokenValue)
    }
    fun getUserIdFromToken(token: String): Long? {
        return try {
            val claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).body
            claims.subject.toLong()
        }
        catch (ex:Exception){
            null
        }
    }
    //    fun deleteTokenByValue(tokenValue: String): Boolean {
//        val token = tokenRepository.findByToken(tokenValue)
//        return if (token != null) {
//            tokenRepository.deleteByToken(tokenValue)
//            true
//        } else {
//            false
//        }
//    }
}
