import React, {
  ReactNode,
  HTMLAttributes,
  UIEventHandler,
  MouseEventHandler,
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

const isTouchDevice: boolean = 'ontouchstart' in document.documentElement;

export const Scroll = (props: IProps) => {
  const { className, ...rest } = props;
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, _setBarTop] = useState(0);

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

  const onScroll: UIEventHandler = (e: React.UIEvent) => {
    const { current } = containerRef;
    const scrollHeight = current!.scrollHeight; // 滚动全高
    const scrollTop = current!.scrollTop; // 滚动全高
    const viewHeight = current!.getBoundingClientRect().height; // 可视范围高度
    setBarTop((scrollTop * viewHeight) / scrollHeight);
  };

  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className={scpoedClass('')}
      {...rest}
      //   onMouseUp={onMouseUp}
      //   onMouseMove={onMouseMove}
    >
      <div
        className={scpoedClass('inner')}
        ref={containerRef}
        onScroll={onScroll}
      >
        {props.children}
      </div>
      {!isTouchDevice && (
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