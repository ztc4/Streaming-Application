# Project: Video Sharing Platform



## Goal
The goal of this project is to create a platform where creators/users can upload videos, particularly educational videos, with live chatrooms instead of traditional comments.

## Tech Stack
- MYSQL (Main database)
- AWS S3 & Lambda (VIDEOS, PROFILE IMAGES)
- AWS Lambda & DynamoDB (CHAT SERVER)
- Kotlin Springboot (BACKEND DEPLOYMENT)
- VERCEL (FRONTEND DEPLOYMENT)
- REACT/NEXT.JS (FRONTEND FRAMEWORK)

## Features
1. Video Uploading
2. Login
3. Signup
4. Subscribe to Other Users
5. Profile Page
6. Live Chat
7. Video Search
8. Profile Search
9. Like Videos
10. Streaming HLS Videos!

## Video Uploading & Live Chat
- Users upload videos to AWS S3, possibly using Cloudfront for distribution.
- Videos can be liked or unliked.
- Users can upload videos with Title, Description, and Category (Educational, Gaming).
- Live chat replaces comments.
- Users can react to comments with emojis:
  - Fire Emoji: Represents a great post
  - Neutral Face Emoji: Represents a neutral point of view
  - Thumbs Down: Represents a dislike
- The popularity of comments in the chat affects the "most popular" section.

## Goals
The chat feature aims to increase the popularity of newer videos due to active chat engagement.

## Potential Features
- Comments can include images.
- Comments can have bold text and links.

## Video Search & Profile Search
- Users can search for other users.
- Video search utilizes MongoDB features for AI-driven search.



# Resources
### [FIGMA DESIGN]([https://www.figma.com/file/oYGSlECRpp0CU79BTsH3qu/main-designs?type=design&node-id=0%3A1&mode=design&t=6RhAAOiWZsmsfPo4-1](https://www.figma.com/design/oYGSlECRpp0CU79BTsH3qu/main-designs?node-id=8-26&t=fy6xhLSMKSUA23xZ-1))
### [Live Server](https://streaming-react-application.vercel.app/) // This is inactive & old
