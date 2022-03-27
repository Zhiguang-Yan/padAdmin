<template>
  <button
    ref="btnRef"
    :style="{ height: SIZE[size] }"
    :class="{ block, 'colors-btn': true }"
  >
    <slot></slot>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const enum SIZE {
  small = '24px',
  large = '40px',
  default = '32px',
}
const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: '#03e9f4',
  },
  // small large default
  size: {
    type: String,
    default: 'large',
  },
})
const btnRef = ref<HTMLElement | null>(null)
onMounted(() =>
  // js改变scss变量
  (btnRef.value as HTMLElement).style.setProperty('--padColor', props.color)
)
</script>

<style scoped lang="scss">
$color: var(--padColor, transparent); // 侧边导航宽度
.colors-btn {
  padding: 0 20px;
  cursor: pointer;
  color: $color;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: transparent;
  border: 0;
  outline: none;
  &:hover {
    border-radius: 5px;
    color: #fff;
    background: $color;
    box-shadow: 0 0 5px 0 $color, 0 0 25px 0 $color, 0 0 50px 0 $color,
      0 0 100px 0 $color;
    transition: all 1s linear;
  }

  & > span {
    position: absolute;
  }

  & > span:nth-child(1) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, transparent, $color);
    left: -100%;
    top: 0px;
    animation: line1 1s linear infinite;
  }

  @keyframes line1 {
    50%,
    100% {
      left: 100%;
    }
  }

  & > span:nth-child(2) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, $color);
    right: 0px;
    top: -100%;
    animation: line2 1s 0.25s linear infinite;
  }

  @keyframes line2 {
    50%,
    100% {
      top: 100%;
    }
  }

  & > span:nth-child(3) {
    width: 100%;
    height: 2px;
    background: -webkit-linear-gradient(left, $color, transparent);
    left: 100%;
    bottom: 0px;
    animation: line3 1s 0.75s linear infinite;
  }

  @keyframes line3 {
    50%,
    100% {
      left: -100%;
    }
  }

  & > span:nth-child(4) {
    width: 2px;
    height: 100%;
    background: -webkit-linear-gradient(top, transparent, $color);
    left: 0px;
    top: 100%;
    animation: line4 1s 1s linear infinite;
  }

  @keyframes line4 {
    50%,
    100% {
      top: -100%;
    }
  }
}
button.block {
  width: 100%;
}
</style>