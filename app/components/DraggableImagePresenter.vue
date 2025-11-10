<script setup>
import { VueDraggable } from 'vue-draggable-plus'

const props = defineProps({
  image: Object,
})

// vue-draggable-plus 需要一个数组来进行操作
// 我们创建一个计算属性，它只包含当前的图片
const draggableItems = computed(() => {
  return props.image ? [props.image] : []
})
</script>

<template>
  <!-- 只有在有图片时才渲染拖拽容器 -->
  <VueDraggable
    v-if="image"
    :model-value="draggableItems"
    class="flex h-full items-center justify-center"
    :group="{ name: 'tier-items', pull: 'clone', put: false }"
    :sort="false"
  >
    <div
      class="p-4 text-center rounded-lg bg-white cursor-grab shadow-2xl"
    >
      <img :src="image.url" :alt="image.desc" class="mb-2 max-w-48 pointer-events-none">
      <p class="font-semibold pointer-events-none select-none">
        {{ image.desc }}
      </p>
    </div>
  </VueDraggable>
</template>
