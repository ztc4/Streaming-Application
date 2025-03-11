package Backend.streaming.Service

import Backend.streaming.Model.DB.Subscription
import Backend.streaming.Model.DB.VideoFeedback
import Backend.streaming.Repository.SubscriptionRepository
import Backend.streaming.Repository.UserRepository
import Backend.streaming.Repository.VideoRepository
import Backend.streaming.Repository.videoFeedbackRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ActionService(
    private val subscriptionRepository:SubscriptionRepository,
    private val userRepository: UserRepository,
    private val videoRepository: VideoRepository,
    private val videoFeedbackRepository: videoFeedbackRepository
) {

    fun likeVideo(videoId: Long, username: String) {
        val video = videoRepository.findById(videoId)
            .orElseThrow { Exception("Video not found!") }

        val user = userRepository.findByUsername(username)
            ?: throw Exception("User not found!")

        // Check if the user has already liked the video
        val existingFeedback = videoFeedbackRepository.findByVideoAndUser(video, user)

        if (existingFeedback == null) {
            // Create a new feedback entry
            val feedback = VideoFeedback(video = video, user = user)
            videoFeedbackRepository.save(feedback)

            // Increment the like count on the video
            video.likes += 1
            videoRepository.save(video)
        } else {
            throw Exception("User has already liked this video.")
        }
    }


    fun unlikeVideo(videoId: Long, username: String) {
        val video = videoRepository.findById(videoId)
            .orElseThrow { Exception("Video not found!") }

        val user = userRepository.findByUsername(username)
            ?: throw Exception("User not found!")

        val rowsDeleted = videoFeedbackRepository.deleteByVideoAndUser(video, user)
        if (rowsDeleted == 0) {
            throw Exception("User has already unliked this video.")
        }
        else{
            video.likes -= 1
            videoRepository.save(video)
        }
    }


    @Transactional
    fun subscribe(subscriberUsername:String, subscribeToId: Long){ // First one is user trying to subscribe
        val subscribe = userRepository.findByUsername(subscriberUsername)
            ?: throw RuntimeException(" $subscriberUsername couldn't be found!")
        val subscribedTo = userRepository.findById(subscribeToId)
            .orElseThrow{ RuntimeException("User you wanted to subscribed to wasn't found!")}

        val alreadyExist = subscriptionRepository
            .existsBySubscriberIdAndUserSubscribedToId(subscribe.id!!, subscribedTo.id!!)

        if (alreadyExist) {
            throw IllegalStateException("You are already subscribed to this user!")
        }

        val subscription = Subscription(subscriber = subscribe, userSubscribedTo = subscribedTo)
        subscriptionRepository.save(subscription)
    }

    @Transactional
    fun unsubscribe(subscriberUsername:String, subscribeToId: Long){
        val subscribe = userRepository.findByUsername(subscriberUsername)
            ?: throw RuntimeException(" $subscriberUsername couldn't be found!")

        val subscription = subscribe.id?.let { subscriptionRepository.findBySubscriberIdAndUserSubscribedToId(it, subscribeToId) }
            ?: throw RuntimeException("User you wanted to subscribe to wasn't found!")


        println(subscription)
        subscriptionRepository.delete(subscription)
    }



    fun isSubscribed(subscriberUsername: String ,subscribeToId: Long): Boolean {
        val subscribe = userRepository.findByUsername(subscriberUsername)
            ?: return false
        return subscribe.id!!.let { subscriptionRepository.existsBySubscriberIdAndUserSubscribedToId(it, subscribeToId) }
    }


}