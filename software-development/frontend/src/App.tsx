import React, { useEffect, useState } from 'react';
import { getImagesFromFolder } from "./Services/CloudServiceConfig";
import { ModalProvider } from "./Context/ModalContext";
import { SelectProvider} from "./Context/SelectContext";
import { ImageType } from "./Types/types";
import { getImageObject } from "./Utils/imageUpload";
import './App.css';
import PhotoGallery from "./Components/PhotoGallery";
import EnlargedImageModal from "./Components/EnlargedImageModal";
import AddImageFileInput from "./Components/AddImageFileInput";
import LoadImagesButton from "./Components/LoadImagesButton";
import SelectImagesButton from "./Components/SelectImagesButton";
import DeleteImagesButton from "./Components/DeleteImagesButton";
import AddImageFromUrlInput from "./Components/AddImageFromURLInput";

function App() {
  const folderId = process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID || "";
  const apiKey = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY || "";
  const pageSize = 24

  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
  const [images, setImages] = useState<ImageType[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (folderId && apiKey) {
          const imagesData = await getImagesFromFolder(folderId, apiKey, pageSize, nextPageToken);
          setImages(imagesData?.files);
          setNextPageToken(imagesData?.nextPageToken);
        }
      }
      catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[folderId, apiKey]);

  const loadMoreImages = async () => {
    try {
      if (folderId && apiKey) {
        const imagesData = await getImagesFromFolder(folderId, apiKey, pageSize, nextPageToken);
        setImages([...images, ...imagesData?.files]);
        console.log(imagesData?.nextPageToken)
        setNextPageToken(imagesData?.nextPageToken);
      }
    }
    catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  const newImagesHandler = async (files:File[]|string) => {
    const newImages = [];
    if (typeof files === "string") {
      const imageObject = await getImageObject(files);
      if (imageObject) {
        newImages.push(imageObject);
      }
    }
    else
    for ( let i = 0; i < files.length; i++) {
        const image = files[i];
        const imageObject =  await getImageObject(image);
        if (imageObject) {
          newImages.push(imageObject);
        }
    }
      setImages([...images,...newImages]);
  }

  const deleteImages = (indices:number|number[]) => {
    if (typeof indices === "number") {
      setImages(images.filter((image, i) => i !== indices));
    }
    else {
      setImages(images.filter((image, i) => !indices.includes(i)));
    }
  }

  return (
        <div className="pb-8 px-2 flex flex-col justify-center">
          <SelectProvider>
            <h2 className="text-neutral-100 font-bold text-5xl md:text-6xl text-center mb-8">Photo Gallery</h2>
            <div className="flex flex-row justify-center flex-wrap lg:gap-4">
              <div className="flex flex-wrap justify-center items-center gap-4">
                <AddImageFromUrlInput newImagesHandler={newImagesHandler}/>
                <AddImageFileInput newImagesHandler={newImagesHandler}/>
              </div>
              <div className="flex justify-center items-center gap-4">
                <SelectImagesButton/>
                <DeleteImagesButton deleteImages={deleteImages}/>
              </div>
            </div>
            <ModalProvider>
                <PhotoGallery images={images} deleteImage={deleteImages}/>
                <EnlargedImageModal/>
            </ModalProvider>
          </SelectProvider>
          {
            images?.length > 0 && nextPageToken ? <LoadImagesButton loadMoreImages={loadMoreImages}/> : null
          }
        </div>
  );
}

export default App;
