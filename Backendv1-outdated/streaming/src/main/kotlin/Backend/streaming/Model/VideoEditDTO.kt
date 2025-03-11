package Backend.streaming.Model

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size


data class VideoEditDTO(


    @field:Size(min = 5, max = 50, message = "Video title is too short, must be at least 5 characters ")
    var title: String?, // Title can be null, but if provided, it must not be blank

    @field:Size(max = 600, message = "Must be below 600 characters")
    var description: String?, // Description can be null

    var category: Int? // Category can also be null
)