<template>
  <div
    class="cell"
    :class="{ 'cell-open': cell.isOpen, 'cell-mine': cell.isMine && cell.isOpen }"
    @click="handleClick"
  >
    <span v-if="cell.isOpen">{{ cell.adjacentMines }}</span>
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
      this.$emit('click', this.cell.index);
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
</style>
