<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  items: Array,
})
const emit = defineEmits(['update:visible', 'update:items'])

const localItems = ref([])

// 当 props.items 变化时，深度克隆一份到 localItems，避免直接修改 props
watch(() => props.items, (newVal) => {
  localItems.value = JSON.parse(JSON.stringify(newVal))
}, { deep: true, immediate: true })

function addItem() {
  localItems.value.push({ id: Date.now(), url: '', desc: '' })
}

function removeItem(index) {
  localItems.value.splice(index, 1)
}

function save() {
  emit('update:items', localItems.value)
  close()
}

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <div v-if="visible" class="bg-black/50 flex items-center inset-0 justify-center fixed z-50" @click.self="close">
    <div class="p-6 rounded-lg bg-white max-w-2xl w-full shadow-xl">
      <h3 class="text-2xl font-bold mb-4">
        配置图片和描述
      </h3>

      <div class="pr-2 max-h-96 overflow-y-auto">
        <div v-for="(item, index) in localItems" :key="index" class="mb-3 flex gap-3 items-center">
          <input v-model="item.url" placeholder="图片URL" class="p-2 border rounded-md flex-grow">
          <input v-model="item.desc" placeholder="图片描述" class="p-2 border rounded-md flex-grow">
          <button class="text-lg text-white font-bold rounded-full bg-red-500 h-8 w-8 transition hover:bg-red-600" @click="removeItem(index)">
            -
          </button>
        </div>
      </div>

      <hr class="my-4">

      <div class="flex items-center justify-between">
        <button class="text-white px-4 py-2 rounded-md bg-blue-500 transition hover:bg-blue-600" @click="addItem">
          添加一项
        </button>
        <button class="text-white font-semibold px-6 py-2 rounded-md bg-green-500 transition hover:bg-green-600" @click="save">
          保存并关闭
        </button>
      </div>
    </div>
  </div>
</template>
