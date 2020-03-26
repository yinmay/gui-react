import React, { ReactNode } from 'react';
import './index.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-tree');

interface IChild {
  text: string;
  value: string;
  children?: IChild[];
}

interface IProps {
  children?: ReactNode;
  className?: string;
  sourceData: IChild[];
}

const renderItem = (item: IChild, level = 1) => {
  return (
    <div
      key={item.text}
      className={scpoedClass(`level-${level} tree-item`)}
      //   style={{ paddingLeft: (level - 1) * 10 }}
    >
      <div className={scpoedClass('text')}>{item.text}</div>
      {item.children?.map((subItem) => renderItem(subItem, level + 1))}
    </div>
  );
};

export const Tree = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <div className={scpoedClass('', { extra: className })} {...rest}>
      {props.sourceData?.map((i) => renderItem(i))}
    </div>
  );
};
