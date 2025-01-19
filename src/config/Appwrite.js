import { Client, Databases, Query, Storage } from "appwrite";
import toast from "react-hot-toast";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_API);

const databases = new Databases(client);
const storage = new Storage(client);

export const uploadFile = async (file) => {
  try {
    const response = await storage.createFile(file);
    console.log("File uploaded:", response);
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// todo inset logic to upload file and insert document
export const createUsers = async (documents = []) => {
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
export const createUser = async (doc = {}) => {
  try {
    const fileResponse = await uploadFile(doc?.file);
    console.log("file response : ", fileResponse)
    doc.file = fileResponse["$id"];

    // const response = await databases.createDocument(
    //   import.meta.env.VITE_DATABASE_ID, // Database ID
    //   import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
    //   "unique()", // Generate unique document IDs
    //   doc
    // );
    // console.log("Document inserted:", response);
  } catch (e) {
    console.error("Error while inserting documeent", doc);
  }
};

export const updateUser = async (doc = {}) => {
  try {
    const response = await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID, // Database ID
      import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
      doc.$id, // Document ID
      doc
    );
    console.log("Document updated:", response);
  } catch (e) {
    console.error("Error while updating document : ", e);
  }
};

export const deleteUser = async (doc = {}) => {
  try {
    const response = await databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID, // Database ID
      import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
      doc.$id // Document ID
    );
    toast.success("User deleted successfully");
    console.log("Document deleted:", response);
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while deleting document : ", e);
  }
};

export const getUsers = async (filters) => {
  try {
    const query = [];

    if (filters?.city) {
      query.push(Query.equal("city", filters.city));
    }

    if (filters?.query) {
      query.push(Query.contains("name", filters.query));
    }

    if (filters?.sort === "asc") {
      query.push(Query.orderAsc("name"));
    } else {
      query.push(Query.orderDesc("name"));
    }

    const response = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_COLLECTION_ID,
      query
    );

    console.log("Documents fetched:", response);
    return response;
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while fetching documents: ", e);
    return e;
  }
};

export const getUser = async (id) => {
  try {
    if (!id) return null;

    const response = await databases.getDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_COLLECTION_ID,
      id
    );
    console.log("Document fetched:", response);
    return response;
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while fetching document : ", e);
  }
};
