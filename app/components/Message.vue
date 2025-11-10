<script setup lang="ts">
const { isVisible, messageText, messageType } = useMessage()

// 根据消息类型动态计算背景颜色
const bgColorClass = computed(() => {
  return messageType.value === 'success' ? 'bg-green-500' : 'bg-red-500'
})
</script>

<template>
  <!-- 使用 Transition 组件实现平滑的淡入淡出效果 -->
  <Transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isVisible"
      class="text-white font-semibold px-6 py-3 rounded-md shadow-lg bottom-25 left-1/2 fixed z-100 -translate-x-1/2"
      :class="[bgColorClass]"
    >
      {{ messageText }}
    </div>
  </Transition>
</template>
