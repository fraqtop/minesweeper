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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #1e1e1e; /* Цвет фона темной темы VS Code */
  color: #d4d4d4; /* Цвет текста темной темы VS Code */
  overflow: hidden; /* Устранение вертикального скролла */
}

#app {
  text-align: center;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>
