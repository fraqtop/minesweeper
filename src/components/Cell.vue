<template>
  <div
    class="cell"
    :class="{ 'cell-open': cell.isOpen, 'cell-mine': cell.isMine && cell.isOpen, 'cell-flagged': cell.isFlagged }"
    @click="handleClick"
    @contextmenu.prevent="handleRightClick"
  >
    <span v-if="cell.isOpen">
      <span v-if="cell.isMine">💣</span>
      <span v-else>{{ cell.adjacentMines }}</span>
    </span>
    <span v-else-if="cell.isFlagged">🚩</span>
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
      this.cell.isFlagged = !this.cell.isFlagged;
      this.$emit('right-click', this.cell.index);
      this.cell.isClickable = false; // Блокируем возможность открытия ячейки через клик левой кнопкой мыши
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
</style>
