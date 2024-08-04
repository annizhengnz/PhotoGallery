import { Students } from '../Models/Students';
import config from '../Config';
import { json } from 'stream/consumers';

const { apiUrl } = config;

export const getStudents = async (): Promise<Students[]> => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export const uploadImage = async (image: File, photoData : any): Promise<any> => {
  const id = photoData.id;
  const url = `${apiUrl}/100/photo_upload`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'accept': '*/*',
      'Content-Type': 'multipart/form-data',
    },
    body: image,
  });
  const data = await response.json();
  return data;
};

export const createImageID = async (filename:string): Promise<any> => {
  const id = Math.random() * 100;
  const date = new Date().toISOString().split('T')[0];
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "id": id,
      "date": date,
      "tag": "string",
      "title": filename,
      "userID": "string",
      "filepath": "string"
    }),
  });
  const data = await response.json();
  return data;
};


export const createStudent = async (student: Omit<Students, 'id'>): Promise<Students> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  const data = await response.json();
  return data;
};

export const updateStudent = async (id: number, student: Students): Promise<void> => {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
};

export const deleteStudent = async (id: number): Promise<void> => {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
};

export const bulkCreateStudents = async (students: Omit<Students, 'id'>[]): Promise<Students[]> => {
  const response = await fetch(`${apiUrl}/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(students),
  });
  const data = await response.json();
  return data;
};