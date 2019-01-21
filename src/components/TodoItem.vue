<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div
      class="view"
      v-bind:style="{ 'background-color': todo.done ? 'grey' : todo.color }"
    >
      <label
        v-bind:class="[{ done: todo.done }]"
        v-text="todo.text"
        @dblclick="editing = true;"
      ></label>
      <div class="actions">
        <button class="buttons" @click="editing = true;">
          <font-awesome-icon icon="edit" />
        </button>

        <button class="buttons" @click="removeTodo(todo);">
          <font-awesome-icon icon="trash" />
        </button>

        <button v-if="!todo.done" class="buttons" @click="toggleTodo(todo);">
          <font-awesome-icon icon="check" />
        </button>

        <button v-if="todo.done" class="buttons" @click="toggleTodo(todo);">
          <font-awesome-icon icon="check-square" />
        </button>
      </div>

      <div class="actions edit">
        <input
          class="edit"
          v-show="editing"
          v-focus="editing"
          :value="todo.text"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEdit"
          @blur="doneEdit"
        />
      </div>
      <div class="sentiment">
        <font-awesome-icon
          v-if="todo.sentiment.indexOf('positive') > -1"
          class="senticon"
          icon="thumbs-up"
        />
        <font-awesome-icon
          v-if="todo.sentiment.indexOf('negative') > -1"
          class="senticon"
          icon="thumbs-down"
        />
        <font-awesome-icon
          v-if="todo.sentiment.indexOf('negative') == -1 && todo.sentiment.indexOf('positive') == -1"
          class="senticon"
          icon="meh"
        />
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Todo",
  props: ["todo"],
  data() {
    return {
      editing: false
    };
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus();
        });
      }
    }
  },
  methods: {
    ...mapActions(["editTodo", "toggleTodo", "removeTodo"]),
    doneEdit(e) {
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        this.removeTodo(todo);
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    }
  }
};
</script>

<style scoped>
.todo {
  text-align: center;
  list-style-type: none;
  max-width: 300px;
  float: left;
}
.view {
  width: 90%;
  height: 120px;
  border: 10px solid white;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
}
label {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}
.buttons {
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  border-style: solid;
  padding: 5px;
  border-color: #f0f0f0;
}
.edit {
  margin-top: 10px;
}
.done {
  text-decoration: line-through;
}
.senticon {
  color: white;
}
</style>
