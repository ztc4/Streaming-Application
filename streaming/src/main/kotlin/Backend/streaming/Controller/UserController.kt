package Backend.streaming.Controller

import Backend.streaming.Config.CustomUserPrincipal
import Backend.streaming.Model.DTO.UserCreateDTO
import Backend.streaming.Model.DTO.UserLoginDTO
import Backend.streaming.Service.ActionService
import Backend.streaming.Service.JWTService
import Backend.streaming.Service.UserService
import jakarta.validation.Valid
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/user")
class UserController( val userService: UserService,val actionService: ActionService , val jwtService: JWTService) {

    @PostMapping("/createAccount")
    fun createAccount(@Valid @RequestBody userCreateDTO: UserCreateDTO): ResponseEntity<Any>{
        return try {
        val createdAccount = userService.createAccount(userCreateDTO);
            val token = createdAccount.email.let { jwtService.generateToken(email = it, username = createdAccount.user!!.username) }
            ResponseEntity.ok(token)
        }catch (e: Exception){
            println("Data integrity violation: ${e.message}")
            when (e){
                is DataIntegrityViolationException  -> {

                    ResponseEntity.badRequest().body("Username or email already exist!")
                }
                else ->{
                    ResponseEntity.internalServerError().body(" An error occurred while creating account")
                }
            }
        }
    }

    // Too specifics error! It saying when the password is wrong and if a user exist!
    @PostMapping("/login")
    fun login(@Valid @RequestBody userLoginDTO: UserLoginDTO): ResponseEntity<Any>{
        return try{
            // Search Database and get LoginDTO from the matching email
            val verifiedLoginDTO = userService.verifyUser(userLoginDTO)
            println("This is the $verifiedLoginDTO ")
            val token = verifiedLoginDTO.username?.let { jwtService.generateToken(email = verifiedLoginDTO.email, username = it) }
            println(token)
            println("The token value is above!")
            ResponseEntity.ok(token)

        }catch (e: Exception){
            ResponseEntity.badRequest().body(e.message)
        }
    }
    @DeleteMapping("/deleteAccount")
    fun deleteAccount(): ResponseEntity<Any>{

        // Get MiddleWare Values
        val authentication = SecurityContextHolder.getContext().authentication
        val principal = authentication?.principal as? CustomUserPrincipal
        val usernameAuth = principal?.username
        val email = principal!!.email
        return try {
            userService.deleteUser(email)
            ResponseEntity.ok("Account was deleted Successfully!")

        }
        catch(e: Exception){
            ResponseEntity.badRequest().body(e.message)
        }
    }



    @GetMapping("/get")
    fun getUserPublic():ResponseEntity<Any>{
        val users = userService.findAll()
       return  ResponseEntity.ok(users)
    }
//
    @GetMapping("/getPrivate")
    fun getUserPrivate():ResponseEntity<Any>{
        val users = userService.findAllUsers()
        return  ResponseEntity.ok(users)
    }
}