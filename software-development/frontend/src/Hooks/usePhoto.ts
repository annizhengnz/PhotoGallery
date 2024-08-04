// import { useState, useEffect } from 'react';
// import { Photo } from '../Models/Photo';
// import { getStudents, createStudent } from '../Services/StudentService';

// export const usePhoto = () => {
//     const [students, setStudents] = useState<Photo[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchPhoto = async () => {
//             try {
//                 const photo = await getPhoto();
//                 setStudents(photo);
//             } catch (err) {
//                 setError('Failed to fetch photo');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPhoto();                                                                                                                                                           AA
//     }, []);

//     const addStudent = async (student: Omit<Students, 'id'>) => {
//         try {
//             const newStudent = await createStudent(student);
//             setStudents([...students, newStudent]);
//         } catch (err) {
//             setError('Failed to add student');
//         }
//     };

//     return { students, loading, error, addStudent };
// };