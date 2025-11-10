<!-- eslint-disable no-alert -->
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
// 新增：用于在拖放操作之间传递数据
const itemBeingDragged = ref(null)

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
    alert('请先完整配置图片和描述！')
    return
  }
  categories.value.forEach(cat => cat.items = [])
  gameQueue.value = JSON.parse(JSON.stringify(configuredItems.value))
  currentItemIndex.value = 0
  isGameStarted.value = true
}

// 当 DraggableImagePresenter 开始拖动时，记录下被拖动的数据
function handleDragStart(item) {
  itemBeingDragged.value = item
}

// 当 TierListTable 触发 drop 事件时，处理数据
function handleItemDrop(targetCategory) {
  // 安全检查：确保有数据正在被拖动
  if (!itemBeingDragged.value)
    return

  // 找到 store 中对应的分类
  const categoryInStore = categories.value.find(c => c.id === targetCategory.id)
  if (categoryInStore) {
    // 将被拖动的数据添加到目标分类的 items 数组中
    categoryInStore.items.push(itemBeingDragged.value)
  }

  // 清理临时状态
  itemBeingDragged.value = null

  // 推进游戏进程
  currentItemIndex.value++

  // 检查游戏是否结束
  if (currentItemIndex.value >= gameQueue.value.length) {
    isGameStarted.value = false
    setTimeout(() => alert('所有图片已放置完成！'), 100)
  }
}
</script>

<template>
  <div class="font-sans bg-gray-400 flex min-h-screen items-center justify-center overflow-hidden">
    <ActionButtons
      :is-configured="isConfigured"
      :is-game-started="isGameStarted"
      @open-config="isConfigModalOpen = true"
      @start-game="startGame"
    />

    <TierListTable :categories="categories" @item-dropped="handleItemDrop" />

    <!-- 只有当游戏开始且有当前图片时才渲染可拖动组件 -->
    <DraggableImagePresenter
      v-if="isGameStarted && currentImage"
      :image="currentImage"
      @drag-start="handleDragStart"
    />

    <ConfigModal v-model:visible="isConfigModalOpen" v-model:items="configuredItems" />
  </div>
</template>
