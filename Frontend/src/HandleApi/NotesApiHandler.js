import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/notes`;

const addNote = async (title, content, folderId, email, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/add-note`,
      {
        title: title,
        content: content,
        folderId: folderId,
        email,
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
const saveNote = async (noteId, title, content, email, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/save-note`,
      {
        noteId,
        title,
        content,
        email,
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

const deleteNote = async (noteId, email, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete-note`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        noteId: noteId,
        email,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

const addFolder = async (name, email, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/add-folder`,
      {
        name: name,
        email: email,
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

const deleteFolder = async (folderId, email, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete-folder`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        folderId: folderId,
        email,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting folder and associated notes:", error);
    throw error;
  }
};

export { addNote, deleteNote, addFolder, deleteFolder, saveNote };
