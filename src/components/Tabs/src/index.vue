<template>
  <div class="tabs">
    <div ref="navWrap" class="tabs_nav_wrap">
      <div class="tabs_nav_bar" :style="style"></div>
      <div
        v-for="(item, index) in navList"
        :key="index"
        :class="{ active: value === item.name, tabs_nav_item: true }"
        @click="handleChange(item.name)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, useSlots, onMounted, nextTick } from 'vue'
const props = withDefaults(
  defineProps<{
    value: string | number
    tabPosition?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    tabPosition: 'top',
  }
)
const slot: any = useSlots()
const emits = defineEmits(['tabClick', 'tabChange', 'update:value'])
const navList = ref()
const style = ref({
  transform: '',
  width: '',
  transitionDuration: '',
})

const generateNav = () => {
  return slot.default().map((slot: any) => ({
    name: slot.props.name,
    label: slot.props.label,
  }))
}
const setLeft = () => {
  nextTick(() => {
    const react = document.querySelector('.active') as HTMLElement
    style.value.transform = `translateX(${react.offsetLeft}px)`
    style.value.width = `${react.offsetWidth}px`
  })
}
const handleChange = (name: string) => {
  emits('update:value', name)
  emits('tabChange', name)
  style.value.transitionDuration = '0.28s'
  setLeft()
}
onMounted(() => {
  navList.value = generateNav()
  setLeft()
})
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
.tabs_nav_wrap {
  display: flex;
  box-sizing: border-box;
  position: relative;
  &:after {
    content: '';
    height: 2px;
    width: 100%;
    background-color: rgb(228, 231, 237);
    bottom: 0;
    position: absolute;
  }
  .tabs_nav_bar {
    position: absolute;
    width: 30px;
    left: 0;
    bottom: 0;
    height: 2px;
    z-index: 1;
    list-style: none;
    background-color: $primary;
    transition: all 0s linear;
  }
}
.tabs_nav_item {
  margin: 0 20px;
  box-sizing: border-box;
  display: inline-flex;
  font-weight: 500;
  height: 40px;
  cursor: pointer;
  position: relative;
  align-items: center;
}
div.active {
  color: $primary;
}

div.tabs__content {
  padding: 32px;
}
</style>
