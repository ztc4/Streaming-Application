interface UserUnformatted{
    username: string;
    id: bigint;
    subscribers_count: bigint;
}

interface User {}

export function convertUserProperFormat({username, id, subscribers_count}: UserUnformatted): User {
    return {
        username : String(username),
        id: Number(id),
        subscriberCount : Number(subscribers_count)
    }
}