<template>
  <div class="absolute top-5 right-5 flex gap-3">
    <button
      @click="$emit('open-config')"
      class="py-2 px-5 rounded-md bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
    >
      配置
    </button>
    <button
      @click="$emit('start-game')"
      :disabled="!isConfigured || isGameStarted"
      class="py-2 px-5 rounded-md bg-green-500 text-white font-semibold shadow-md transition disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-600"
    >
      开始
    </button>
  </div>
</template>

<script setup>
defineProps({
  isConfigured: Boolean,
  isGameStarted: Boolean,
});

defineEmits(['open-config', 'start-game']);
</script>