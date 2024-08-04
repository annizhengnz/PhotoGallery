import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

const ACCOUNT_NAME = "your_storage_account_name";
const CONTAINER_NAME = "your_container_name";
const SAS_TOKEN = "your_sas_token";

export const getImagesFromFolder = async (folderPath: string, pageSize: number, continuationToken?: string) => {
    try {
        const blobServiceClient = new BlobServiceClient(
            `https://${ACCOUNT_NAME}.blob.core.windows.net${SAS_TOKEN}`
        );
        const containerClient: ContainerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

        const options = {
            prefix: folderPath,
            maxPageSize: pageSize,
            continuationToken: continuationToken,
        };

        const response = await containerClient.listBlobsFlat(options).byPage().next();
        const blobs = response.value.segment.blobItems;

        const files = blobs.map(blob => ({
            id: blob.name,
            name: blob.name.split('/').pop(),
            webContentLink: `https://${ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${blob.name}${SAS_TOKEN}`,
            webViewLink: `https://${ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${blob.name}${SAS_TOKEN}`,
            thumbnailLink: `https://${ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${blob.name}${SAS_TOKEN}`,
            imageMediaMetadata: {
                width: blob.properties.contentLength,
                height: blob.properties.contentLength,
            },
        }));

        return {
            "files": files,
            "nextPageToken": response.value.continuationToken
        };
    }
    catch (error) {
        console.log(error);
    }
}