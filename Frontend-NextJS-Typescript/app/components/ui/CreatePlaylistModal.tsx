import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type CreatePlaylistModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose }) => {
    const [playlistName, setPlaylistName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!playlistName.trim()) {
            setError("Playlist name cannot be empty.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const token = Cookies.get("token");
            await axios.post(`${process.env.NEXT_PUBLIC_API_FETCH_URL}/playlist`,
                { title: playlistName }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            onClose();
        } catch (err) {
            setError("Failed to create playlist. Try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[99999] overflow-hidden bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-d-secondary p-4 rounded shadow-lg w-80" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-semibold">Create Playlist</h2>
                <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    className="bg-input outline-none border-none p-2 w-full mt-2"
                    placeholder="Playlist Name"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-4 flex justify-end gap-2">
                    <button className="px-4 py-2 bg-red-600" onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                    <button
                        className=" px-4 py-2  bg-b-main text-b-secondary duration-300 hover:bg-d-sidebar hover:text-d-text rounded-2xl"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
