plugins {
	kotlin("jvm") version "1.9.25"
	kotlin("plugin.spring") version "1.9.25"
	id("org.springframework.boot") version "3.3.4" // Updated to match Spring Boot version
	id("io.spring.dependency-management") version "1.1.6"
}

group = "Backend"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

dependencies {

	implementation("io.github.cdimascio:dotenv-kotlin:6.4.1")
	// Web & Core dependencies
	implementation("org.springframework.boot:spring-boot-starter-web:3.3.4") // Updated to match Spring Boot version
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.17.1")
	implementation("org.jetbrains.kotlin:kotlin-reflect:1.9.25") // Updated to match Kotlin version

	// Database dependencies
//	runtimeOnly("com.mysql:mysql-connector-j:8.1.0")
	runtimeOnly("com.mysql:mysql-connector-java:8.1.0")
	implementation("com.mysql:mysql-connector-j:8.1.0")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	// Model Validation
	implementation("org.springframework.boot:spring-boot-starter-validation")

	// Spring Security
	implementation("org.springframework.boot:spring-boot-starter-security:3.2.8")

	// Jakarta Servlet API
	implementation("jakarta.servlet:jakarta.servlet-api:6.1.0")

	// JWT dependencies (JJWT)
	implementation("io.jsonwebtoken:jjwt-api:0.12.3")
	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.6")
	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.5") // Using Jackson for JSON parsing

	// Development tools
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	// Testing dependencies
	testImplementation("org.springframework.boot:spring-boot-starter-test:3.3.1") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine") // Ensure JUnit 5
	}
	testImplementation("org.springframework.security:spring-security-test:6.3.0")
	testImplementation("org.jetbrains.kotlin:kotlin-test-junit5:1.9.25")
	testImplementation("org.junit.jupiter:junit-jupiter-api:5.10.3")
	testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.10.2")
}

kotlin {
	compilerOptions {
		freeCompilerArgs.addAll("-Xjsr305=strict")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
