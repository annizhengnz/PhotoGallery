import { useModal } from "../Context/ModalContext";
import { useSelect } from "../Context/SelectContext";
import { useEffect, useState } from "react";
import EnlargedImage from "./EnlargedImage";
import { ImageType } from "../Types/types";

type ImageCardProps = ImageType & {index:number, deleteImage:(index:number) => void}
const ImageCard = ({thumbnailLink,webContentLink,name,imageMediaMetadata, index, deleteImage}:ImageCardProps) => {
    const {openModal,setModalContent} = useModal();
    const {selectImage, deselectImage,isSelecting,selectedImages} = useSelect();
    const [isSelected, setIsSelected] = useState<boolean>(selectedImages.includes(index));

    useEffect(() => {
        setIsSelected(selectedImages.includes(index));
    },[selectedImages, index]);

    const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (isSelecting) {
            if (isSelected) {
                deselectImage(index);
                setIsSelected(false);
            }
            else {
                selectImage(index);
                setIsSelected(true);
            }
        }
        else {
            const metadata = {
                height:imageMediaMetadata.height,
                width:imageMediaMetadata.width
            };
            setModalContent(<EnlargedImage thumbnailLink={thumbnailLink} webContentLink={webContentLink.replace("&export=download","")} name={name} imageMediaMetadata={metadata} index={index} imageDeleteHandler={deleteImage}/>);
            openModal();
        }
    }

    const selectedRender = () => {
        if (isSelecting) {
            if (isSelected) {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10b981" className="w-6 h-6 absolute left-1 top-1 drop-shadow-md">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                )
            }
            else {
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f5f5f5" className="w-6 h-6 absolute left-1 top-1 drop-shadow-md">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            }
        }
        else {
            return null;
        }
    }

    return (
        <div className="col-span-1 row-span-1 h-fit aspect-[1.25/1] rounded-xl overflow-hidden cursor-pointer relative" onClick={clickHandler}>
            {selectedRender()}
            <img src={thumbnailLink} alt={name} referrerPolicy="no-referrer" className="object-center h-full" loading="lazy"/>
        </div>
    );
};

export default ImageCard;