import React, {
  ReactNode,
  HTMLAttributes,
  UIEventHandler,
  MouseEventHandler,
  TouchEventHandler,
  useState,
  useEffect,
  useRef
} from 'react';
import './index.scss';
import { getScpoedClass } from '../scopedClass';
import { scrollbarWidth } from './scrollbarwidth';

const scpoedClass = getScpoedClass('gui-scroll');

interface IProps extends HTMLAttributes<HTMLDivElement> {
  //   type: string;
  children?: ReactNode;
  className?: string;
}

// const isTouchDevice: boolean = 'ontouchstart' in document.documentElement;

export const Scroll = (props: IProps) => {
  const { className, ...rest } = props;
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);
  const [barVisible, setBarVisible] = useState(false);

  const setBarTop = (number: number) => {
    if (number < 0) return;
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight; // 滚动全高
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = ((scrollHeight - viewHeight) * viewHeight) / scrollHeight;
    if (number > maxBarTop) {
      return;
    }
    _setBarTop(number);
  };

  const timerRef = useRef<number | null>(null);

  const onScroll: UIEventHandler = (e: React.UIEvent) => {
    setBarVisible(true);
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight; // 滚动全高
    const scrollTop = current!.scrollTop; // 滚动全高
    const viewHeight = current!.getBoundingClientRect().height; // 可视范围高度
    setBarTop((scrollTop * viewHeight) / scrollHeight);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setBarVisible(false);
    }, 300);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // mounted
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight; // 滚动全高
    const viewHeight = containerRef.current!.getBoundingClientRect().height; // 可视范围高度
    setBarHeight((viewHeight * viewHeight) / scrollHeight);
  }, []);

  const draggingRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopRef = useRef(0);
  const onMouseDown: MouseEventHandler = (e) => {
    draggingRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop;
  };
  const onMouseUp = () => {
    draggingRef.current = false;
  };
  const onMouseMove = (e: any) => {
    if (draggingRef.current) {
      const delta = e.clientY - firstYRef.current;
      const newBarTop = firstBarTopRef.current + delta;
      setBarTop(newBarTop);
      const scrollHeight = containerRef.current!.scrollHeight; // 滚动全高
      const viewHeight = containerRef.current!.getBoundingClientRect().height; // 可视范围高度
      containerRef.current!.scrollTop = (newBarTop * scrollHeight) / viewHeight;
    }
  };

  useEffect(() => {
    document.addEventListener('onMouseUp', onMouseUp);
    document.addEventListener('mouseMove', onMouseMove);

    return () => {
      document.removeEventListener('onMouseUp', onMouseUp);
      document.removeEventListener('mouseMove', onMouseMove);
    };
  }, []);
  const [translateY, _setTranslateY] = useState(0);
  const setTranslateY = (num: number) => {
    if (num < 0) {
      num = 0;
    } else if (num > 150) {
      num = 150;
    }
    _setTranslateY(num);
  };
  const lastYRef = useRef(0);
  const moveCount = useRef(0);
  const pulling = useRef(true);
  const onTouchMove: TouchEventHandler = (e) => {
    moveCount.current += 1;
    const deltaY = e.touches[0].clientY - lastYRef.current;
    if (moveCount.current === 1 && deltaY < 0) {
      pulling.current = false;
      return;
    }
    if (pulling.current === false) {
      return;
    }

    setTranslateY(translateY + deltaY);

    lastYRef.current = e.touches[0].clientY;
  };
  const onTouchStart: TouchEventHandler = (e) => {
    const { current } = containerRef;
    const scrollTop = current!.scrollTop;
    if (scrollTop !== 0) return;
    pulling.current = true;
    lastYRef.current = e.touches[0].clientY;
    moveCount.current = 0;
  };
  const onTouchEnd: TouchEventHandler = (e) => {
    setTranslateY(0);
  };
  return (
    <div
      className={scpoedClass('')}
      {...rest}
      //   onMouseUp={onMouseUp}
      //   onMouseMove={onMouseMove}
    >
      <div className={scpoedClass('loading')} style={{ height: translateY }}>
        ↓
      </div>
      <div
        className={scpoedClass('inner')}
        style={{ transform: `translateY(${translateY}px)` }}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ref={containerRef}
        onScroll={onScroll}
      >
        {props.children}
      </div>
      {barVisible && (
        <div className={scpoedClass('slot')}>
          <div
            className={scpoedClass('bar')}
            onMouseDown={onMouseDown}
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
          ></div>
        </div>
      )}
    </div>
  );
};
