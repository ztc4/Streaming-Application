import {IUser} from "@/app/interfaces/IUser";

interface UserUnformatted{
    username?: string | null;
    id?: bigint;
    subscribers_count?: bigint;
}



export function convertUserProperFormat({username, id, subscribers_count}: UserUnformatted): IUser{
    return {
        username : String(username),
        id: Number(id),
        subscribersCount : Number(subscribers_count)
    }
}