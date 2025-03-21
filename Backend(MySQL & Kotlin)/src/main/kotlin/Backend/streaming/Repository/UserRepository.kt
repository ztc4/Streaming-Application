package Backend.streaming.Repository

import Backend.streaming.Model.DB.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Long> {


    fun findByUsername(username: String): User?
}