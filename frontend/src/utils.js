export const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://www.gravatar.com/avatar/00?d=mp';
    if (typeof imagePath !== 'string') return URL.createObjectURL(imagePath);
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return `http://127.0.0.1:8000${imagePath}`;
    return `http://127.0.0.1:8000/${imagePath}`;
};
