import React from 'react';
import { useModal } from "../Context/ModalContext";

const EnlargedImageModal = () => {
    const {isModalOpen, closeModal,modalContent} = useModal();

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        closeModal();
    }

    return (
        <div className={(isModalOpen?"opacity-100 z-10 ": "opacity-0 -z-10 ") + "min-w-full min-h-screen bg-neutral-200/[0.4] fixed top-0 left-0 backdrop-blur-sm flex justify-evenly items-center transition-opacity"} onClick={handleCloseModal}>
            <div className="relative mx-auto">
                <button onClick={handleCloseModal} className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 lg:w-8 lg:h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="container mx-auto w-max overflow-hidden max-w-[90vw] rounded-2xl">
                    {modalContent}
                </div>
            </div>
        </div>
    );
};

export default EnlargedImageModal;