import { useSelect } from "../Context/SelectContext";
import Button from "../UI/Button";


type DeleteImagesButtonProps = {
    deleteImages: (indices:number|number[]) => void
}
const DeleteImagesButton = ({deleteImages}:DeleteImagesButtonProps) => {
    const {selectedImages, setSelectedImages, setIsSelecting} = useSelect();

    const className = "flex flex-row cursor-pointer text-neutral-100 gap-2 justify-center items-center rounded-xl h-12 relative shadow-2xl transition-all duration-300 md:my-4" + (selectedImages.length <= 0 ?
        " max-w-0 max-h-0 overflow-hidden" :
        " bg-red-500 shadow-red-700/40 py-2 px-4")

    const clickHandler = () => {
        deleteImages(selectedImages);
        setSelectedImages([]);
        setIsSelecting(false);
    }

    return (
        <Button className={className} btnClickHandler={clickHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Delete Images
        </Button>
    );
};

export default DeleteImagesButton;