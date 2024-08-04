export const getImageObject = async (image: File|string) => {
    let blob: Blob;
    if (typeof image === 'string') {
        // If it's a string, assume it's a URL and fetch the image
        try {
            const response = await fetch(image);
            if (!response.ok) {
                throw new Error(`Failed to fetch image from URL. Status: ${response.status}`);
            }
            blob = await response.blob();
        } catch (e) {
            console.error(e);
            return null;
        }
    } else {
        blob = image;
    }
    const id = (typeof image === 'string' ? image : image.name)?.replace(/\s+/g, '_').toLowerCase().replace(/[^a-z0-9_]/g, '');
    const thumbnailLink = URL.createObjectURL(blob);
    const webContentLink = URL.createObjectURL(blob);
    const name = (typeof image === 'string' ? image : image.name);
    const dimensions = await getImageDimensions(blob);
    const imageMediaMetadata = {
        height: dimensions.height,
        width: dimensions.width
    };
    return {
        "id": id,
        "thumbnailLink": thumbnailLink,
        "webContentLink": webContentLink,
        "name": name,
        "imageMediaMetadata": imageMediaMetadata
    };
}

const getImageDimensions = (file: File|Blob): Promise<{ height: number; width: number }> => {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            resolve({
                height: img.height,
                width: img.width,
            });
        };

        img.src = URL.createObjectURL(file);
    });
};