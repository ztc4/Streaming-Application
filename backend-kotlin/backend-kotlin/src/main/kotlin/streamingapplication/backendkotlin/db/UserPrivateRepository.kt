package streamingapplication.backendkotlin.db

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import streamingapplication.backendkotlin.dbmodel.UserPrivate

@Repository
interface UserPrivateRepository: JpaRepository<UserPrivate, Long> {

    fun getByEmail(email: String): UserPrivate?

}