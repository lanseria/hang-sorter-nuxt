<script setup>
// -- 初始化和状态定义 --
const { getDefaultConfiguration } = useConfigurations()
const defaultConfig = getDefaultConfiguration()

const currentConfigName = ref(defaultConfig.name)
const configuredItems = ref(JSON.parse(JSON.stringify(defaultConfig.items)))

const categories = ref([
  { id: 1, name: '夯', color: '#ff7f7f', items: [] },
  { id: 2, name: '顶级', color: '#ffbf7f', items: [] },
  { id: 3, name: '人上人', color: '#ffff7f', items: [] },
  { id: 4, name: 'NPC', color: '#bfff7f', items: [] },
  { id: 5, name: '拉完了', color: '#ffffff', items: [] },
])

const isConfigModalOpen = ref(false)
const isGameStarted = ref(false)
const gameQueue = ref([])
const currentItemIndex = ref(0)

// -- 计算属性 --
const isConfigured = computed(() => configuredItems.value.length > 0 && configuredItems.value.every(item => item.url && item.desc))

const currentImage = computed(() => {
  if (isGameStarted.value && currentItemIndex.value < gameQueue.value.length)
    return gameQueue.value[currentItemIndex.value]

  return null
})

// -- 方法 --
function startGame() {
  if (!isConfigured.value) {
    showMessage('请先选择一个有效的配置！', 'error')
    return
  }
  categories.value.forEach(cat => cat.items = [])
  gameQueue.value = JSON.parse(JSON.stringify(configuredItems.value))
  currentItemIndex.value = 0
  isGameStarted.value = true
  showMessage('游戏开始！', 'success', 1500)
}

function advanceGame() {
  currentItemIndex.value++
  if (currentItemIndex.value >= gameQueue.value.length) {
    isGameStarted.value = false
    setTimeout(() => showMessage('所有图片已放置完成！', 'success'), 100)
  }
}

function handleConfigSelect(config) {
  currentConfigName.value = config.name
  configuredItems.value = JSON.parse(JSON.stringify(config.items))
  isGameStarted.value = false // 更换配置后重置游戏状态
  showMessage(`已切换到配置: ${config.name}`, 'success')
}
</script>

<template>
  <div class="font-sans bg-gray-100 flex flex-col h-screen overflow-hidden">
    <!-- 顶部 1/2：表格和标题 -->
    <div class="flex-none">
      <h1 class="text-2xl font-bold py-3 text-center bg-white shadow-md">
        {{ currentConfigName }}
      </h1>
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
    <ConfigModal v-model:visible="isConfigModalOpen" @select-config="handleConfigSelect" />
  </div>
</template>
