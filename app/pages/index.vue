<script setup>
// -- 响应式状态定义 --

const categories = ref([
  { id: 1, name: '夯', color: '#ff7f7f', items: [] },
  { id: 2, name: '顶级', color: '#ffbf7f', items: [] },
  { id: 3, name: '人上人', color: '#ffff7f', items: [] },
  { id: 4, name: 'NPC', color: '#bfff7f', items: [] },
  { id: 5, name: '拉完了', color: '#ffffff', items: [] },
])

const isConfigModalOpen = ref(false)
const isGameStarted = ref(false)

const configuredItems = ref([
  { id: 1, url: 'https://placehold.co/600x400?text=Hang', desc: '夯' },
  { id: 2, url: 'https://placehold.co/600x400?text=DJ', desc: '顶级' },
  { id: 3, url: 'https://placehold.co/600x400?text=RSR', desc: '人上人' },
  { id: 4, url: 'https://placehold.co/600x400?text=NPC', desc: 'NPC' },
  { id: 5, url: 'https://placehold.co/600x400?text=LWL', desc: '拉完了' },
])

const gameQueue = ref([])
const currentItemIndex = ref(0)
// itemBeingDragged 状态不再需要了

// -- 计算属性 --

const isConfigured = computed(() => configuredItems.value.length > 0 && configuredItems.value.every(item => item.url && item.desc))

const currentImage = computed(() => {
  if (isGameStarted.value && currentItemIndex.value < gameQueue.value.length) {
    return gameQueue.value[currentItemIndex.value]
  }
  return null
})

// -- 方法 --

function startGame() {
  if (!isConfigured.value) {
    showMessage('请先完整配置图片和描述！')
    return
  }
  // 清空所有分类中的项目
  categories.value.forEach(cat => cat.items = [])
  // 深度克隆配置项到游戏队列
  gameQueue.value = JSON.parse(JSON.stringify(configuredItems.value))
  currentItemIndex.value = 0
  isGameStarted.value = true
}

// 当一个新项目被添加到任何一个分类时，此方法被调用
function advanceGame() {
  // 推进游戏进程
  currentItemIndex.value++

  // 检查游戏是否结束
  if (currentItemIndex.value >= gameQueue.value.length) {
    isGameStarted.value = false
    setTimeout(() => showMessage('所有图片已放置完成！'), 100)
  }
}
</script>

<template>
  <div class="font-sans bg-gray-100 flex flex-col h-screen overflow-hidden">
    <!-- 顶部 1/2：表格 -->
    <div class="flex-none">
      <TierListTable :categories="categories" @item-added="advanceGame" />
    </div>

    <!-- 中间：拖动元素展示区域 -->
    <div class="flex-grow relative">
      <!-- 只有当游戏开始且有当前图片时才渲染可拖动组件 -->
      <DraggableImagePresenter
        v-if="isGameStarted && currentImage"
        :image="currentImage"
      />
    </div>

    <!-- 底部：操作按钮 -->
    <div class="flex-none">
      <ActionButtons
        :is-configured="isConfigured"
        :is-game-started="isGameStarted"
        @open-config="isConfigModalOpen = true"
        @start-game="startGame"
      />
    </div>

    <!-- 配置弹窗 -->
    <ConfigModal v-model:visible="isConfigModalOpen" v-model:items="configuredItems" />
  </div>
</template>
