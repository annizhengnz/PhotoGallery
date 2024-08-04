export type ImageType = {
    id?: string;
    thumbnailLink: string;
    webContentLink: string;
    name: string;
    imageMediaMetadata: {
        height: number;
        width: number;
    },
};

export type PhotoGalleryType = {
    images: ImageType[];
    deleteImage: (indices:number|number[]) => void;
};