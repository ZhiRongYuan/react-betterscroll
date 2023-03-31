/*
 * @Author: yuanzhirong
 * @Date: 2023-03-22 15:29:40
 * @LastEditors: yuanzhirong
 * @LastEditTime: 2023-03-30 13:48:03
 * @Description:
 */
import { ReactElement, CSSProperties } from 'react';
import { Options } from '@better-scroll/core';
import { PullUpLoadConfig } from '@better-scroll/pull-up';
import { PullDownRefreshConfig } from '@better-scroll/pull-down';
import { ScrollbarConfig } from '@better-scroll/scroll-bar';

/** 上拉加载 配置选项 */
export interface pullUpLoadOption extends PullUpLoadConfig {
  txt?: {
    more: string;
    noMore: string;
  };
}

/** 下拉刷新 配置选项 */
export interface pullDownRefreshOption extends PullDownRefreshConfig {
  txt?: string;
  stopTime?: number;
}

/** 滚动条 配置选项 */
export interface scrollbarOption extends ScrollbarConfig {}

export type PullUpElementProps = {
  isPullUpLoad: boolean;
};

export interface PullDownElementProps {
  beforePullDown: boolean;
  pulldownY: number;
  isPulling: boolean;
  reachRefreshRegion: boolean;
}

export interface IReactBScrollProps {
  children: ReactElement;
  /**
   * 决定是否派发 scroll 事件
   * 1. probeType 为 0，在任何时候都不派发 scroll 事件，
   * 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
   * 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
   * 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
   */
  probeType?: number;
  click?: boolean;
  /** 纵轴方向初始化位置 */
  startY?: number;
  freeScroll?: boolean;
  eventPassthrough?: '' | 'vertical' | 'horizontal';
  options?: Options;
  pullUpLoad?: pullUpLoadOption | boolean;
  pullDownRefresh?: pullDownRefreshOption | boolean;
  scrollbar?: scrollbarOption | boolean;
  PullUpElement?: React.FC<PullUpElementProps>;
  PullDownElement?: React.FC<PullDownElementProps>;
  /** 是否还有更多内容 */
  hasMore?: boolean;
  showPullUpElement?: boolean;
  scroll?: (pos: any) => void;
  beforeScrollStart?: () => void;
  onPullingDown?: () => Promise<any>;
  onPullingUp?: () => Promise<any>;
}

export interface IReactBScrollStates {
  beforePullDown: boolean;
  isPullingDown: boolean;
  /** 下拉加载中 */
  isPulling: boolean;
  isPullUpLoad?: boolean;
  pullDownInitTop?: number;
  /** 释放刷新 */
  reachRefreshRegion: boolean;

  bubbleY: number;
}
