import { useMemo } from "react";
import ImageCard from "./ImageCard";
import { ImageType, PhotoGalleryType } from "../Types/types";


const PhotoGallery = ({images, deleteImage}:PhotoGalleryType) => {

    const ImageCardsMemo = useMemo(() => (
         images?.map((image: ImageType, index:number) => (
            <ImageCard key={image.id} thumbnailLink={image.thumbnailLink} webContentLink={image.webContentLink} name={image.name} imageMediaMetadata={image.imageMediaMetadata} index={index} deleteImage={deleteImage}/>
        ))), [images, deleteImage])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4 container md:max-w-2xl lg:max-w-7xl 2xl:max-w-fit mx-auto py-8 px-2 2xl:px-8">
            {ImageCardsMemo}
        </div>
    );
};

export default PhotoGallery;