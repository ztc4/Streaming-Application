package streamingapplication.backendkotlin.db


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import streamingapplication.backendkotlin.dbmodel.Token


@Repository
interface TokenRepository: JpaRepository<Token, Long> {

    fun findByToken(token: String): Token?




}