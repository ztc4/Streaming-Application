package streamingapplication.backendkotlin.dbmodel

import jakarta.persistence.*

@Entity
@Table(name = "Subscription")
data class Subscription(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val subscriptionId: Long? = null,
    val subscriberId: Long,
    val userSubscribedToId: Long
)