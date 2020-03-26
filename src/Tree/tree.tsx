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
  selected?: string[];
}

const renderItem = (item: IChild, selected?: string[], level = 1) => {
  return (
    <div
      key={item.text}
      className={scpoedClass(`level-${level} tree-item`)}
      //   style={{ paddingLeft: (level - 1) * 10 }}
    >
      <div className={scpoedClass('text')}>
        <input
          type='checkbox'
          checked={selected && selected.includes(item.value)}
        />
        {item.text}
      </div>
      {item.children?.map((subItem) =>
        renderItem(subItem, selected, level + 1)
      )}
    </div>
  );
};

export const Tree = (props: IProps) => {
  const { className, selected, ...rest } = props;
  return (
    <div className={scpoedClass('', { extra: className })} {...rest}>
      {props.sourceData?.map((i) => renderItem(i, selected))}
    </div>
  );
};
