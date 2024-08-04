import { ChangeEvent, useState } from 'react';
import Button from "../UI/Button";

type AddImageFileInputProps = {
    newImagesHandler: (images: string) => Promise<void>
}

const AddImageFromUrlInput = ({newImagesHandler}:AddImageFileInputProps) => {
    const [url, setUrl] = useState<string>("");
    const loadImageHandler = async () => {
        if (url) {
            await newImagesHandler(url)
        }
        setUrl("");
    }

    const changeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }

    return (
        <div className="flex flex-row gap-2 justify-center items-center">
            <input type="url" placeholder="Enter image url" onChange={changeHandler} className="rounded-lg text-lg px-2 py-1.5 h-12 placeholder:text-gray-900"/>
            <Button btnClickHandler={loadImageHandler} className="cursor-pointer text-neutral-100 flex gap-2 py-2 px-4 h-12 justify-center items-center rounded-xl relative shadow-2xl bg-purple-400 shadow-purple-600/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                Add Image
            </Button>
        </div>
    );
};

export default AddImageFromUrlInput;