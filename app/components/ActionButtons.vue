<script setup>
defineProps({
  isConfigured: Boolean,
  isGameStarted: Boolean,
})

defineEmits(['open-config', 'start-game'])
</script>

<template>
  <div class="shadow-top p-4 bg-white flex gap-4 w-full justify-center">
    <button
      class="text-white font-semibold px-8 py-3 rounded-lg bg-blue-500 shadow-md transition hover:bg-blue-600"
      @click="$emit('open-config')"
    >
      选择配置
    </button>
    <button
      :disabled="!isConfigured || isGameStarted"
      class="text-white font-semibold px-8 py-3 rounded-lg bg-green-500 shadow-md transition disabled:bg-gray-400 hover:bg-green-600 disabled:cursor-not-allowed"
      @click="$emit('start-game')"
    >
      开始
    </button>
  </div>
</template>
