export const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://www.gravatar.com/avatar/00?d=mp';
    if (typeof imagePath === 'string' && imagePath.startsWith('http')) return imagePath;
    return imagePath;
};
