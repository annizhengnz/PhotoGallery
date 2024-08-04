import { useSelect } from "../Context/SelectContext";
import Button from "../UI/Button";

const SelectImagesButton = () => {
    const {setIsSelecting, isSelecting,setSelectedImages} = useSelect();

    const className = isSelecting ?
        "cursor-pointer text-neutral-100 flex gap-2 py-2 px-4 justify-center items-center my-4 rounded-xl h-12 relative shadow-2xl bg-purple-300 shadow-purple-500/40" :
        "cursor-pointer text-neutral-100 flex gap-2 py-2 px-4 justify-center items-center my-4 rounded-xl h-12 relative shadow-2xl bg-purple-600 shadow-purple-800/40"

    const clickHandler = () => {
        if (isSelecting) {
            setSelectedImages([]);
        }
        setIsSelecting(!isSelecting);
    }

    return (
        <Button btnClickHandler={clickHandler} className={className}>
            {isSelecting ?
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Clear Selection
                </> :
            <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select Images
            </>
            }
        </Button>
    );
};

export default SelectImagesButton;