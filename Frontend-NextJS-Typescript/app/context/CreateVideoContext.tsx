import {createContext, useState, useContext, ReactNode} from "react";

interface IBasicForm {
    title: string;
    description: string;
    category: "GAMING" | "EDUCATIONAL" | "NONE" | "PROGRAMMING";
}
interface ICreateVideoContext {
    pageOne :  {
        basicForm: IBasicForm;
        setBasicForm:  React.Dispatch<React.SetStateAction<IBasicForm>>;
    };
    videoPage : {
        video: File | null;
        handleVideoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
        uploadURL: string | null ;
        setUploadURL: React.Dispatch<React.SetStateAction< string | null>>;
    } ;
    thumbnailPage: {
        thumbnail: File | null;
        handleThumbnailUpload: ( thumbnail: File | null) => void;
    }


}

// Create the context with a default value of `undefined` to enforce usage inside a provider
const CreateVideoContext = createContext<ICreateVideoContext | undefined>(undefined);


interface CreateVideoContextProviderProps {
    children: ReactNode;
}
export const CreateVideoContextProvider = ({ children }: CreateVideoContextProviderProps) => {

    // Page 1 Basic Information
    const [basicForm, setBasicForm] = useState<IBasicForm>({ title: "", description: "", category: "NONE" });
    const [video, setVideo] = useState<File | null>(null);
    const [ uploadURL, setUploadURL] = useState<string | null>(null);

    // Upload Video

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setVideo(event.target.files[0]);
        }
    }


    // Upload Thumbnail
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnail(event.target.files[0]);
        }
    }

    return (
        <CreateVideoContext.Provider
            value={{
                pageOne:{
                    basicForm,
                    setBasicForm
                },
                videoPage: {
                    video,
                    handleVideoUpload,
                    setUploadURL,
                    uploadURL
                },
                thumbnailPage: {

                }
            }}
        >
            {children}
        </CreateVideoContext.Provider>
    );

}

// Custom hook to consume the context safely
export const useCreateVideoContext = () => {
    const context = useContext(CreateVideoContext);
    if (!context) {
        throw new Error("useCreateVideoContext must be used within a CreateVideoContextProvider");
    }
    return context;
};