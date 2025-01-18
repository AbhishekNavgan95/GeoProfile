import { Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);

export const insertFile = async (file) => {
    try {
        const response = await storage.createFile(file);
        console.log("File uploaded:", response);
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
    }
}

// todo inset logic to upload file and insert document
export const insertDocuments = async (documents = []) => {
  for (const doc of documents) {
    try {
      const response = await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID, // Database ID
        import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
        "unique()", // Generate unique document IDs
        doc
      );
      console.log("Document inserted:", response);
    } catch (error) {
      console.error("Error inserting document:", error.message);
    }
  }
};

// todo inset logic to upload file and insert document
export const insertDocument = async (doc = {}) => {
    try {
        const fileResponse = await insertFile(doc.file);

        doc.file = fileResponse["$id"];

        const response = await databases.createDocument(
            import.meta.env.VITE_DATABASE_ID, // Database ID
            import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
            "unique()", // Generate unique document IDs
            doc
        );
        console.log("Document inserted:", response);
    } catch(e) {
        console.error('Error while inserting documeent', doc)
    }

}

export const updateDocument = async (doc = {}) => {
    try {
        const response = await databases.updateDocument(
            import.meta.env.VITE_DATABASE_ID, // Database ID
            import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
            doc.$id, // Document ID
            doc
        );
        console.log("Document updated:", response);
    } catch(e) {
        console.error('Error while updating document : ', e)
    }
}

export const deleteDocument = async (doc = {}) => {
    try {
        const response = await databases.deleteDocument(
            import.meta.env.VITE_DATABASE_ID, // Database ID
            import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
            doc.$id // Document ID
        );
        console.log("Document deleted:", response);
    } catch(e) {
        console.error('Error while deleting document : ', e)
    }
}

export const getUsers = async () => {
    try {
        const response = await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID, // Database ID
            import.meta.env.VITE_USER_COLLECTION_ID // Collection ID
        );
        console.log("Documents fetched:", response);
        return response;
    } catch(e) {
        console.error('Error while fetching documents : ', e)
    }
}

export const getDocument = async (id) => {
    try {
        const response = await databases.getDocument(
            import.meta.env.VITE_DATABASE_ID, // Database ID
            import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
            id // Document ID
        );
        console.log("Document fetched:", response);
        return response;
    } catch(e) {
        console.error('Error while fetching document : ', e)
    }
}