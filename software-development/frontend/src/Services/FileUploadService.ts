
import {getStudents} from '../Services/StudentService';
 
const upload = (file: File, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);

  return getStudents();
};

const getFiles = () : Promise<any> => {
  return getStudents();
};

const UploadService = {
  upload,
  getFiles,
};

export default UploadService;
