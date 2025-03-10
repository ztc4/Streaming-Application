package Backend.streaming.Model.DTO

import Backend.streaming.Model.Enum.VideoCategory
import jakarta.validation.constraints.Size


data class VideoEditDTO(


    @field:Size(min = 5, max = 50, message = "Video title is too short, must be at least 5 characters ")
    var title: String?, // Title can be null, but if provided, it must not be blank

    @field:Size(max = 600, message = "Must be below 600 characters")
    var description: String?, // Description can be null

    var category: VideoCategory = VideoCategory.NONE // Category can also be null
)