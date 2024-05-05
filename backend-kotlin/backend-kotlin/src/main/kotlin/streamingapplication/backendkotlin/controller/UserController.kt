package streamingapplication.backendkotlin.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import streamingapplication.backendkotlin.model.CreateUserRequest
import streamingapplication.backendkotlin.dbmodel.User
import streamingapplication.backendkotlin.model.Login
import streamingapplication.backendkotlin.service.UserService

@RestController
@RequestMapping("/api/user") //localhost:8080/api/user/all
class UserController (val service: UserService){

    @PostMapping("create")
    fun createUsers(
        @RequestBody request: CreateUserRequest
    ): ResponseEntity<Any> = service.createUser(request.username, request.email, request.password, request.firstName, request.lastName, request.phoneNumber)


    @PostMapping("login")
    fun login(@RequestBody login: Login): ResponseEntity<Any> = service.login(login)

    @GetMapping("all")
    fun getAllUsers(): List<User> = service.getAllUsers()



}