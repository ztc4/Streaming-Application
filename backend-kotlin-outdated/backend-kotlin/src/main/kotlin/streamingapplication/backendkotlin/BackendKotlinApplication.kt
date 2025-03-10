package streamingapplication.backendkotlin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BackendKotlinApplication

fun main(args: Array<String>) {
	runApplication<BackendKotlinApplication>(*args)
}
