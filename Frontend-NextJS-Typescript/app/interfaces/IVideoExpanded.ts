interface IVideoExpanded {

    videoId: number,

    category: "EDUCATIONAL" | "GAMING"| "NONE"| "PROGRAMMING";
    description: string;
    dislike: number;
    likes: number;
}