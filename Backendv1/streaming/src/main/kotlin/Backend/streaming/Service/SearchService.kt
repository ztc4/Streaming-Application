package Backend.streaming.Service

import Backend.streaming.Model.SearchDTO
import Backend.streaming.Model.User
import Backend.streaming.Model.Video
import Backend.streaming.Repository.SubscriptionRepository
import Backend.streaming.Repository.UserRepository
import Backend.streaming.Repository.VideoRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class SearchService(
    val videoRepository: VideoRepository,
    val userRepository: UserRepository,
    val subscriptionRepository: SubscriptionRepository) {

    //title ignore case || views/likes/createdAtTime ||
    fun getVideo(searchDTO: SearchDTO): Page<Video>? {
        lateinit var pageRequest:PageRequest

        if(searchDTO.order == "descending"){
          pageRequest = PageRequest.of(0, 10, Sort.by(searchDTO.sortBy).descending()) }
        else if (searchDTO.order =="ascending"){ pageRequest = PageRequest.of(0, 10, Sort.by(searchDTO.sortBy).ascending()) }
        else{ pageRequest= PageRequest.of(0, 10) }

        if(searchDTO.title != null && searchDTO.category != null){
            return videoRepository.findByTitleContainingIgnoreCaseAndCategory(searchDTO.title!!,searchDTO.category, pageRequest)
        }else if(searchDTO.title != null  && searchDTO.category == null ){
           return videoRepository.findByTitleContainingIgnoreCase(searchDTO.title!!, pageRequest)
        }else if(searchDTO.title == null  && searchDTO.category != null){
            return videoRepository.findByCategory(searchDTO.category, pageRequest)
        }else if( searchDTO.username != null){
            return videoRepository.findByUserUsername(searchDTO.username, pageRequest)
        } else{
          return  videoRepository.findAll(pageRequest)
        }

    }

    fun getSubscriptionForUser(subscriberUsername: String ,subscribeToId: Long) :List<User>{
        val subscribe = userRepository.findByUsername(subscriberUsername)
            ?: throw RuntimeException(" $subscriberUsername couldn't be found!")

        return subscriptionRepository //  If problem encountered it might be due to id ability to be null
            .findAllBySubscriberId(subscribe.id!!)
            .map { it.userSubscribedTo }
    }
}