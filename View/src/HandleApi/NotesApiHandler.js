import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/notes`;

const addNote = async (title, content, folderId, auth0Id, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/add-note`,
      {
        title: title,
        content: content,
        folderId: folderId,
        auth0Id: auth0Id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};
const saveNote = async (noteId, title, content, auth0Id, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/save-note`,
      {
        noteId,
        title,
        content,
        auth0Id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

const deleteNote = async (noteId, auth0Id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete-note`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        noteId: noteId,
        auth0Id: auth0Id,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

const addFolder = async (name, auth0Id, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/add-folder`,
      {
        name: name,
        auth0Id: auth0Id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding folder:", error);
    throw error;
  }
};

const deleteFolder = async (folderId, auth0Id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete-folder`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        folderId: folderId,
        auth0Id: auth0Id,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting folder and associated notes:", error);
    throw error;
  }
};

export { addNote, deleteNote, addFolder, deleteFolder, saveNote };
