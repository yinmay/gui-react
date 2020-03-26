import React, { ReactNode, ChangeEventHandler } from 'react';
import './index.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-tree');

export interface IChild {
  text: string;
  value: string;
  children?: IChild[];
}

type Multi = {
  selected: string[];
  multiple: true;
  onChange: (selected: string[]) => void;
};
type Single = {
  selected: string;
  multiple: false;
  onChange: (selected: string) => void;
};
// 联合类型
type IProps = {
  children?: ReactNode;
  className?: string;
  sourceData: IChild[];
} & (Multi | Single);

export const Tree = (props: IProps) => {
  const renderItem = (item: IChild, selected: string[] | string, level = 1) => {
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const checked = e.target.checked;
      if (props.multiple) {
        if (checked) {
          props.onChange([...props.selected, item.value]);
        } else {
          props.onChange(
            props.selected.filter((value) => value !== item.value)
          );
        }
      } else {
        props.onChange(item.value);
      }
    };
    return (
      <div key={item.text} className={scpoedClass(`level-${level} tree-item`)}>
        <label className={scpoedClass('text')}>
          <input
            type='checkbox'
            onChange={onChange}
            checked={
              props.multiple
                ? selected.includes(item.value)
                : selected === item.value
            }
          />
          {item.text}
        </label>
        {item.children?.map((subItem) =>
          renderItem(subItem, selected, level + 1)
        )}
      </div>
    );
  };
  return (
    <div>{props.sourceData?.map((i) => renderItem(i, props.selected))}</div>
  );
};
