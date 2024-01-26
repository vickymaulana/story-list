import React from 'react';

interface FilterModalProps {
  isOpen: boolean;
  selectedCategory: string;
  selectedStatus: string;
  handleCategorySelect: (category: string) => void;
  handleStatusSelect: (status: string) => void;
  handleClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, selectedCategory, selectedStatus, handleCategorySelect, handleStatusSelect, handleClose }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white p-4 rounded shadow-lg">
        <select className="block w-full p-2 border rounded" value={selectedCategory} onChange={event => handleCategorySelect(event.target.value)}>
            <option value="">All Categories</option>
            <option value="Financial">Financial</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
        </select>

        <select className="block w-full p-2 border rounded mt-4" value={selectedStatus} onChange={event => handleStatusSelect(event.target.value)}>
            <option value="">All Statuses</option>
            <option value="Publish">Publish</option>
            <option value="Draft">Draft</option>
        </select>

        <button className="bg-blue-500 text-white p-2 rounded mt-4 w-full" onClick={handleClose}>Close</button>
    </div>
);
};