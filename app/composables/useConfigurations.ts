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
      { id: 1, url: 'https://dummyimage.com/400x400?text=Hang', desc: '夯' },
      { id: 2, url: 'https://dummyimage.com/400x400?text=DJ', desc: '顶级' },
      { id: 3, url: 'https://dummyimage.com/400x400?text=RSR', desc: '人上人' },
      { id: 4, url: 'https://dummyimage.com/400x400?text=NPC', desc: 'NPC' },
      { id: 5, url: 'https://dummyimage.com/400x400?text=LWL', desc: '拉完了' },
    ],
  },
  {
    name: '全球手机品牌',
    items: [
      { id: 1, url: 'https://dummyimage.com/400x400?text=Apple', desc: '苹果' },
      { id: 2, url: 'https://dummyimage.com/400x400?text=Samsung', desc: '三星' },
      { id: 3, url: 'https://dummyimage.com/400x400?text=Google', desc: '谷歌' },
      { id: 4, url: 'https://dummyimage.com/400x400?text=Huawei', desc: '华为' },
      { id: 5, url: 'https://dummyimage.com/400x400?text=Xiaomi', desc: '小米' },
      { id: 6, url: 'https://dummyimage.com/400x400?text=OnePlus', desc: '一加' },
      { id: 7, url: 'https://dummyimage.com/400x400?text=OPPO', desc: 'OPPO' },
      { id: 8, url: 'https://dummyimage.com/400x400?text=Vivo', desc: 'Vivo' },
      { id: 9, url: 'https://dummyimage.com/400x400?text=Sony', desc: '索尼' },
      { id: 10, url: 'https://dummyimage.com/400x400?text=Motorola', desc: '摩托罗拉' },
      { id: 11, url: 'https://dummyimage.com/400x400?text=Nothing', desc: 'Nothing' },
      { id: 12, url: 'https://dummyimage.com/400x400?text=Nokia', desc: '诺基亚' },
      { id: 13, url: 'https://dummyimage.com/400x400?text=LG', desc: 'LG' },
      { id: 14, url: 'https://dummyimage.com/400x400?text=HTC', desc: 'HTC' },
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
