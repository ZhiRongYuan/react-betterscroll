# react-betterscroll

基于 BetterScroll 的 React 实现

## 滚动原理

很多人已经用过 BetterScroll，我收到反馈最多的问题是：

BetterScroll 初始化了， 但是没法滚动。

不能滚动是现象，我们得搞清楚这其中的根本原因。在这之前，我们先来看一下浏览器的滚动原理： 浏览器的滚动条大家都会遇到，当页面内容的高度超过视口高度的时候，会出现纵向滚动条；当页面内容的宽度超过视口宽度的时候，会出现横向滚动条。也就是当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容。

BetterScroll 也是一样的原理，我们可以用一张图更直观的感受一下：
![原理图](https://better-scroll.github.io/docs/assets/images/schematic.png)
绿色部分为 wrapper，也就是父容器，它会有固定的高度。黄色部分为 content，它是父容器的第一个子元素，它的高度会随着内容的大小而撑高。那么，当 content 的高度不超过父容器的高度，是不能滚动的，而它一旦超过了父容器的高度，我们就可以滚动内容区了，这就是 BetterScroll 的滚动原理。

如果内容存在图片的情况，可能会出现 DOM 元素渲染时图片还未下载，因此内容元素的高度小于预期，出现滚动不正常的情况。此时你应该在图片加载完成后，比如 onload 事件回调中，手动调用 react-betterscroll 组件的 refresh() 方法，它会重新计算滚动距离。

## API

### 属性

具体选项的含义请参考[Better-Scroll](https://better-scroll.github.io/docs/zh-CN/)中文文档
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ------------------ | ----------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------- | ------ |
| hasMore | 是否还有更多数据（判断上拉是否还需要加载分页数据） | Boolean | | true |
| probeType | 派发 scroll 事件的条件 | Number | 1、2、3 | 1 |
| click | better-scroll 会派发一个 click 事件 | Boolean | | true |
| scrollbar | 这个配置可以开启滚动条。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的 | Boolean or Object | {fade: true}, | false |
| pullDownRefresh | 这个配置用于做下拉刷新功能。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop） | Boolean or Object | {threshold: 90,stop: 40}, | false |
| pullUpLoad | 这个配置用于做上拉加载功能。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机 | Boolean or Object | { threshold: 0, txt: { more: '加载更多',noMore:'没有更多数据了'} } | false |
| startY | 纵轴方向初始化位置 | Number | | 0 |
| freeScroll | 有些场景我们需要支持横向和纵向同时滚动，而不仅限制在某个方向，这个时候我们只要设置 freeScroll 为 true 即可 | Boolean | | false |
| options | 可自行根据 better-scroll 官方文档 扩展参数 例：`:options="{stopPropagation:true}"` | Object | 官方文档的所有参数（注：props 传入的相同的属性会覆盖 options 传入的） | {} |

### 事件:

| 事件名称      | 说明                                                                                                                       | 回调参数 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| onPullingDown | 触发时机：在一次下拉刷新的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullDownRefresh** 相关配置 ) | 无       |
| onPullingUp   | 触发时机：在一次上拉加载的动作后，这个时机一般用来去后端请求数据。(触发事件在参数中需要开启 **pullingUp** 相关配置 )       | 无       |

---
