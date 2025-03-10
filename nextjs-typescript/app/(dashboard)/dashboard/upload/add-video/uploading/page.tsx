"use client";
import { useCreateVideoContext } from "@/app/context/CreateVideoContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import axios from "axios";

export default function UploadingVideo() {
    const router = useRouter();
    const { videoPage } = useCreateVideoContext();
    const { video, uploadURL } = videoPage;
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    useEffect(() => {
        if (!uploadURL || !video) {
            alert("Failed to upload your video!");
            router.back();
            return;
        }

        const uploadFileWithProgress = async (url: string, file: File, fileName: string) => {
            try {
                await axios.put(url, file, {
                    headers: { 'Content-Type': file.type },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            console.log(`${fileName} Upload Progress: ${progress}%`);
                            setUploadProgress(progress); // Update your progress state
                        }
                    },
                });

                console.log(`${fileName} uploaded successfully`);
                router.push("/success"); // Redirect after upload (optional)

            } catch (error: any) {
                console.error("Upload error:", error);
                alert("Upload failed. Please try again.");
            }
        };

        uploadFileWithProgress(uploadURL, video, video.name);

    }, [uploadURL, video, router]);


    return (
        <div className="max-w-screen-md h-full  mx-auto px-8 flex flex-col items-center justify-center">
            <div className={"font-medium w-full max-w-[601px] text-lg"}>
                <p className={"text-red-500"}>Please Wait Patiently and Try not to Refresh!</p>
            </div>

            <div
                className={" w-full h-2/4 p-1 rounded-2xl border-2  bg-background-primary max-h-44 relative max-w-[601px]"}>
                <div
                    style={{
                        backgroundColor: `rgba(0, ${18 + (uploadProgress * 1.5)}, 0, ${(uploadProgress / 100) + 70})`,
                        width: `${uploadProgress}%`
                    }}
                    className={` h-full duration-75 rounded-2xl bg-orange-700`}>
                </div>
                <p className=" font-bold text-lg absolute inset-0 flex items-center justify-center">Uploading Progress - {uploadProgress}%</p>

            </div>
            <div className={"font-medium w-full text-yellow-400 max-w-[601px] text-base"}>
                <p>In situations where connection is loss/ refresh does happen attempt uploading video again in the manage videos page!</p>
            </div>

        </div>
    );
}
