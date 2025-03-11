const data = [
    {
        ranking: "1",
        title: "Communicating with like-minded individuals",
        likes: 2040,
    },
    {
        ranking: "2",
        title: "Exploring new horizons in technology",
        likes: 1800,
    },
    {
        ranking: "3",
        title: "Developing innovative solutions",
        likes: 1600,
    },
    {
        ranking: "1",
        title: "Communicating with like-minded individuals",
        likes: 2040,
    },
    {
        ranking: "2",
        title: "Exploring new horizons in technology",
        likes: 1800,
    },
    {
        ranking: "3",
        title: "Developing innovative solutions",
        likes: 1600,
    },
    {
        ranking: "1",
        title: "Communicating with like-minded individuals",
        likes: 2040,
    },
    {
        ranking: "2",
        title: "Exploring new horizons in technology",
        likes: 1800,
    },
    {
        ranking: "3",
        title: "Developing innovative solutions",
        likes: 1600,
    },
];

export default function Rankings() {
    return (
        <div className="w-full h-fit border-2 rounded-lg border-orange p-4">
            <div className="w-full grid grid-cols-5 font-bold text-sm  p-2 rounded-t-md">
                <p className="col-span-1 text-left" aria-label="Ranking">
                    Ranking
                </p>
                <p className="col-span-3 text-center" aria-label="Titles">
                    Titles
                </p>
                <p className="col-span-1 text-right" aria-label="Likes">
                    Likes
                </p>
            </div>
            <ol className="w-full">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="w-full grid grid-cols-5 border-b last:border-b-0 p-2"
                    >
                        <li className="col-span-1 text-left bg-gradient-orange w-fit flex justify-center items-center px-2">{item.ranking}</li>
                        <p className="col-span-3 text-center text-text">{item.title}</p>
                        <p className="col-span-1 text-right text-text-secondary opacity-70">{item.likes}</p>
                    </div>
                ))}
            </ol>
        </div>
    );
}
