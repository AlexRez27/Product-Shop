<template>
  <button class="button" :disabled="disabled" :type="type" @click.stop="click">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
  emits: ['on-click'],
  methods: {
    click() {
      this.$emit('on-click')
    },
  },
}
</script>

<style lang="scss" scoped>
/* CSS */
.button {
  appearance: none;
  background-color: #000000;
  border: 2px solid #1a1a1a;
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: $--main-font-size;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-width: 0;
  outline: none;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.button:disabled {
  pointer-events: none;
  cursor: default;
  background-color: $--disabled-color;
  border-color: $--disabled-color;
}

.button:active {
  box-shadow: none;
  transform: translateY(0);
}
</style>
