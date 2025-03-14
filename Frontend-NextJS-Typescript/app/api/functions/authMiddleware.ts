
import jwt from "jsonwebtoken";

interface AuthResult {
    token : string;
    email: string;
    userId: number;
}

export function authUser(authToken: any): AuthResult | null {
    try {
         // Get cookie value safely
        // console.log("authToken:", authToken);
        // console.log(process.env.JWT_SECRET);
        if (!authToken) {
            throw new Error("No cookie exists for the user");
        }
        const result = jwt.verify(authToken, process.env.JWT_SECRET) ;

        return {
            userId: result.userId,
            email: result.email,
            token: authToken,
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}