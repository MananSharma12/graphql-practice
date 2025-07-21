const axios = require("axios");

export const resolvers = {
  Todo: {
    user: async (todo) => (await axios.get(`http://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
  },
  Query: {
    getTodos: async () => (await axios.get("http://jsonplaceholder.typicode.com/todos")).data,
    getAllUsers: async () => (await axios.get("http://jsonplaceholder.typicode.com/users")).data,
    getUser: async (_, { id }) => (await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)).data,
  },
};