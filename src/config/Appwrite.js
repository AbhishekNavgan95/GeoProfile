import { Client, Databases, Query, Storage } from "appwrite";
import toast from "react-hot-toast";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_API);

const databases = new Databases(client);
const storage = new Storage(client);

// ✅
export const createUser = async (doc = {}) => {
  const loading = toast.loading("Creating user...");
  try {
    const file = doc.image[0];
    const fileResponse = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      'unique()',
      file
    );

    const imageURL = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${import.meta.env.VITE_BUCKET_ID}/files/${fileResponse.$id}/view?project=${import.meta.env.VITE_APPWRITE_API}&mode=admin`;

    doc.image = imageURL;

    const dbResponse = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID, // Database ID
      import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
      "unique()",
      doc
    );

    toast.success("User created successfully");
    return dbResponse;
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while inserting documeent", e);
  } finally {
    toast.dismiss(loading);
  }
};

// ✅
export const updateUser = async (doc = {}) => {
  const loading = toast.loading("Updating user...");
  try {
    const response = await databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID, // Database ID
      import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
      doc.$id, // Document ID
      doc
    );
    // console.log("Document updated:", response);
    toast.success("User updated successfully");
    return response;
  } catch (e) {
    console.error("Error while updating document : ", e);
    toast.error("Something went wrong while updating the user ☹️");
  } finally {
    toast.dismiss(loading);
  }
};

// ✅
export const deleteUser = async (doc = {}) => {
  try {
    const response = await databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID, // Database ID
      import.meta.env.VITE_USER_COLLECTION_ID, // Collection ID
      doc.$id // Document ID
    );
    toast.success("User deleted successfully");
    // console.log("Document deleted:", response);
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while deleting document : ", e);
  }
};

// ✅
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

    // console.log("Documents fetched:", response);
    return response;
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while fetching documents: ", e);
    return e;
  }
};

// ✅
export const getUser = async (id) => {
  try {
    if (!id) return null;

    const response = await databases.getDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_USER_COLLECTION_ID,
      id
    );
    // console.log("Document fetched:", response);
    return response;
  } catch (e) {
    toast.error("Something went wrong ☹️");
    console.error("Error while fetching document : ", e);
  }
};
