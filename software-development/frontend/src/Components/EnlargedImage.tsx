import React, { useEffect, useRef } from 'react';
import { ImageType } from "../Types/types";
import { useModal } from "../Context/ModalContext";
import Button from "../UI/Button";


type EnlargedImageProps = ImageType & {index:number, imageDeleteHandler:(index:number) => void}
const EnlargedImage = ({webContentLink, name, thumbnailLink, imageMediaMetadata, index, imageDeleteHandler}:EnlargedImageProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const {closeModal} = useModal();

    const loaded = () => {
        imageRef.current?.classList.remove("opacity-0");
        imageRef.current?.classList.add("opacity-100");
    };

    useEffect(() => {
        const img = new Image();
        img.src = webContentLink;

        if (img.complete) {
            loaded();
        } else {
            img.addEventListener("load", loaded);
        }

        return () => {
            img.removeEventListener("load", loaded);
        };
    });

    const deleteImageClickHandler = (e:React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        imageDeleteHandler(index);
        closeModal();
    }

    const deleteButtonClassName = "w-full flex justify-center items-center text-neutral-100 bg-red-500 hover:bg-red-600 focus:bg-red-600 transition-colors duration-300 ease-in-out rounded-lg py-2 px-4 my-2 text-lg font-semibold shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none"

    return (
        <>
        <div style={{backgroundImage: `url('${thumbnailLink}')`, height:`min(50vh,${imageMediaMetadata.height}px)`}} className="bg-cover bg-center max-h-full w-full aspect-video bg-neutral-100 rounded-2xl">
            <img src={webContentLink} alt={name} referrerPolicy="no-referrer" className="object-center h-full transition-opacity duration-500 opacity-0 aspect-video bg-neutral-100 rounded-2xl" ref={imageRef}/>
        </div>
            <Button className={deleteButtonClassName} btnClickHandler={deleteImageClickHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete Image
            </Button>
        </>
    );
};

export default EnlargedImage;