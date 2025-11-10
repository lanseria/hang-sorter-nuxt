<script setup>
import { VueDraggable } from 'vue-draggable-plus'

defineProps({
  categories: Array,
})
const emit = defineEmits(['item-added'])

// 当一个新项目从展示区拖入时，vue-draggable-plus 会触发 'add' 事件
// 我们监听到这个事件，并通知父组件游戏可以进入下一轮了
function onItemAdded() {
  emit('item-added')
}
</script>

<template>
  <div class="border-b border-gray-700 flex w-full">
    <!-- 第一列：分类 (更窄) -->
    <div class="flex flex-none flex-col w-20">
      <div
        v-for="category in categories"
        :key="category.id"
        class="text-black font-bold text-center border-r border-t border-gray-700 flex h-24 items-center justify-center"
        :style="{ backgroundColor: category.color }"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- 第二列：拖放区域 (更宽) -->
    <div class="flex flex-grow flex-col">
      <!-- 我们为每个分类创建一个可拖拽区域 -->
      <VueDraggable
        v-for="category in categories"
        :key="category.id"
        v-model="category.items"
        class="p-2 border-t border-gray-700 bg-gray-200 flex flex-wrap gap-2 h-24 content-start overflow-x-auto"
        :group="{ name: 'tier-items' }"
        :animation="150"
        @add="onItemAdded"
      >
        <!-- 渲染已放置的图片 -->
        <div
          v-for="item in category.items"
          :key="item.id"
          class="rounded flex-shrink-0 h-16 w-16 cursor-move shadow-sm overflow-hidden"
        >
          <img :src="item.url" :alt="item.desc" class="h-full w-full pointer-events-none object-cover">
        </div>
      </VueDraggable>
    </div>
  </div>
</template>
