<template>
  <div class="board">
    <Cell
      v-for="(cell, index) in cells"
      :key="index"
      :cell="cell"
      @click="handleCellClick(index)"
    />
  </div>
</template>

<script>
import Cell from './Cell.vue';

export default {
  components: {
    Cell,
  },
  props: {
    rows: {
      type: Number,
      required: true,
    },
    cols: {
      type: Number,
      required: true,
    },
    mines: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      cells: this.generateBoard(),
    };
  },
  methods: {
    generateBoard() {
      const board = [];
      for (let i = 0; i < this.rows * this.cols; i++) {
        board.push({ index: i, isMine: false, isOpen: false, adjacentMines: 0 });
      }
      this.placeMines(board);
      this.calculateAdjacentMines(board);
      return board;
    },
    placeMines(board) {
      const minePositions = this.getRandomPositions(this.mines, board.length);
      minePositions.forEach((position) => {
        board[position].isMine = true;
      });
    },
    getRandomPositions(count, max) {
      const positions = [];
      while (positions.length < count) {
        const randomIndex = Math.floor(Math.random() * max);
        if (!positions.includes(randomIndex)) {
          positions.push(randomIndex);
        }
      }
      return positions;
    },
    calculateAdjacentMines(board) {
      board.forEach((cell) => {
        if (cell.isMine) return;
        const row = Math.floor(cell.index / this.cols);
        const col = cell.index % this.cols;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
              const neighborIndex = newRow * this.cols + newCol;
              if (board[neighborIndex].isMine) {
                cell.adjacentMines++;
              }
            }
          }
        }
      });
    },
    handleCellClick(index) {
      if (this.cells[index].isOpen) return;
      this.cells[index].isOpen = true;
      if (this.cells[index].isMine) {
        this.gameOver();
      } else if (this.cells[index].adjacentMines === 0) {
        this.revealAdjacentCells(index);
      }
    },
    gameOver() {
      alert('Game Over!');
      // Здесь можно добавить логику для обновления состояния игры
    },
    revealAdjacentCells(index) {
      const row = Math.floor(index / this.cols);
      const col = index % this.cols;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
            const neighborIndex = newRow * this.cols + newCol;
            if (!this.cells[neighborIndex].isOpen) {
              this.handleCellClick(neighborIndex);
            }
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(v-bind(cols), 30px);
  grid-template-rows: repeat(v-bind(rows), 30px);
}
</style>
