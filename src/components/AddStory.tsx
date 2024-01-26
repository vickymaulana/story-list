import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

interface Story {
    title: string;
    author: string;
    category: string;
    tags: string[];
    status: string;
}

interface AddStoryProps {
    isOpen: boolean;
    handleClose: () => void;
}

const AddStory: React.FC<AddStoryProps> = ({ isOpen, handleClose }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('');

    const handleSave = async () => {
        try {
            await axios.post(`${API_URL}`, {
                title,
                author,
                category,
                tags: tags.split(',').map(tag => tag.trim()),
                status,
            });

            handleClose();
        } catch (error) {
            console.error('Error adding the story:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
            <div className="bg-white p-8 rounded shadow-lg z-10 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Add Story</h2>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Author</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Category</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Tags</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Status</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />
                </div>
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white p-3 rounded flex-grow hover:bg-blue-600 transition duration-300"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className="bg-red-500 text-white p-3 rounded flex-grow hover:bg-red-600 transition duration-300"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddStory;
