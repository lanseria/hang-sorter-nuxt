<script setup>
defineProps({
  isConfigured: Boolean,
  isGameStarted: Boolean,
})

defineEmits(['open-config', 'start-game'])
</script>

<template>
  <div class="flex gap-3 right-5 top-5 absolute">
    <button
      class="text-white font-semibold px-5 py-2 rounded-md bg-blue-500 shadow-md transition hover:bg-blue-600"
      @click="$emit('open-config')"
    >
      配置
    </button>
    <button
      :disabled="!isConfigured || isGameStarted"
      class="text-white font-semibold px-5 py-2 rounded-md bg-green-500 shadow-md transition disabled:bg-gray-400 hover:bg-green-600 disabled:cursor-not-allowed"
      @click="$emit('start-game')"
    >
      开始
    </button>
  </div>
</template>
