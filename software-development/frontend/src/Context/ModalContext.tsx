import { createContext, ReactNode, useContext, useState } from 'react';

const ModalContext = createContext({});

type ModalProviderProps = {
    children: ReactNode;
}

type ModalContextType = {
    isModalOpen: boolean,
    modalContent: ReactNode,
    setModalContent: (value: object) => void,
    openModal: () => void,
    closeModal: () => void
}

export const ModalProvider = ({children}:ModalProviderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(<> </>);



    const openModal = () => {
        document.body.style.overflow = "hidden";
        setIsModalOpen(true);
    }

    const closeModal = () => {
        document.body.style.overflow = "auto";
        setIsModalOpen(false);
        setModalContent(<> </>)
    }

    return (
        <ModalContext.Provider value={{isModalOpen, modalContent, setModalContent, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = ():ModalContextType => {
    const context:{} = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context as ModalContextType;
};
