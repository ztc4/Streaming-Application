# API DOCUMENTATION
 
###  Search 
##### Returns Videos ++
#### http://localhost:8080/api/v1/search/videos? -> /api/search/videos? (GET) ** Get Videos **
#### http://localhost:8080/api/v1/search/liked -> /api/search/videos/liked (GET)  ** Get Liked Videos **
#### http://localhost:8080/api/v1/search/playlist/4?page=0 -> /api/search/videos/playlist?pId=4&page=0 (GET) ** Get Videos by the Playlist **
##### Return Video ++
#### http://localhost:8080/api/v1/search/video/3 -> /api/search/video/3 (GET) ** Get Video by ID**
#### http://localhost:8080/api/v1/search/video/expanded/3 -> /api/search/video/3?expanded=true (GET) ** Get Video by ID Expanded**
##### Return Playlist
#### http://localhost:8080/api/v1/playlist/9?expanded=true -> /api/search/playlist/9?expanded=true ** Get Certain playlist **  ( expanded or unexpanded, SEMI_PROTECTED)
#### http://localhost:8080/api/v1/playlist/me?category=NONE -> /api/protected/playlist/me?category=ACTIVITY (GET) ** GET PLAYLIST ** (PROTECTED)
##### Return Users


### Auth ++ 
#### http://localhost:8080/api/v1/user/login -> /api/auth/login (POST) ** LOGIN **
#### http://localhost:8080/api/v1/user/createAccount-> /api/auth/signup (POST) ** SIGNUP **

### Playlist ++
#### http://localhost:8080/api/v1/playlist -> /api/protected/playlist (POST) ** Create Playlist **
#### http://localhost:8080/api/v1/playlist?pID=6  -> /api/protected/playlist?id=6 (PUT) ** Edit Playlist **
#### http://localhost:8080/api/v1/playlist/6  -> /api/protected/playlist?id=6 (DELETE) ** Delete Playlist **
#### http://localhost:8080/api/v1/playlist/add?pID=1&vID=4 (PUT) -> /api/protected/playlist/videos?pId=4&vId=1 (POST) ** Add Video to Playlist **
#### http://localhost:8080/api/v1/playlist/delete?pID=3&vID=1  -> /api/protected/playlist/videos?pId=4&vId=1 (DELETE) ** Delete Video to Playlist **


### Video ++
#### http://localhost:8080/api/v1/video/createVideo  -> /api/protected/video (POST) ** Create Video **
#### http://localhost:8080/api/v1/video/deleteVideo/{videoId} -> /api/protected/video?id=1 (DELETE) ** Delete Video**
#### http://localhost:8080/api/v1/video/editVideo/1   -> /api/protected/video?id=1 (PUT)  ** Edit Video **

### Action ++
#### http://localhost:8080/api/v1/action/likeVideo/1 (POST) -> /api/protected/action/video?id=1 ** Like a Video ** ( PROTECTED )
#### http://localhost:8080/api/v1/action/unlikeVideo/1 (PUT) -> /api/protected/action/video?id=1  (DELETE) ** Dislike a Video ** ( PROTECTED )
#### #### http://localhost:8080/api/v1/action/subscription/subscribe/1 (POST) -> /api/protected/action/subscription?id=1  ** Subscribe ** ( PROTECTED )
#### http://localhost:8080/api/v1/action/subscription/unsubscribe/1 (DELETE) -> /api/protected/action/subscription?id=1 ** Unsubscribe ** ( PROTECTED )
#### 


### I need to do the following
#### http://localhost:8080/api/v1/search/subscriptions?page=0 (GET)  ** Subscriptions ** ( PROTECTED )
#### http://localhost:8080/api/v1/search/user?me=true (GET) ** GET USER! ** ( SEMI-PROTECTED )


#### http://localhost:8080/api/v1/video//isLiked/1 (GET) ->  ( PROTECTED )
