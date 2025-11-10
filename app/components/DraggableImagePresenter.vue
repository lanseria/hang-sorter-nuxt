<template>
  <div
    v-if="image"
    ref="dragTarget"
    :style="style"
    style="position: fixed"
    class="bg-white p-5 rounded-lg shadow-2xl text-center cursor-grab"
  >
    <div :class="{ 'opacity-50': isDragging }">
      <img :src="image.url" :alt="image.desc" class="max-w-xs mb-3 pointer-events-none" />
      <p class="font-semibold pointer-events-none">{{ image.desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDraggable } from '@vueuse/core';

const props = defineProps({
  image: Object,
});
const emit = defineEmits(['drag-start']);

const dragTarget = ref(null);

// useDraggable 会返回拖动元素的位置 (x, y)、是否正在拖动 (isDragging) 等状态
// 我们可以直接将其返回的 style 绑定到元素上
const { style, isDragging } = useDraggable(dragTarget, {
  // 设置一个初始位置，让它出现在屏幕中央附近
  initialValue: { x: window.innerWidth * 0.4, y: window.innerHeight / 3 },
  // 当拖动开始时，触发一个事件并把当前图片的数据传递出去
  onStart: () => {
    emit('drag-start', props.image);
  },
});
</script>