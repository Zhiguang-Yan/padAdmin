<template>
  <div>
    <div>
      <ul class="draggable_ul">
        <transition-group name="sort">
          <li v-for="(item, index) in list" :key="item.label" draggable="true" @dragstart="dragstart(index)"
            @dragenter="dragenter($event, index)" @dragover="dragover($event)" @dragend="dragend">
            {{ item.label }}
          </li>
        </transition-group>
      </ul>
    </div>

    <el-button type="primary" @click="handleClick">打印</el-button>
    <pac-print ref="printRef">
      <Test :value="value" />
    </pac-print>
  </div>
</template>

<script setup lang="ts">
import { val } from 'dom7';
import { ref } from 'vue'
import Test from './test.vue'
const printRef = ref()
const value = ref()
const dragIndex = ref()
const enterIndex = ref()
const list = ref([{
  label: '列表1'
},
{
  label: '列表2'
},
{
  label: '列表3'
}, {
  label: '列表4'
}
  , {
  label: '列表5'
}
  , {
  label: '列表6'
}
  , {
  label: '列表7'
}
  , {
  label: '列表8'
}
  , {
  label: '列表9'
}

])
const handleClick = () => {
  value.value = 'print_test'
  printRef.value.print()
}
const dragenter = (e: Event, index: number) => {
  enterIndex.value = index
  e.preventDefault()
}
const dragover = (e: Event) => {
  e.preventDefault()
}
const dragend = () => {
  if (dragIndex.value === enterIndex.value) return
  const source = list.value[dragIndex.value]
  list.value.splice(dragIndex.value, 1)
  list.value.splice(enterIndex.value, 0, source)

}
const dragstart = (index: number) => {
  dragIndex.value = index
}

</script>

<style lang="scss" scoped>
.container {
  height: 0px;
  width: 100%;
  overflow: hidden;

}

.draggable_ul {
  background: rgb(139, 129, 129);
  list-style: none;
  display: inline-flex;
  padding: 10px;

  li+li {
    margin-left: 10px;
  }

  li {
    width: 120px;
    cursor: move;
    height: 120px;
    background-color: red;
    border-radius: 8px;
  }

  .sort-move {
    transition: transform 0.28s;
  }
}
</style>
