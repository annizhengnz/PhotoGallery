import React from 'react';
import Button from "../UI/Button";


type LoadImagesButtonProps = {
    loadMoreImages: () => void
}
const LoadImagesButton = ({loadMoreImages}:LoadImagesButtonProps) => {

    const className = "mx-auto bg-purple-700 text-white font-bold py-2 px-4 rounded-full text-2xl shadow-xl shadow-purple-900/40"

    return (
        <Button btnClickHandler={loadMoreImages} className={className}>
            Load More Images
        </Button>
    );
};

export default LoadImagesButton;