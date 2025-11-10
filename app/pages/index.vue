<template>
  <div class="main-container">
    <!-- 右上角按钮 -->
    <div class="top-right-buttons">
      <button @click="openConfigModal" class="btn config-btn">配置</button>
      <button @click="startGame" class="btn start-btn" :disabled="!isConfigured || isGameStarted">开始</button>
    </div>

    <!-- 主体表格布局 -->
    <div class="table-layout">
      <!-- 第一列：分类 -->
      <div class="column column-left">
        <div v-for="category in categories" :key="category.id" class="cell category-cell" :style="{ backgroundColor: category.color }">
          {{ category.name }}
        </div>
      </div>

      <!-- 第二列：拖放区域 -->
      <div class="column column-right">
        <div v-for="category in categories" :key="category.id" class="cell drop-zone">
          <!-- 这里可以显示已拖放的图片 -->
        </div>
      </div>
    </div>

    <!-- 游戏进行时：待拖动的图片 -->
    <div v-if="isGameStarted && currentImage" class="draggable-image-container">
       <img :src="currentImage.url" :alt="currentImage.desc" draggable="true" @dragstart="onDragStart" />
       <p>{{ currentImage.desc }}</p>
    </div>

    <!-- 配置模态框 (简单实现) -->
    <div v-if="isConfigModalOpen" class="modal-overlay">
        <div class="modal-content">
            <h3>配置图片和描述</h3>
            <div v-for="(item, index) in configuredItems" :key="index" class="config-item">
                <input v-model="item.url" placeholder="图片URL">
                <input v-model="item.desc" placeholder="图片描述">
                <button @click="removeItem(index)">删除</button>
            </div>
            <button @click="addItem">添加一项</button>
            <hr>
            <button @click="saveConfig">保存并关闭</button>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 分类定义
const categories = ref([
  { id: 1, name: '夯', color: 'red' },
  { id: 2, name: '顶级', color: 'orange' },
  { id: 3, name: '人上人', color: 'yellow' },
  { id: 4, name: 'NPC', color: 'lightyellow' },
  { id: 5, name: '拉完了', color: 'white' },
]);

// 状态管理
const isConfigModalOpen = ref(false);
const isGameStarted = ref(false);
const configuredItems = ref([
    { url: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Image1', desc: '描述1' },
    { url: 'https://via.placeholder.com/150/00FF00/FFFFFF?Text=Image2', desc: '描述2' }
]);
const gameItems = ref([]);
const currentItemIndex = ref(0);

// 计算属性
const isConfigured = computed(() => configuredItems.value.length > 0);
const currentImage = computed(() => {
    if (isGameStarted.value && currentItemIndex.value < gameItems.value.length) {
        return gameItems.value[currentItemIndex.value];
    }
    return null;
});

// 方法
const openConfigModal = () => {
  isGameStarted.value = false; // 打开配置时重置游戏状态
  isConfigModalOpen.value = true;
};

const addItem = () => {
    configuredItems.value.push({ url: '', desc: '' });
};

const removeItem = (index) => {
    configuredItems.value.splice(index, 1);
};

const saveConfig = () => {
  isConfigModalOpen.value = false;
  // 可以添加一些验证逻辑，确保URL和描述不为空
};

const startGame = () => {
  if (!isConfigured.value) {
    alert('请先配置图片！');
    return;
  }
  gameItems.value = [...configuredItems.value]; // 复制配置好的图片开始游戏
  currentItemIndex.value = 0;
  isGameStarted.value = true;
};

// 拖拽逻辑 (基础实现)
const onDragStart = (event) => {
    // 传递当前拖动项的索引
    event.dataTransfer.setData('text/plain', currentItemIndex.value);
};

// 注意：要完成拖放，您需要在 drop-zone 元素上添加 @dragover.prevent 和 @drop 事件监听器。
// 这部分将在下一步中使用更强大的库来简化实现。

</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #cccccc; /* 灰色底色 */
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

.top-right-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.config-btn {
  background-color: #007bff;
  color: white;
}

.start-btn {
  background-color: #28a745;
  color: white;
}

.start-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.table-layout {
  display: flex;
  width: 80%;
  max-width: 1200px;
  border: 1px solid #333;
}

.column {
  display: flex;
  flex-direction: column;
}

.column-left {
  flex: 1; /* 第一列占比小 */
}

.column-right {
  flex: 4; /* 第二列占比大 */
}

.cell {
  border: 1px solid #333;
  padding: 20px;
  text-align: center;
  color: black;
  font-weight: bold;
  height: 100px; /* 固定单元格高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.drop-zone {
  background-color: #f0f0f0;
}

.draggable-image-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    text-align: center;
    cursor: grab;
}

.draggable-image-container img {
    max-width: 200px;
    margin-bottom: 10px;
}

/* 模态框样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
}
.config-item {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}
.config-item input {
    flex-grow: 1;
    padding: 5px;
}
</style>