package Backend.streaming.Model.DTO

import Backend.streaming.Model.Enum.VideoCategory
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class VideoDTO(


    @NotBlank
    @Size( min = 5 , message = "Video title is too short, must be at least 5 characters ")
    @Size(max = 50, message = "Video is too long, larger than 50 characters")
    var title: String,

    @Size(max = 600, message = "Must be below 600 characters")
    var description: String?,

    var category: VideoCategory = VideoCategory.NONE,

    val videoContentType:String?,
    val imageContentType: String?

)
