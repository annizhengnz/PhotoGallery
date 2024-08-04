import { createContext, ReactNode, useContext, useState } from 'react';

const SelectContext = createContext({});

type SelectProviderProps = {
    children: ReactNode;
}

type SelectContextType = {
    isSelecting: boolean,
    setIsSelecting: (value: boolean) => void,
    selectedImages: number[],
    setSelectedImages: (value: number[]) => void,
    selectImage: (index: number) => void,
    deselectImage: (index: number) => void,
}

export const SelectProvider = ({children}:SelectProviderProps) => {
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    const selectImage = (index: number) => {
        setSelectedImages([...selectedImages, index]);
    }

    const deselectImage = (index: number) => {
        setSelectedImages(selectedImages.filter((imageIndex) => imageIndex !== index));
    }

    return (
        <SelectContext.Provider value={{isSelecting, setIsSelecting, selectedImages, selectImage, deselectImage,setSelectedImages}}>
            {children}
        </SelectContext.Provider>
    )
}

export const useSelect = ():SelectContextType => {
    const context:{} = useContext(SelectContext);
    if (!context) {
        throw new Error('useSelect must be used within a SelectProvider');
    }
    return context as SelectContextType;
}

