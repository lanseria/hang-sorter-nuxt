// app/composables/useConfigurations.ts

interface TierItem {
  id: number
  url: string
  desc: string
}

interface Configuration {
  name: string
  items: TierItem[]
}

const configurations: Configuration[] = [
  {
    name: 'Hang Demo',
    items: [
      { id: 1, url: 'https://placehold.co/600x400?text=Hang', desc: '夯' },
      { id: 2, url: 'https://placehold.co/600x400?text=DJ', desc: '顶级' },
      { id: 3, url: 'https://placehold.co/600x400?text=RSR', desc: '人上人' },
      { id: 4, url: 'https://placehold.co/600x400?text=NPC', desc: 'NPC' },
      { id: 5, url: 'https://placehold.co/600x400?text=LWL', desc: '拉完了' },
    ],
  },
  // 未来可以在这里添加更多预设...
]

export function useConfigurations() {
  const getConfigurations = () => {
    return configurations
  }

  const getDefaultConfiguration = () => {
    // 返回第一个配置作为默认配置
    return configurations[0]
  }

  return {
    getConfigurations,
    getDefaultConfiguration,
  }
}
