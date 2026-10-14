<template>
  <div id="app">
    <h1>Сапер</h1>
    <div class="board-container">
      <Board :rows="rows" :cols="cols" :mines="mines" />
    </div>
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
      rows: 16,
      cols: 30,
      mines: 100,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}

.board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
