package streamingapplication.backendkotlin.db


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import streamingapplication.backendkotlin.dbmodel.User
import java.util.*

@Repository
interface UserRepository : JpaRepository<User, Long> {
    @Query("SELECT u FROM User u")
    fun getAllUsers (): List<User>



}
