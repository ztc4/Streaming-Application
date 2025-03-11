
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export default async function Test(){
    const allUsers = await db.users.findFirst()
    console.log(allUsers)
    return (
        <div className="bg-main">
            <h1 className="text-text">Hello there zachary</h1>
        </div>
    )
}