<template>
  <div>
    <div class="toggler" @click="toggle();">TOGGLE INSTRUCTIONS</div>
    <div v-if="open" class="instructions">
      This is an experimental semi-serious ToDo app that tries to extract
      sentiment analysis from a set of manually inserted training data. It's a
      work in progress, so don't expect anything production ready! <br /><br />
      <b>STEP 1: INSERT TRAINING DATA. </b>Insert some activities that you like
      with a positive Sentiment, and some activities that you don't like with
      negative Sentiment.<br />
      <b>STEP 2: INSERT YOUR TODO LIST. </b> Insert some activities in the ToDo
      list. Those activities should be similar, but not equal, to the one in the
      training data. For example try and input 'shopping' with the already
      provided training data. <br />
      <b>STEP 3: SENTIMENT ANALYSIS. </b> The LSTM Neural Network will try to
      detect if the new activity will be enjoyable for you (positive
      <font-awesome-icon icon="thumbs-up" />) or not(negative
      <font-awesome-icon icon="thumbs-down" />). <br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  props: ["todo"],
  data() {
    return {
      open: false
    };
  },

  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>

<style scoped>
.toggler {
  cursor: pointer;
}
.instructions {
  text-align: left;
  margin: 25px;
}
</style>
