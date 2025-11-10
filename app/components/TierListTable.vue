<template>
  <div class="w-4/5 max-w-6xl flex border border-gray-700">
    <!-- 第一列：分类 -->
    <div class="flex-1 flex flex-col">
      <div
        v-for="category in categories"
        :key="category.id"
        class="h-32 flex justify-center items-center border border-gray-700 font-bold text-black"
        :style="{ backgroundColor: category.color }"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- 第二列：拖放区域 (现在是标准的 div) -->
    <div class="flex-4 flex flex-col">
      <div
        v-for="category in categories"
        :key="category.id"
        class="h-32 flex flex-wrap content-start p-2 gap-2 border border-gray-700 bg-gray-200 transition-colors"
        :class="{ 'bg-green-200 border-green-500': isDragOver[category.id] }"
        @dragover.prevent="handleDragOver(category, true)"
        @dragleave.prevent="handleDragOver(category, false)"
        @drop.prevent="handleDrop(category)"
      >
        <!-- 渲染已放置的图片 -->
        <div v-for="item in category.items" :key="item.id" class="w-20 h-20 rounded overflow-hidden shadow-sm">
          <img :src="item.url" :alt="item.desc" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  categories: Array,
});
const emit = defineEmits(['item-dropped']);

// 用于实现拖动悬停时的高亮效果
const isDragOver = ref({});

const handleDragOver = (category, value) => {
  isDragOver.value[category.id] = value;
};

const handleDrop = (category) => {
  // 当图片被放置时，重置高亮状态
  isDragOver.value[category.id] = false;
  // 发出事件，并带上目标分类的数据
  emit('item-dropped', category);
};
</script>