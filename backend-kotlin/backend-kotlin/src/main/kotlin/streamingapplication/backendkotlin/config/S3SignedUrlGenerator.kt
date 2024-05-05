package streamingapplication.backendkotlin.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.presigner.S3Presigner
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest
import java.net.URL
import java.time.Duration
@Component
object S3SignedUrlGenerator {

    @Value("\${aws.access}")
    private lateinit var AWS_ACCESS_KEY: String;

    @Value("\${aws.secretKey}")
    private lateinit var AWS_SECRET_KEY: String;

    @Value("\${aws.region}")
    private lateinit var AWS_REGION: String;

    @Value("\${aws.bucket}")
    private lateinit var BUCKET_NAME: String;



    fun generateSignedUrl(type: String, key: String): URL {
        val imageContent = ".$type".replace("image/", "")

        val credentials = AwsBasicCredentials.create(AWS_ACCESS_KEY, AWS_SECRET_KEY)
        val s3Client = S3Client.builder()
            .region(Region.of(AWS_REGION))
            .credentialsProvider { credentials }
            .build()

        val putObjectRequest = PutObjectRequest.builder()
            .bucket(BUCKET_NAME)
            .key("$key$imageContent")
            .acl("public-read")
            .contentType(type)
            .build()

        val presigner = S3Presigner.builder()
            .region(Region.of(AWS_REGION))
            .credentialsProvider { credentials }
            .build()

        val getObjectRequest = GetObjectRequest.builder()
            .bucket(BUCKET_NAME)
            .key("$key$imageContent")
            .build()

        val getObjectPresignRequest = GetObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(5)) // Adjust the duration as needed
            .getObjectRequest(getObjectRequest)
            .build()

        val presignedUrl = presigner.presignGetObject(getObjectPresignRequest).url()
        return presignedUrl
    }

    fun deleteObject(key: String) {
        val credentials = AwsBasicCredentials.create(AWS_ACCESS_KEY, AWS_SECRET_KEY)
        val s3Client = S3Client.builder()
            .region(Region.of(AWS_REGION))
            .credentialsProvider { credentials }
            .build()

        val deleteObjectRequest = DeleteObjectRequest.builder()
            .bucket(BUCKET_NAME)
            .key(key)
            .build()

        s3Client.deleteObject(deleteObjectRequest)
    }
}