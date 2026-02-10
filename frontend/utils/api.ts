export const getApiUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return url.replace(/\/+$/, ''); // Removes one or more trailing slashes
};
