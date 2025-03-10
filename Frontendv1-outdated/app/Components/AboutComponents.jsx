// Component Solely needed for the about page!
import Image from "next/image";


export function TechStack({color = "orange", paragraph = " I did the following on the frontend!", category = "Frontend"}) {
    return ( 
        <div className="relative bg-[#DEE4EA] drop-shadow-md bg-opacity-90 w-full min-h-60 h-fit items-center py-8 rounded-3xl flex flex-col">
            <h5 className="capitalize font-poppin-medium text-4xl">{category}</h5>
            <button className="bg-blue h-14 w-3/5  hover:bg-black duration-700 px-8 absolute bottom-0 rounded-tl-xl rounded-br-3xl right-0 text-white">View LinkedIn</button>
        </div>
     );
}



export function Collaborator({name =  "Zachary Coats", position = "Full Stack Development", paragraph =  "My primary tasks included handling backend logic, designing in Figma, deploying and managing in Jira, and developing the frontend for login, signup, dashboard, and middleware.", linkedIn=" https://www.linkedin.com/in/zachary-c-651211270/"}) {
    return ( 
        <div className="flex flex-col w-fit  items-center">
            <div id="IMAGE" className=" size-52 overflow-hidden -mb-24 z-10 rounded-full">
                <Image
                height={200}
                width={200}
                src="/images/card-placeholder.jpg"
                className="object-fill min-h-full min-w-full"
                alt="Image of Collaborator"
                />
            </div>
            <div className="max-h-[378px] px-2 py-3 md:py-2 md:px-8 max-w-[420px]  flex flex-col items-center bg-white rounded-[35px] border-4 border-black border-opacity-40 ">
                <h3 className="font-poppin-medium mt-24 text-4xl">{name}</h3>
                <h6 className="font-poppin-medium text-lg">{position}</h6>
                <p className="font-poppin-light mt-2 text-base md:text-lg text-center">{paragraph}</p>
            </div>
        </div>
     );
}
