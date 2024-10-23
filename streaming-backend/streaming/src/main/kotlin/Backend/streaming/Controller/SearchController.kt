package Backend.streaming.Controller

import Backend.streaming.Model.SearchDTO
import Backend.streaming.Service.SearchService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/search")
class SearchController(val searchService: SearchService) {


    @GetMapping("/videos")
    fun findVideos(
        @RequestParam(required = false) title: String?,
        @RequestParam(required = false) category: Int?,
        @RequestParam(required = false) username: String?,
        @RequestParam(required = false) sortBy: String?,
        @RequestParam(required = false) order: String?,
        @RequestParam(required = false) page: Int = 0
    ): ResponseEntity<Any> {

        return try {
            // Create SearchDTO from query params
            val searchDTO = SearchDTO(
                title = title,
                category = category,
                username = username,
                sortBy = sortBy,
                order = order
            )

            // Fetch videos based on search criteria
            val videos = searchService.getVideo(searchDTO)
            println(videos)
            ResponseEntity.ok().body(videos) }
        catch (e: Exception) {
            ResponseEntity.internalServerError().body(e.message)
        }
    }

    @GetMapping("/users")
    fun findUsers(
        @RequestParam(required = true) username: String?
    ): ResponseEntity<Any>{
        return try {
            ResponseEntity.ok().body("hello")
        }
        catch (e:Exception){
            ResponseEntity.internalServerError().body("hello")
        }
    }
}
