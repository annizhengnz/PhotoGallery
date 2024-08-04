import axios from "axios";

const API_URL = "https://www.googleapis.com/drive/v3";

export const getImagesFromFolder = async (folderId: string, apiKey: string, pageSize:number, pageToken:string|undefined) => {
    try {
        const respone = await axios.get(`${API_URL}/files`, {
            params: {
                q: `'${folderId}' in parents`,
                pageSize: pageSize,
                fields: "nextPageToken, files(id, name, webContentLink, webViewLink, thumbnailLink,imageMediaMetadata)",
                key: apiKey,
                pageToken: pageToken,
            },
        });
        return {"files":respone.data.files, "nextPageToken":respone.data.nextPageToken};
    }
    catch (error) {
        console.log(error);
    }
}