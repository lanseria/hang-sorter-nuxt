<template>
  <div v-if="visible" @click.self="close" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
      <h3 class="text-2xl font-bold mb-4">配置图片和描述</h3>
      
      <div class="max-h-96 overflow-y-auto pr-2">
        <div v-for="(item, index) in localItems" :key="index" class="flex items-center gap-3 mb-3">
          <input v-model="item.url" placeholder="图片URL" class="flex-grow p-2 border rounded-md">
          <input v-model="item.desc" placeholder="图片描述" class="flex-grow p-2 border rounded-md">
          <button @click="removeItem(index)" class="w-8 h-8 rounded-full bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition">-</button>
        </div>
      </div>
      
      <hr class="my-4">
      
      <div class="flex justify-between items-center">
        <button @click="addItem" class="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition">添加一项</button>
        <button @click="save" class="py-2 px-6 rounded-md bg-green-500 text-white hover:bg-green-600 transition font-semibold">保存并关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  items: Array,
});
const emit = defineEmits(['update:visible', 'update:items']);

const localItems = ref([]);

// 当 props.items 变化时，深度克隆一份到 localItems，避免直接修改 props
watch(() => props.items, (newVal) => {
  localItems.value = JSON.parse(JSON.stringify(newVal));
}, { deep: true, immediate: true });


const addItem = () => {
  localItems.value.push({ id: Date.now(), url: '', desc: '' });
};

const removeItem = (index) => {
  localItems.value.splice(index, 1);
};

const save = () => {
  emit('update:items', localItems.value);
  close();
};

const close = () => {
  emit('update:visible', false);
};
</script>