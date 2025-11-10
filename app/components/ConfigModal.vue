<script setup>
defineProps({
  visible: Boolean,
})
const emit = defineEmits(['update:visible', 'select-config'])

const { getConfigurations } = useConfigurations()
const configurations = getConfigurations()

function selectConfig(config) {
  emit('select-config', config)
  close()
}

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <div v-if="visible" class="bg-black/50 flex items-center inset-0 justify-center fixed z-50" @click.self="close">
    <div class="mx-4 p-6 rounded-lg bg-white max-w-md w-full shadow-xl">
      <h3 class="text-2xl font-bold mb-6 text-center">
        选择配置
      </h3>

      <div class="flex flex-col gap-3">
        <button
          v-for="config in configurations"
          :key="config.name"
          class="text-white font-semibold px-6 py-3 rounded-md bg-blue-500 w-full transition hover:bg-blue-600"
          @click="selectConfig(config)"
        >
          {{ config.name }}
        </button>
      </div>

      <hr class="my-6">

      <div class="flex justify-center">
        <button class="text-gray-600 px-6 py-2 rounded-md bg-gray-200 transition hover:bg-gray-300" @click="close">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>
