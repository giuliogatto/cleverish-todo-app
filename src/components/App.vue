<template>
  <section class="todoapp">
    <!-- header -->
    <header class="header">
      <h1>Clever(ish) ToDo App with Neural Network sentiment analysis</h1>
      <Instructions />
      <section class="training">
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="New Training Data"
          v-model="newdata"
        />
        <select class="new-todo new-todo-select" v-model="newsentiment">
          <option value="" disabled hidden>Select Sentiment</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
        <button
          class="new-todo"
          @click="addTrainingData(newdata, newsentiment);"
          type="button"
        >
          <font-awesome-icon icon="save" />
        </button>

        <div class="trainingcontainer">
          <div
            class="trainingsingle"
            v-for="(tdata, index) in trainingdata"
            :key="index"
          >
            <span>{{ tdata.input }} = {{ tdata.output }}</span>
            <button
              class="buttons trainingtrash"
              @click="removeTraining(tdata);"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </div>
      </section>

      <div class="separator"></div>
      <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="New ToDo"
        v-model="newitem"
      />
      <select class="new-todo new-todo-select" v-model="newcolor">
        <option value="" disabled hidden>Select Color</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
      </select>
      <button
        class="new-todo"
        @click="addTodo(newitem, newcolor);"
        type="button"
      >
        <font-awesome-icon icon="save" />
      </button>
      <br />
      <div class="error" v-if="error">
        Please select a color and insert new ToDo text!
      </div>
      <div v-if="computing" class="blink_me">
        Computing ToDo Sentiment from your preferences
      </div>
    </header>
    <!-- main section -->
    <section class="main" v-show="todos.length">
      <ul class="todo-list">
        <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" />
      </ul>
    </section>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import TodoItem from "./TodoItem.vue";
import Instructions from "./Instructions.vue";
const brain = require("brain.js");
const net = new brain.recurrent.LSTM();

export default {
  name: "App",
  components: { TodoItem, Instructions },
  data() {
    return {
      visibility: "all",
      newcolor: "",
      newitem: "",
      error: false,
      computing: false,
      newdata: "",
      newsentiment: ""
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    trainingdata() {
      return this.$store.state.trainingdata;
    },
    allChecked() {
      return this.todos.every(todo => todo.done);
    }
  },
  methods: {
    resetError: function(evt) {
      this.error = true;
    },
    addTrainingData(newdata, newsentiment) {
      if (newdata && newsentiment && newdata.length < 125) {
        this.newdata = "";
        this.$store.dispatch("addTrainingData", {
          text: newdata,
          sentiment: newsentiment
        });
      }
    },
    removeTraining(tdata) {
      this.$store.dispatch("removeTraining", tdata);
    },
    addTodo(text, newcolor) {
      if (text && newcolor && text.length < 125) {
        this.computing = true;
        let self = this;
        setTimeout(function() {
          net.train(self.$store.state.trainingdata, {
            iterations: 100,
            erroThresh: 0.011,
            log: true
          });
          console.log(text, self.$store.state.trainingdata);
          let sentiment = net.run(String(text));
          console.log("sentiment=", sentiment);
          self.$store.dispatch("addTodo", { text, newcolor, sentiment });
          self.newitem = "";
          self.error = false;
          self.computing = false;
        }, 100);
      } else {
        this.error = true;
      }
    }
  }
};
</script>

<style scoped>
section {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  justify-content: center;
  margin-top: 15px;
}
header {
  text-align: center;
}
.new-todo {
  margin-right: 10px;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  border-style: solid;
  padding: 5px;
  border-color: #f0f0f0;
}
.new-todo-select {
  padding: 4px;
}
.error {
  color: red;
  margin-top: 10px;
}
.todo-list {
}
.separator {
  height: 60px;
}
.trainingsingle {
  text-align: left;
  margin-left: 50px;
}
.trainingtrash {
  margin-left: 10px;
}
.trainingcontainer {
  margin-top: 15px;
}
.blink_me {
  animation: blinker 1s linear infinite;
  margin-top: 10px;
  color: red;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
