import React, {
  ReactNode,
  HTMLAttributes,
  UIEventHandler,
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

export const Scroll = (props: IProps) => {
  const { className, ...rest } = props;
  const [barHeight, setBarHeight] = useState(0);
  const [barTop, setBarTop] = useState(0);

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
  return (
    <div className={scpoedClass('')} {...rest}>
      <div
        className={scpoedClass('inner')}
        ref={containerRef}
        onScroll={onScroll}
      >
        {props.children}
      </div>
      <div className={scpoedClass('slot')}>
        <div
          className={scpoedClass('bar')}
          style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
        ></div>
      </div>
    </div>
  );
};
