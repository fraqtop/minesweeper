<template>
  <div id="app" class="container">
    <h1>Сапер</h1>
    <button @click="newGame" class="btn btn-primary">Новая игра</button>
    <div class="time">
      <span>{{ time }}</span>
    </div>
    <div class="board-container">
      <Board ref="board" :rows="rows" :cols="cols" :mines="mines" @new-game="newGame" @start-game="startGame" @game-over="stopGame" />
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
      time: 0,
      isGameStarted: false,
      timer: null,
    };
  },
  methods: {
    newGame() {
      this.$refs.board.newGame();
      this.time = 0;
      this.isGameStarted = false;
      clearInterval(this.timer);
    },
    startGame() {
      this.isGameStarted = true;
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    stopGame() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Устранение вертикального скролла */
}

#app {
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Изменение на верхнюю позицию */
  height: 100vh;
}

.time {
  margin-top: 20px;
  font-size: 48px;
  font-weight: bold;
  color: #333;
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}

.board-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px); /* Уменьшение высоты для учета времени и кнопки */
  overflow-y: auto; /* Добавление скролла при необходимости */
}
</style>
