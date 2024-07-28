import { useState, useCallback } from 'react';

const useErrorHandler = () => {
    const [error, setError] = useState(null);

    const handleError = useCallback((error) => {
        setError(error);
    }, []);

    return {
        error,
        handleError
    };
};

export default useErrorHandler;
