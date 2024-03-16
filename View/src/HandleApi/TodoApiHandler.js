import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1/todo";

const createTodo = async (task, user, order) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    const { sub: auth0Id, token } = user;
    const response = await axios.post(
      `${baseUrl}/create`,
      {
        task,
        auth0Id,
        order,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error while getting creating a todo:", error);
  }
};

const updateTodo = async (todoId, task, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update`,
      {
        todoId,
        task,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
const updateTodoStatus = async (todoId, token) => {
  try {
    const response = await axios.put(
      `${baseUrl}/update-status`,
      {
        todoId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    const { sub: auth0Id, token } = user;
    const response = await axios.delete(`${baseUrl}/delete`, {
      data: { todoId, auth0Id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while deleting a todo:", error);
  }
};

const reorderTodos = async (user, newOrder) => {
  try {
    const token = user.token;
    const response = await axios.put(
      `${baseUrl}/update-order`,
      { newOrder }, // Send newOrder directly as the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error reordering todos:", error);
    throw error;
  }
};

export { createTodo, deleteTodo, reorderTodos, updateTodo, updateTodoStatus };
