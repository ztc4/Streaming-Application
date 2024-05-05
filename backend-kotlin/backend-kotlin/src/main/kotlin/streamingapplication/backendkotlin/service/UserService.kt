package streamingapplication.backendkotlin.service

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import streamingapplication.backendkotlin.db.UserPrivateRepository
import streamingapplication.backendkotlin.db.UserRepository
import streamingapplication.backendkotlin.dbmodel.User
import streamingapplication.backendkotlin.dbmodel.UserPrivate
import streamingapplication.backendkotlin.model.Login
import streamingapplication.backendkotlin.model.validUserToken

@Service
class UserService( private val userRepository: UserRepository, private val userPrivateRepository: UserPrivateRepository, private val tokenService: TokenService) {

    //1  Create the User
    fun createUser(username: String = "",email: String = "",
                   password: String= "",firstName: String = "",
                   lastName: String = "", phoneNumber: Long? = null):ResponseEntity<Any> {

        println("This was toucheds")
        println(username +  email +  password + lastName + 1)
        var userId: Long? = null;
       try{
            val errors = validateUserInformation(firstName,lastName,email,username,password);
            if (errors.size > 0){
                return ResponseEntity.status(300).body(errors)
            }
            val privateUser = UserPrivate(email = email.toLowerCase(), password = password, firstName = firstName.toLowerCase(), lastName = lastName.toLowerCase(), phoneNumber = phoneNumber )
            val createdPrivateUser = userPrivateRepository.save(privateUser)

           userId = createdPrivateUser.userId;
           val userPublic = User(username =  username, id = createdPrivateUser.userId);
            val user = userRepository.save(userPublic);
           val token = user.id?.let { tokenService.generateToken(it) };

           return ResponseEntity.status(200).body(token)


        }
        catch (ex:Exception){
            if(userId != null) {
                userRepository.deleteById(userId);
                userPrivateRepository.deleteById(userId);
            }
            return ResponseEntity.status(400).body(ex)
        }


    }
    private fun validateUserInformation(firstName:String, lastName:String,
                                        email: String?, username:String?, password: String): ArrayList<String>{
        val errors = ArrayList<String>();
        if(
            firstName == ""
        ){
            errors.add("You must have an first name!")
        }
        if(
            lastName == ""
        ){
            errors.add("You must have an last name!")
        }
        if(
            email == ""||
            email == null || // check if email is null
            !email.contains("@",true)|| // check if it has @
            email.length < 5 || // is it less than 5
            !email.endsWith(".com",true)// check if it doesn't end in .co
        ){
            errors.add("Email isn't valid")

        }
        if(
            username == "" ||
            username == null || // is it null
            username.length < 3 || // string must be more than 3 letters
            username.length > 16 // max characters is 16
        ){
            errors.add("Username isn't valid")
        }
        if(
            password == "" ||
            password.length < 7
        ){
            errors.add("Not an Valid Password")
        }


        return errors

    }
    //2  User login and send back token
    fun login(loginInformation: Login): ResponseEntity<Any>{
        try {
           val user =  userPrivateRepository.getByEmail(loginInformation.email.toLowerCase())
            if(user == null){
                return ResponseEntity.status(404).body("There exist no such user with that password!")
            }
            // check if password match
            if(user.password != loginInformation.password){
                return ResponseEntity.status(404).body(" Incorrect password was entered")
            }
            // Create Token and send back
            val userId = user.userId!!
            val token = tokenService.generateToken(userId)
            if(token ==  null){
                throw Exception("Trouble generating token")
            }
            else{
                return ResponseEntity.status(200).body(token)
            }


        }
        catch (ex:Exception){
            return ResponseEntity.status(500).body("Ran into internal Server Error")
        }

    }

    // Check If the token is valid
    fun checkIfTokenIsValidUser(token:String): validUserToken{
        try{
            val userIdFromToken =  tokenService.getUserIdFromToken(token)// Take token and get user ID
            if(userIdFromToken == null ){
            return validUserToken(false, null)
            }
            val foundUser = userRepository.existsById(userIdFromToken)
            if(!foundUser){
                return validUserToken(false, userIdFromToken)
            }
            return validUserToken(true, userIdFromToken)

        }
        catch (ex:Exception){
           return validUserToken(false, null)
        }
    }




// Temporary method
    fun getAllUsers(): List<User>{
        val users = userRepository.getAllUsers()
        return users
    }




}