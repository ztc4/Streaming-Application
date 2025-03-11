package Backend.streaming.Service

import Backend.streaming.Model.DB.Playlist
import Backend.streaming.Model.DB.User
import Backend.streaming.Model.DB.UserPrivate
import Backend.streaming.Model.DTO.UserCreateDTO
import Backend.streaming.Model.DTO.UserLoginDTO
import Backend.streaming.Model.Enum.PlaylistCategory
import Backend.streaming.Repository.PlaylistRepository
import Backend.streaming.Repository.UserPrivateRepository
import Backend.streaming.Repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional


@Service
class UserService(
    private val userRepository: UserRepository,
    private val userPrivateRepository: UserPrivateRepository,
    private val playlistRepository: PlaylistRepository,
) {
    @Transactional
    fun createAccount(userCreateDTO: UserCreateDTO): UserPrivate {
        val user = User(username = userCreateDTO.username)
        val savedUser = userRepository.save(user)

        //Create Initial Users
        val userPrivate = UserPrivate(
            password = userCreateDTO.password,
            email = userCreateDTO.email,
            firstName = userCreateDTO.firstName,
            lastName = userCreateDTO.lastName,
            phoneNumber = userCreateDTO.phoneNumber,
            user = savedUser
        )
        // Create Generic Playlist
        val pastActivity = Playlist(user = savedUser, name = "Past Activity" , category = PlaylistCategory.ACTIVITY);
        val watchLater = Playlist(user = savedUser, name = "Watch Later", category = PlaylistCategory.LATER);
        val playlist = listOf(watchLater, pastActivity);
        playlistRepository.saveAll(playlist);

        // Save them Both in Database
        return userPrivateRepository.save(userPrivate)
    }



    @Transactional(readOnly = true)
    fun verifyUser(userLoginDTO: UserLoginDTO): UserLoginDTO {
        val dbUserLoginDTO = userPrivateRepository.findByEmailLimitValues(userLoginDTO.email)
            ?: throw RuntimeException("User doesn't exist!")
        if(userLoginDTO.password != dbUserLoginDTO.password){
            throw RuntimeException("Invalid Password")
        }
        return dbUserLoginDTO
    }
    fun findAllUsers(): MutableList<UserPrivate> {
        return userPrivateRepository.findAll()
    }
    fun findAll(): MutableList<User> {
        return userRepository.findAll()
    }
    @Transactional
    fun deleteUser( username:String){
        val userPrivate = userPrivateRepository.findByEmail(username)
        if (userPrivate != null) {
            userPrivate.user?.let { userRepository.delete(it) } // Manually delete the associated User
            userPrivateRepository.delete(userPrivate) // Then delete UserPrivate
        }
    }


}