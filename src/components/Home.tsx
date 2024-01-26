import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faTasks, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditStory from './EditStory';
import AddStory from './AddStory';
import { FilterModal } from './FilterModal';
import { StoriesList } from './StoriesList';
import { API_URL } from './constants';
import MenuBar from './MenuBar';

interface Story {
    title: string;
    body: string;
    category: string;
    status: string;
}

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingStory, setEditingStory] = useState<Story | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data: Story[]) => {
                setStories(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError('Gagal mengambil cerita');
                setLoading(false);
            });
    }, []);

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterModalOpen = () => {
        setFilterModalOpen(true);
    };

    const handleFilterModalClose = () => {
        setFilterModalOpen(false);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    const handleStatusSelect = (status: string) => {
        setSelectedStatus(status);
    };

    const getFilteredStories = useCallback(() => {
        return stories.filter(story => {
            const matchesSearchQuery =
                (story.title && story.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (story.body && story.body.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === '' || story.category === selectedCategory;
            const matchesStatus = selectedStatus === '' || story.status === selectedStatus;

            return matchesSearchQuery && matchesCategory && matchesStatus;
        });
    }, [stories, searchQuery, selectedCategory, selectedStatus]);

    const handleEdit = (story: Story) => {
        console.log('Mengedit cerita:', story);
        setEditingStory(story);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    return (
        <div className="p-8 flex flex-col md:flex-row justify-between items-center">
            <MenuBar />

            <div className="w-3/4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Daftar Cerita</h1>

                    <div className="flex items-center">
                        <button
                            className="bg-green-500 text-white p-2 rounded mr-2"
                            onClick={handleAddModalOpen}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>

                        <input
                            className="block w-full p-2 border rounded mr-2"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchQueryChange}
                            placeholder="Cari berdasarkan judul"
                        />

                        <button
                            className="bg-blue-500 text-white p-2 rounded"
                            onClick={handleFilterModalOpen}
                        >
                            <FontAwesomeIcon icon={faFilter} />
                        </button>
                    </div>
                </div>

                <FilterModal
                    isOpen={filterModalOpen}
                    selectedCategory={selectedCategory}
                    selectedStatus={selectedStatus}
                    handleCategorySelect={handleCategorySelect}
                    handleStatusSelect={handleStatusSelect}
                    handleClose={handleFilterModalClose}
                />

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <StoriesList stories={getFilteredStories()} onEdit={handleEdit} />
                        <EditStory
                            isOpen={editModalOpen}
                            story={editingStory}
                            handleClose={handleEditModalClose}
                        />
                        <AddStory
                            isOpen={addModalOpen}
                            handleClose={handleAddModalClose}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
