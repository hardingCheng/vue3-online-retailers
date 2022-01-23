// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
// stop 是停止观察是否进入或移出可视区域的行为
// const { stop } = useIntersectionObserver(
//   // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
//   target,
//   // isIntersecting 是否进入可视区域，true是进入 false是移出
//   // observerElement 被观察的dom
//   ([{ isIntersecting }], observerElement) => {
//     // 在此处可根据isIntersecting来判断，然后做业务
//   }
// )
// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const data = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn &&
          apiFn().then(({ result }) => {
            data.value = result
          })
      }
    },
    // 产品区域需要滚动比较多才能去加载数据。
    // threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。
    {
      threshold: 0
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result: data }
}
/**
 * 支付倒计时函数
 */
export const usePayTime = () => {
  // 倒计时逻辑
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    false
  )
  onUnmounted(() => {
    pause()
  })
  // 开启定时器 countdown 倒计时时间
  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }

  return {
    start,
    timeText
  }
}
