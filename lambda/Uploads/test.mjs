import {handler} from "./Videos/index.mjs"
import {handler as thumbnailHandler} from "./Images/Thumbnails/index.mjs"

let videoEvent = {
    headers:{
        "authorization": "Bearer " + process.env.Token
    },
     body: {
       "contentType": "video/mp4"
     }
  }
console.log("------- Now testing the Video Lambda -----------")

let result = await handler(videoEvent)
console.log(result)

console.log("------- Now testing the Thumbnail Lambda -----------")
let thumbnailEvent = {
    headers:{
        "authorization": "Bearer " + process.env.Token
    },
    body: {
        "contentType": "image/webp"
    }
}

let thumbnailResult = await thumbnailHandler(thumbnailEvent)
console.log(thumbnailResult)