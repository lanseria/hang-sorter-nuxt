// 我们将状态定义在函数外部，使其成为一个全局单例
const isVisible = ref(false)
const messageText = ref('')
const messageType = ref<'success' | 'error'>('success')

let timeoutId: NodeJS.Timeout | null = null

/**
 * 显示一个全局消息提示
 * @param text 要显示的消息文本
 * @param type 消息类型 ('success' 或 'error')
 * @param duration 显示时长 (毫秒)，默认 3000ms
 */
export function showMessage(text: string, type: 'success' | 'error' = 'success', duration = 3000) {
  // 如果当前有消息正在显示，先清除之前的计时器
  if (timeoutId)
    clearTimeout(timeoutId)

  messageText.value = text
  messageType.value = type
  isVisible.value = true

  // 设置一个计时器，在指定时间后自动隐藏消息
  timeoutId = setTimeout(() => {
    isVisible.value = false
  }, duration)
}

/**
 * 返回消息状态的 Composable
 */
export function useMessage() {
  return {
    isVisible,
    messageText,
    messageType,
  }
}
