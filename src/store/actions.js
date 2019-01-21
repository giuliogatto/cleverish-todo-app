export default {
  addTodo({ commit }, todo) {
    commit("addTodo", {
      text: todo.text,
      color: todo.newcolor,
      sentiment: todo.sentiment,
      done: false
    });
  },

  removeTodo({ commit }, todo) {
    commit("removeTodo", todo);
  },

  toggleTodo({ commit }, todo) {
    commit("editTodo", { todo, done: !todo.done });
  },

  editTodo({ commit }, { todo, value }) {
    commit("editTodo", { todo, text: value });
  },

  addTrainingData({ commit }, data) {
    console.log(data);
    commit("addTrainingData", {
      input: data.text,
      output: data.sentiment
    });
  },
  removeTraining({ commit }, data) {
    commit("removeTraining", data);
  }
};
