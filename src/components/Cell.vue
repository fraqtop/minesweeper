<template>
  <div
    class="cell"
    :class="{ 'cell-open': cell.isOpen, 'cell-mine': cell.isMine && cell.isOpen, 'cell-flagged': cell.isFlagged, 'cell-locked': !cell.isClickable }"
    @click="handleClick"
    @contextmenu.prevent="handleRightClick"
  >
    <span v-if="cell.isOpen">
      <span v-if="cell.isMine">💣</span>
      <span v-else :style="{ '--digit-color': getDigitColor(cell.adjacentMines) }">{{ cell.adjacentMines }}</span>
    </span>
    <span v-else-if="!cell.isClickable">🚩</span>
  </div>
</template>

<script>
export default {
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      if (this.cell.isFlagged) return;
      this.$emit('click', this.cell.index);
    },
    handleRightClick() {
      if (this.cell.isOpen) return;
      if (!this.cell.isClickable) {
        this.cell.isClickable = true; // Разблокируем ячейку
      } else {
        this.cell.isFlagged = !this.cell.isFlagged;
        this.$emit('right-click', this.cell.index);
      }
    },
    getDigitColor(adjacentMines) {
      const minMines = 0;
      const maxMines = 8;
      const red = Math.round((adjacentMines / maxMines) * 255);
      const blue = Math.round((1 - adjacentMines / maxMines) * 255);
      return `rgb(${red}, 0, ${blue})`;
    },
  },
};
</script>

<style scoped>
.cell {
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: none; /* Убираем эффект затенения при наведении */
  background-color:#504E73;
}

.cell-open {
  background-color: #f0f0f0;
}

.cell-mine {
  background-color: #ff6347;
}

.cell-flagged {
  background-color: #ffff00;
}

.cell-locked {
  background-color: #ffa500; /* Оранжевый цвет */
  opacity: 0.5;
  cursor: not-allowed;
}

.cell-open span {
  color: var(--digit-color);
}
</style>
