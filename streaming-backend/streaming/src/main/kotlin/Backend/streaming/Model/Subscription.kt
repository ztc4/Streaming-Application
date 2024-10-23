package Backend.streaming.Model

import jakarta.persistence.*

@Entity
@Table(name = "Subscription")
data class Subscription (
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   val subscriptionId: Long? = null,

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "subscriber_id", referencedColumnName = "id")
   val subscriber: User,

   @ManyToOne(fetch = FetchType.LAZY)
   @JoinColumn(name = "user_subscribed_to_id", referencedColumnName = "id")
   val userSubscribedTo: User
){
   // No-argument constructor for Hibernate
   constructor() : this(null, User(), User())
}