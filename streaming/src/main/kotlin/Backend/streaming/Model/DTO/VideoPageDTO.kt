package Backend.streaming.Model.DTO

import Backend.streaming.Model.DB.Video

data class VideoPageDTO(
    var videos : List<Video>,
    var last : Boolean,

)
