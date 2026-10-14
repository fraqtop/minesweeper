<template>
  <div id="app">
    <h1>Сапер</h1>
    <Board :rows="rows" :cols="cols" :mines="mines" />
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  components: {
    Board,
  },
  data() {
    return {
      rows: 10,
      cols: 10,
      mines: 10,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
