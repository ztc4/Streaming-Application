import {IVideoCardProps} from "@/app/interfaces/IVideoCardProps";

export const videoData: IVideoCardProps[] = [
    {
        isSubscribed: true,
        isLiked: true,
        video: {
            category: "PROGRAMMING",
            createdAt: "2024-02-27T12:00:00Z",
            title: "Understanding React Hooks",
            description: "A deep dive into React Hooks and their usage.",
            dislike: 3,
            likes: 120,
            videoId: 101,
            views: 1500,
            user: {
                id: 1,
                username: "CodeMaster",
                subscribersCount: 50000,
            },
        },
    },
    {
        isSubscribed: false,
        isLiked: false,
        video: {
            category: "GAMING",
            createdAt: "2024-02-25T08:30:00Z",
            title: "Elden Ring Speedrun - Any% WR Attempt",
            description: "Watch me attempt an Elden Ring Any% world record speedrun!",
            dislike: 20,
            likes: 3500,
            videoId: 102,
            views: 500000,
            user: {
                id: 2,
                username: "SpeedRunKing",
                subscribersCount: 120000,
            },
        },
    },
    {
        isSubscribed: true,
        isLiked: false,
        video: {
            category: "EDUCATIONAL",
            createdAt: "2024-01-15T16:45:00Z",
            title: "Quantum Physics Explained",
            description: "Breaking down quantum physics in simple terms.",
            dislike: 15,
            likes: 2000,
            videoId: 103,
            views: 100000,
            user: {
                id: 3,
                username: "ScienceGeek",
                subscribersCount: 75000,
            },
        },
    },
    {
        isSubscribed: false,
        isLiked: true,
        video: {
            category: "NONE",
            createdAt: "2024-02-10T14:20:00Z",
            title: "A Day in My Life",
            description: "Just a casual vlog about my day.",
            dislike: 5,
            likes: 500,
            videoId: 104,
            views: 25000,
            user: {
                id: 4,
                username: "DailyVlogger",
                subscribersCount: 20000,
            },
        },
    },
];

export default videoData;
