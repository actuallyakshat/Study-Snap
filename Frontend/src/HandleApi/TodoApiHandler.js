import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASE_URL}/todo`;

const createTodo = async (task, user, order) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    const { email } = user;
    const response = await axios.post(`${baseUrl}/create`, {
      task,
      email,
      order,
    });

    return response.data;
  } catch (error) {
    console.error("Error while getting creating a todo:", error);
  }
};

const updateTodo = async (todoId, task) => {
  try {
    const response = await axios.put(`${baseUrl}/update`, {
      todoId,
      task,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
const updateTodoStatus = async (todoId) => {
  try {
    const response = await axios.put(`${baseUrl}/update-status`, {
      todoId,
    });

    return response.data.updatedTodo;
  } catch (error) {
    console.error("Error updating todo status:", error);
  }
};

const deleteTodo = async (todoId, user) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }

    const { email } = user;
    const response = await axios.delete(`${baseUrl}/delete`, {
      data: { todoId, email },
    });

    return response.data;
  } catch (error) {
    console.error("Error while deleting a todo:", error);
  }
};

const reorderTodos = async (user, newOrder) => {
  try {
    const response = await axios.put(`${baseUrl}/update-order`, { newOrder });

    return response;
  } catch (error) {
    console.error("Error reordering todos:", error);
    throw error;
  }
};

export { createTodo, deleteTodo, reorderTodos, updateTodo, updateTodoStatus };
