package Backend.streaming.Repository

import Backend.streaming.Model.DB.Subscription
import Backend.streaming.Model.DB.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface SubscriptionRepository : JpaRepository<Subscription, Long> {

    @Query("SELECT s FROM Subscription s WHERE s.subscriber.id = :subscriberId")
    fun findAllBySubscriberId(subscriberId: Long): List<Subscription>
    fun findBySubscriber( subscriber: User): List<Subscription>
    fun findBySubscriberIdAndUserSubscribedToId(subscriberId: Long, userSubscribedToId: Long): Subscription?
    fun existsBySubscriberIdAndUserSubscribedToId(subscriberId: Long, userSubscribedToId: Long): Boolean
}