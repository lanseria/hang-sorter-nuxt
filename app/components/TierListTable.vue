<script setup>
import { ref } from 'vue'

defineProps({
  categories: Array,
})
const emit = defineEmits(['item-dropped'])

// 用于实现拖动悬停时的高亮效果
const isDragOver = ref({})

function handleDragOver(category, value) {
  isDragOver.value[category.id] = value
}

function handleDrop(category) {
  // 当图片被放置时，重置高亮状态
  isDragOver.value[category.id] = false
  // 发出事件，并带上目标分类的数据
  emit('item-dropped', category)
}
</script>

<template>
  <div class="border border-gray-700 flex w-4/5">
    <!-- 第一列：分类 -->
    <div class="flex flex-1 flex-col">
      <div
        v-for="category in categories"
        :key="category.id"
        class="text-black font-bold border border-gray-700 flex h-32 items-center justify-center"
        :style="{ backgroundColor: category.color }"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- 第二列：拖放区域 -->
    <div class="flex-4 flex flex-col">
      <div
        v-for="category in categories"
        :key="category.id"
        class="p-2 border border-gray-700 bg-gray-200 flex flex-wrap gap-2 h-32 transition-colors content-start"
        :class="{ 'bg-green-200 border-green-500': isDragOver[category.id] }"
        @dragover.prevent="handleDragOver(category, true)"
        @dragleave.prevent="handleDragOver(category, false)"
        @drop.prevent="handleDrop(category)"
      >
        <!-- 渲染已放置的图片 -->
        <div v-for="item in category.items" :key="item.id" class="rounded h-20 w-20 shadow-sm overflow-hidden">
          <img :src="item.url" :alt="item.desc" class="h-full w-full object-cover">
        </div>
      </div>
    </div>
  </div>
</template>
