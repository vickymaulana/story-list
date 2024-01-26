import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

interface Story {
    title: string;
    author: string;
    category: string;
    tags: string[];
    status: string;
}

interface EditStoryProps {
    isOpen: boolean;
    story: Story;
    handleClose: () => void;
}

const EditStory: React.FC<EditStoryProps> = ({ isOpen, story, handleClose }) => {
    const [title, setTitle] = useState(story?.title || '');
    const [author, setAuthor] = useState(story?.author || '');
    const [category, setCategory] = useState(story?.category || '');
    const [tags, setTags] = useState(Array.isArray(story?.tags) ? story?.tags.join(', ') : story?.tags || '');
    const [status, setStatus] = useState(story?.status || '');

    useEffect(() => {
        if (story) {
            setTitle(story.title || '');
            setAuthor(story.author || '');
            setCategory(story.category || '');
            setTags(Array.isArray(story.tags) ? story.tags.join(', ') : story.tags || '');
            setStatus(story.status || '');
        }
    }, [story]);

    const handleSave = async () => {
        try {
            if (story) {
                await axios.put(`${API_URL}/${story.id}`, {
                    title,
                    author,
                    category,
                    tags: tags.split(',').map(tag => tag.trim()),
                    status,
                });

                handleClose();
            }
        } catch (error) {
            console.error('Error saving the edited story:', error);
        }
    };

    if (!isOpen || !story) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
            <div className="bg-white p-4 rounded shadow-lg z-10 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Cerita</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Judul:</label>
                    <input
                        className="form-input w-full px-3 py-2 border rounded"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Penulis:</label>
                    <input
                        className="form-input w-full px-3 py-2 border rounded"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Kategori:</label>
                    <input
                        className="form-input w-full px-3 py-2 border rounded"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Tag/Kata Kunci:</label>
                    <input
                        className="form-input w-full px-3 py-2 border rounded"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Status:</label>
                    <input
                        className="form-input w-full px-3 py-2 border rounded"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white p-2 rounded flex-grow"
                        onClick={handleSave}
                    >
                        Simpan
                    </button>
                    <button
                        className="bg-red-500 text-white p-2 rounded flex-grow"
                        onClick={handleClose}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditStory;
