package Backend.streaming.Service

import Backend.streaming.Model.DB.Subscription
import Backend.streaming.Model.DB.User
import Backend.streaming.Model.DB.Video
import Backend.streaming.Model.DTO.SearchDTO
import Backend.streaming.Model.DTO.isLikedVideoDTO
import Backend.streaming.Model.Projections.VideoExpandedProjection
import Backend.streaming.Model.Projections.VideoProjection
import Backend.streaming.Repository.SubscriptionRepository
import Backend.streaming.Repository.UserRepository
import Backend.streaming.Repository.VideoRepository
import Backend.streaming.Repository.videoFeedbackRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class SearchService(
    val actionService: ActionService,
    val videoService: VideoService,
    val videoFeedbackRepository: videoFeedbackRepository,
    val videoRepository: VideoRepository,
    val userRepository: UserRepository,
    val subscriptionRepository: SubscriptionRepository) {

    //title ignore case || views/likes/createdAtTime ||
    fun getVideo(searchDTO: SearchDTO, username: String? = null): Page<isLikedVideoDTO>? {
        lateinit var pageRequest:PageRequest
        var result : Page<VideoProjection>?
        // Handle sorting and pagination
        pageRequest = when (searchDTO.order) {
            "descending" -> {
                println("Descending")
                PageRequest.of(searchDTO.page, 10, Sort.by(searchDTO.sortBy).descending())
            }
            "ascending" -> {
                println("Ascending")
                PageRequest.of(searchDTO.page, 10, Sort.by(searchDTO.sortBy).ascending())
            }
            else -> {
                println("Neither")
                PageRequest.of(searchDTO.page, 10)
            }
        }

        result = when {
            searchDTO.title != null && searchDTO.category != null -> {
                videoRepository.findByTitleContainingIgnoreCaseAndCategory(searchDTO.title!!, searchDTO.category, pageRequest)
            }
            searchDTO.title != null && searchDTO.category == null -> {
                videoRepository.findByTitleContainingIgnoreCase(searchDTO.title, pageRequest)
            }
            searchDTO.title == null && searchDTO.category != null -> {
                videoRepository.findByCategory(searchDTO.category, pageRequest)
            }
            searchDTO.username != null -> {
                videoRepository.findByUserUsername(searchDTO.username, pageRequest)
            }
            else -> {
                videoRepository.findAllWithProjection(pageRequest)
            }
        }
        return result.map{
            var isLiked = false
            var isSubscribed = false
            if(username != null){
                isLiked = videoService.isVideoLiked(it.getVideoId()!!, username)
                isSubscribed = actionService.isSubscribed(username, it.getUser().id!!)
            }

            isLikedVideoDTO(video = it, isLiked = isLiked, isSubscribed = isSubscribed )
        }
    }

    fun getLatestVideoByUserId(id: Long, username: String? = null): isLikedVideoDTO {
        print("The is is $id and the username is $username")

        val result: VideoProjection = videoRepository.findLatestVideoByUserId(id) ?: throw IllegalArgumentException("The video doesn't exist!")


        return if(username != null){
            val isLiked = videoService.isVideoLiked(result.getVideoId()!!, username)
            val isSubscribed = actionService.isSubscribed(username, result.getUser().id!!)
            isLikedVideoDTO(result, isLiked, isSubscribed)
        } else{
            isLikedVideoDTO(result, isLiked = false, isSubscribed = false)
        }

    }

    fun getVideoById(id:Long): Video{
        return videoRepository.getReferenceById(id)
    }
    fun getVideoExpanded(id: Long): VideoExpandedProjection {
        println(id)
        return videoRepository.findByVideoId(id) ?: throw IllegalArgumentException("Couldn't find the Video")
    }

    fun getLikedVideos(username:String, order: String , page: Int ):Page<isLikedVideoDTO>{
        val user = userRepository.findByUsername(username)
            ?: throw Exception("User not found!")

        val pageRequest: PageRequest =  when(order){
            "descending" -> {PageRequest.of(page, 10, Sort.by("createdAt").descending())}
            else -> {PageRequest.of(page, 10, Sort.by("createdAt").ascending())}
        }

        val videos: Page<Video> = videoFeedbackRepository.findByUserId(user.id!!, pageRequest)

        return videos.map{
            var isSubscribed: Boolean;
            isSubscribed = actionService.isSubscribed(username, it.user?.id!!)
            val videoProjection = videoService.videoToVideoProjection(it)
            isLikedVideoDTO(video = videoProjection, isLiked = true, isSubscribed )
        }


    }

    fun getSubscriptions(subscriberUsername: String): List<Subscription> {
        val subscribe = userRepository.findByUsername(subscriberUsername)
            ?: throw RuntimeException(" $subscriberUsername couldn't be found!")
        println("This is the following user $subscribe")

        return subscriptionRepository.findAllBySubscriberId(subscribe.id!!)
    }

    fun getUser(id:Long?, username: String?): User {
        println("The ID is $id and the username is $username")
        if(id == null && username == null) throw IllegalArgumentException("User wasn't specified!")

        return if (username != null){
            val user: User = userRepository.findByUsername(username) ?: throw IllegalArgumentException("No user exist with the following username $username!")
            user
        }else{
            val user: User = userRepository.findById(id!!)
                .orElseThrow { IllegalArgumentException("User with ID $id wasn't found") }
            user
        }

    }





}