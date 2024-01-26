import { useState, useEffect } from 'react';
import { API_URL } from '../constants';

const useStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then((data) => {
                setStories(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return { stories, loading, error };
};

export default useStories;