import { TechStack, Collaborator } from "@/app/Components/AboutComponents";

function About() {
    return ( 
        <main className="min-h-screen w-screen  md:py-40 px-6 md:px-40 bg-white text-black dark:text-white flex flex-col gap-20 dark:bg-dark-background overflow-x-hidden">
            <h1 className="font-poppin-bold mt-32 md:mt-0 text-6xl text-center">About</h1>
            <section id="collaborators"> 
                <h2 className="font-poppin-bold text-4xl">Collaborators</h2>
                <div className="flex flex-col md:flex-row mt-4 text-black gap-8">
                    <Collaborator/>
                </div>
                

            </section>
            <section id="techStack">
                <h2 className="font-poppin-bold text-4xl ">Tech Stack</h2>
                <div className="flex flex-col md:flex-row mt-4 gap-8">
                    <TechStack category="Deployment" color="orange" paragraph=""/>
                    <TechStack category="Deployment" color="orange" paragraph=""/>
                    <TechStack category="Deployment" color="orange" paragraph=""/>
                </div>
                

            </section>
        </main>
     );
}

export default About;