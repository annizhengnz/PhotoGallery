
import { uploadImage,createImageID, getStudents, createStudent,deleteStudent } from "../Services/StudentService";


import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import Fab from "@mui/material/Fab";


import { Students } from "../Models/Students";
import { Photo } from "../Models/Photo";

interface UploadPhotoFabProps {
  open: boolean;
  onClose: () => void;
  onAddPhoto: (photo: Photo) => Promise<void>;
}



const UploadPhotoFab: React.FC<UploadPhotoFabProps> = ({
    open,
    onClose,
    onAddPhoto,
  }) => {

    

    const handleAddPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0];
        if (!file) return;
        const filename = file.name;
        // console.log(filename);
        const PhotoData =  await createImageID(filename);
        // const PhotoData = {}
        // const newStudent = await uploadImage(file,PhotoData);
        // setStudents((prev) => [...prev, newStudent]);
        // setIsFormOpen(false);
      } catch (err) {
        // setError("Failed to add student");
      }
    };
  
    return (
      <Fab color="primary" aria-label="add-image" sx={{ position: "fixed", bottom: 16, right: 16, overflow: "hidden" }}>
      <input
        type="file"
        onChange={handleAddPhoto}
        accept=".jpg, .jpeg, .png"
        // accept="image/*"
        multiple
        style={{ //make this hidden and display only the icon
          position: "absolute", 
          top: "-35px",
          left: 0,
          height: "calc(100% + 36px)",
          width: "calc(100% + 5px)",
          outline: "none",
        }}
      />
    
      <AddPhotoIcon />
    </Fab>
    )
  
  };

  export default UploadPhotoFab;