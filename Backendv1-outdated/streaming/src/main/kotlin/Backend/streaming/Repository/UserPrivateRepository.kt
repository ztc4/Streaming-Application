package Backend.streaming.Repository

import Backend.streaming.Model.UserLoginDTO
import Backend.streaming.Model.UserPrivate
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query

interface UserPrivateRepository: JpaRepository<UserPrivate, Long> {

    // Original method to find UserPrivate by email
    fun findByEmail(email: String): UserPrivate?

//    fun findByUsername(username: String): UserPrivate?

    // Your new method to find by email and return LoginDTO
    @Query("SELECT new Backend.streaming.Model.UserLoginDTO(up.email, up.password, u.username) FROM UserPrivate up JOIN up.user u WHERE up.email = :email")
    fun findByEmailLimitValues(email: String): UserLoginDTO?

    // Delete method by email
    @Modifying // Add this annotation
    @Query("DELETE FROM UserPrivate up WHERE up.email = :email") // Specify delete query
    fun deleteByEmail(email: String)

//    @Modifying // Add this annotation
//    @Query("DELETE FROM UserPrivate up WHERE up.username = :username") // Specify delete query
//    fun deleteByUsername(username: String)
}