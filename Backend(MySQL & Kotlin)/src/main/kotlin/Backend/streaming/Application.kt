package Backend.streaming

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class Application

fun main(args: Array<String>) {
    val dotenv: Dotenv = dotenv()

	// Optional: Print the environment variables for debugging purposes
	dotenv.entries().forEach { entry ->
		println("${entry.key} = ${entry.value}")
		System.setProperty(entry.key, entry.value) // Optional: set system properties for debugging
	}
	runApplication<Application>(*args)


}
