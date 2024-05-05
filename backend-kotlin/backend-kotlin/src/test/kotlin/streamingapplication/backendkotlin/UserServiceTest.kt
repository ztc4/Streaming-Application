package streamingapplication.backendkotlin

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.mockito.MockitoAnnotations
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import streamingapplication.backendkotlin.db.UserPrivateRepository
import streamingapplication.backendkotlin.db.UserRepository
import streamingapplication.backendkotlin.dbmodel.Token
import streamingapplication.backendkotlin.dbmodel.User
import streamingapplication.backendkotlin.dbmodel.UserPrivate
import streamingapplication.backendkotlin.service.TokenService
import streamingapplication.backendkotlin.service.UserService
import javax.sql.DataSource



class UserServiceTest {

    @Mock
    private lateinit var userRepository: UserRepository

    @Mock
    private lateinit var userPrivateRepository: UserPrivateRepository

    @Mock
    private lateinit var tokenService: TokenService

    @InjectMocks
    private lateinit var userService: UserService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)

    }

//    @Test
//    fun testCreateUser() {
//        val username = "testUser"
//        val email = "test@example.com"
//        val password = "Test@123"
//        val firstName = "John"
//        val lastName = "Doe"
//        val phoneNumber: Long? = null
//
//        val expectedToken = "dummyToken"
//        val userId = 1L
//
//        Mockito.`when`(userRepository.save(Mockito.any())).thenAnswer {
//            val user = it.arguments[0] as User
//            user.id = userId
//            user
//        }
//
//        Mockito.`when`(tokenService.generateToken(userId)).thenReturn(expectedToken)
//
//        val response = userService.createUser(username, email, password, firstName, lastName, phoneNumber)
//        println(response.body)
//
//        assertEquals(HttpStatus.OK, response.statusCode)
//        assertEquals(expectedToken, response.body)
//    }
}
