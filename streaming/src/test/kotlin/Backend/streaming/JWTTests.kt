package Backend.streaming

import Backend.streaming.Service.JWTService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.Test
import kotlin.test.assertNotNull


@SpringBootTest
open class JWTTests {

    @Autowired
    lateinit var jwtService: JWTService

    @Test
    fun generateVideoSignedURL(){
        val signedURL = jwtService.generateTokenForVideo(1,"video/mp4","ztc4")
        println(signedURL)
        assertNotNull(signedURL)


    }
}