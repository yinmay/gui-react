import React, { ReactNode } from 'react';
import './index.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-tree');

export interface IChild {
  text: string;
  value: string;
  children?: IChild[];
}

interface IProps {
  children?: ReactNode;
  className?: string;
  sourceData: IChild[];
  selected: string[];
  onChange: (item: IChild, bool: boolean) => void;
}

const renderItem = (
  item: IChild,
  selected: string[],
  onChange: (item: IChild, bool: boolean) => void,
  level = 1
) => {
  return (
    <div
      key={item.text}
      className={scpoedClass(`level-${level} tree-item`)}
      //   style={{ paddingLeft: (level - 1) * 10 }}
    >
      <div className={scpoedClass('text')}>
        <input
          type='checkbox'
          onChange={(e) => onChange(item, e.target.checked)}
          checked={selected && selected.includes(item.value)}
        />
        {item.text}
      </div>
      {item.children?.map((subItem) =>
        renderItem(subItem, selected, onChange, level + 1)
      )}
    </div>
  );
};

export const Tree = (props: IProps) => {
  const { className, selected, onChange, ...rest } = props;
  return (
    <div className={scpoedClass('', { extra: className })} {...rest}>
      {props.sourceData?.map((i) => renderItem(i, selected, onChange))}
    </div>
  );
};
