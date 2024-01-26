import React from 'react';

interface StoriesListProps {
  stories: any[];
  onEdit: (story: any) => void;
}

export const StoriesList: React.FC<StoriesListProps> = ({ stories, onEdit }) => {
    return (
    <table className="w-full mt-8 border border-gray-300 bg-white">
        <thead className="bg-white">
            <tr>
                <th className="p-4 border border-gray-300 bg-white">Title</th>
                <th className="p-4 border border-gray-300 bg-white">Author</th>
                <th className="p-4 border border-gray-300 bg-white">Category</th>
                <th className="p-4 border border-gray-300 bg-white">Tags/Keywords</th>
                <th className="p-4 border border-gray-300 bg-white">Status</th>
                <th className="p-4 border border-gray-300 bg-white">Action</th>
            </tr>
        </thead>
        <tbody>
            {stories.map((story, index) => (
                <tr key={story.id} className="border-b border-gray-300">
                    <td className="p-4 border-r border-gray-300 bg-white">{story.title}</td>
                    <td className="p-4 border-r border-gray-300 bg-white">{story.author}</td>
                    <td className="p-4 border-r border-gray-300 bg-white">{story.category}</td>
                    <td className="p-4 border-r border-gray-300 bg-white">{Array.isArray(story.tags) ? story.tags.join(', ') : story.tags}</td>
                    <td className={`p-4 ${index === stories.length - 1 ? '' : 'border-r border-gray-300 bg-white'}`}>{story.status}</td>
                    <td className="p-4 border-l border-gray-300">
                        <button onClick={() => onEdit(story)}>Edit</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};

export default StoriesList;