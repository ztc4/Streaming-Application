package Backend.streaming.Repository

import Backend.streaming.Model.Subscription
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SubscriptionRepository : JpaRepository<Subscription, Long> {

    fun findAllBySubscriberId(subscriberId: Long): List<Subscription>
    fun findBySubscriberIdAndUserSubscribedToId(subscriberId: Long, userSubscribedToId: Long): Subscription?
    fun existsBySubscriberIdAndUserSubscribedToId(subscriberId: Long, userSubscribedToId: Long): Boolean
}