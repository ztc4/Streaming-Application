package Backend.streaming.Model.DB

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "Token")
data class Token (
    @Id
    val token: String?,
    val userId: Long?
)
