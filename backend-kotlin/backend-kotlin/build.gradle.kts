import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.2.4"
	id("io.spring.dependency-management") version "1.1.4"
	kotlin("jvm") version "1.9.23"
	kotlin("plugin.spring") version "1.9.23"

}

group = "streaming-application"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	//	JWT
	implementation ("io.jsonwebtoken:jjwt-api:0.11.2")
	runtimeOnly ("io.jsonwebtoken:jjwt-impl:0.11.2")
	runtimeOnly ("io.jsonwebtoken:jjwt-jackson:0.11.2")
	// Database

	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
//	implementation ("com.microsoft.sqlserver:mssql-jdbc:9.4.1.jre8")

	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("com.microsoft.sqlserver:mssql-jdbc")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlin:kotlin-reflect")

//	AWS
	implementation("software.amazon.awssdk:s3:2.23.4")

	//
//	implementation ("com.amazonaws:aws-lambda-java-core:1.2.0")
//	implementation ("com.amazonaws:aws-lambda-java-events:3.11.0")
//	implementation ("org.springframework.cloud:spring-cloud-starter-function-web")
//	implementation ("org.springframework.cloud:spring-cloud-starter-aws")

}


dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:2021.0.0")
	}
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
