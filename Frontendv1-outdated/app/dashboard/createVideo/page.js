"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function CreateVideo() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isUploading, setIsUploading] = useState(false)
    const [uploadTracking, setUploadTracking] = useState({
        thumbnail:0,
        video:0,
       
    })
    

    const handleVideoChange = (event) => {
        setVideo(event.target.files[0]);
    };

    const uploadImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const URL = "http://localhost:8080/api/v1";
        const lambdaUrlVideo = "https://76hnm62hnbq2kipmtnuaxdf6ki0qdorc.lambda-url.us-east-1.on.aws/"
        const lambdaUrlImage = "https://kixue64ylotghb7nqivjxexp5u0ocekz.lambda-url.us-east-1.on.aws/"
        let headers = (token) => ({ headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
        let res;
        let presignedUrl = {video:null, thumbnail:null};

        try{
            // Decide Category Number & Token
            const categories = ["programming","gaming","information"]
            const categoryOfNumber = categories.indexOf(selectedCategory) + 1 || null
            const token = Cookies.get("token");
            console.log(token)
            if (!token) return alert("You currently aren't logged In!");

            res = await axios.post(
                URL + "/video/createVideo",
                {"title": title,"description": desc,"category": categoryOfNumber,"videoContentType": video?.type,"imageContentType": image?.type },
                headers(token)
            );
            setIsUploading(true)
            // Create Presigned URL
            const [videoRes, imageRes] = await Promise.all([
                axios.get(lambdaUrlVideo, headers(res.data.videoJWT)),
                axios.get(lambdaUrlImage, headers(res.data.imageJWT))
            ]);
            presignedUrl.video = videoRes.data.video;
            presignedUrl.thumbnail = imageRes.data.thumbnail;

            const uploadFileWithProgress = async (url, file, fileName) => {
                await axios.put(url, file, {
                    headers: { 'Content-Type': file.type },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`${fileName} Upload Progress: ${progress}%`);
                        // Update progress bar UI if present
                        setUploadTracking( current => ({
                            ...current,
                            [fileName]: progress
                        }))
                    },
                });
            };

            await Promise.all([
                uploadFileWithProgress(presignedUrl.video, video, "video"),
                uploadFileWithProgress(presignedUrl.thumbnail, image, "thumbnail"),
            ]);

            setIsUploading("Successful")
            console.log("Video and Thumbnail successfully uploaded to S3.");
        }
        catch(error){
                setIsUploading(false)
                if (error.response) {
                    // The request was made, and the server responded with a status code
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                    alert(`Error: ${error.response.data}`);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error message:", error.message);
                }
        }
    };


    return (
        <main className="w-screen pl-12 md:pl-56 min-h-screen  pt-12 pb-12 pr-8 md:pt-20 bg-[#F8F8F8]">
            <h1 className="font-poppin-medium text-4xl">Create Video</h1>
            <form className="grid grid-cols-6 mt-4 gap-3" onSubmit={handleSubmit}>
                <div className="col-span-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter title"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>
                    <select
                        id="categories"
                        value={selectedCategory}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled>Choose a category</option>
                        <option value="all">All</option>
                        <option value="programming">Programming</option>
                        <option value="gaming">Gaming</option>
                        <option value="information">Information</option>
                    </select>
                </div>
                <div className="col-span-6 w-full h-80">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your description:</label>
                    <textarea
                        id="description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg min-h-48 h-60 max-h-60 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter description"
                    />
                </div>
                <div className="flex flex-col items-center col-span-6 justify-center w-full">
                    <p>Upload Your Video</p>
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">{!video ? "Click to upload" : "Video is selected, click to upload a different one"}</span> or drag and drop
                            </p>

                            <p className="text-xs text-gray-500 dark:text-gray-400"> Video</p>
                        </div>
                        <input id="dropzone-file" type="file" accept="video/*" onChange={handleVideoChange} className="hidden" required />
                    </label>
                </div>
                <div className="flex flex-col items-center col-span-6 justify-center w-full">
                    <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload a Picture</label>
                    <input
                        onChange={uploadImage}
                        className="block w-full mb-5 text-xs  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        required
                    />
                </div>
                <div className="col-span-3"></div>
                <button type="button" disabled={isUploading} onClick={handleSubmit} className="col-span-3 bg-blue text-white py-2 rounded-3xl">
                    Submit
                </button>
            </form>

            {/* Uploading Content Modal */}
           {isUploading != false &&  
            <div className="h-screen w-screen bg-black/60 flex justify-center items-center z-50 top-0 left-0 fixed">
                    <div className=" min-h-80 min-w-96 aspect-auto flex flex-col items-center justify-between p-4 pt-12 w-[700px] h-[450px] bg-light-blue rounded-3xl border-blue border-2 drop-shadow-md">
                        <h3 className="text-3xl font-poppin-bold">Attempting Upload of Videos</h3>
                        <div className="flex flex-col w-full gap-2">
                            {["thumbnail","video"].map(current =>{
                                return(
                                    <div className="w-full h-14 opacity-50 flex flex-row items-center px-8 justify-between"
                                    style={{backgroundColor: `rgba(0, ${18 + (uploadTracking[current] * 1.5)}, 0, ${ (uploadTracking[current] / 100) +40 })`}}
                                >
                                    <p className="text-white font-poppin-semibold">{current}</p>
                                    <p>{uploadTracking[current]}%</p>
                                </div>
                                )
                            })}
                        </div>
                        <button className="w-full h-20 bg-black text-white rounded-full">
                            {isUploading == "Successful" ? " Video is uploaded!" : "Waiting for the Upload ..." }
                        </button>
                    </div>
                </div>
            }
        </main>
    );
}

export default CreateVideo;
