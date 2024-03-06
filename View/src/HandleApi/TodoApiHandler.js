import axios from "axios";
const baseUrl = "http://localhost:8000/api/v1/todo";

const createTodo = async (task, user, order) => {
  try {
    if (!user) {
      console.error("Null User Error");
      return;
    }
    console.log(user);
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
    console.log("Response from creating a todo: ", response);
    return response;
  } catch (error) {
    console.error("Error while getting creating a todo:", error);
  }
};

const deleteTodo = async (todoId, user) => {
  try {
    console.log("todoId: ", todoId, "user: ", user);
    if (!user) {
      console.error("Null User Error");
      return;
    }
    console.log(user);
    const { sub: auth0Id, token } = user;
    const response = await axios.delete(`${baseUrl}/delete`, {
      data: { todoId, auth0Id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response from deleting a todo: ", response);
    return response;
  } catch (error) {
    console.error("Error while deleting a todo:", error);
  }
};

export { createTodo, deleteTodo };
