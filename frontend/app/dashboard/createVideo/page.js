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
        // e.preventDefault(); // Prevent default form submission
        const URL = "http://localhost:8080/api/v1";
        let categories = ["programming","gaming","information"]
        let categoryOfNumber = categories.indexOf(selectedCategory) + 1 || null
        const token = Cookies.get("token");
        console.log(token)
        if (!token) {
            alert("You currently aren't logged In!");
            return; // Exit if there's no token
        }
        let response;

        try{
            response = await axios.post(
                URL + "/video/createVideo",
                {
                    "title": title,
                    "description": desc,
                    "category": categoryOfNumber
                },
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } // Ensure the token is prefixed correctly
                }
            );
            console.log(response)
        }
        catch(error){
            
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
    const lambdaUrl = 'https://76hnm62hnbq2kipmtnuaxdf6ki0qdorc.lambda-url.us-east-1.on.aws/'; // Replace with your actual Lambda URL
    let presignedUrl;
    try {
        const lambdaResponse = await axios.post(lambdaUrl, {
            id: response.data.videoId,  // Assuming the API returns a videoId for the new video
            contentType: video.type
        });
        console.log(lambdaResponse)
        presignedUrl = lambdaResponse.data.uploadUrl;
        console.log(presignedUrl)
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        return; // Exit if presigned URL generation fails
    }




    };

    return (
        <main className="w-screen pl-12 md:pl-56 min-h-screen pt-12 pb-12 pr-8 md:pt-20 bg-[#F8F8F8]">
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
                        className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        required
                    />
                </div>
                <div className="col-span-3"></div>
                <button type="button" onClick={handleSubmit} className="col-span-3 bg-blue text-white py-2 rounded-3xl">
                    Submit
                </button>
            </form>
        </main>
    );
}

export default CreateVideo;
