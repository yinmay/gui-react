import React, {
  ReactNode,
  ChangeEventHandler,
  useState,
  useEffect,
  useRef
} from 'react';
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

const useUpdate = (expanded: boolean, callback: () => void) => {
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current === true) {
      isFirst.current = false;
      return;
    }
    callback();
  }, [expanded]);
};

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
    const expand = () => setExpanded(true);
    const collapse = () => setExpanded(false);
    const divRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(true);
    useUpdate(expanded, () => {
      if (expanded) {
        if (!divRef.current) return;
        divRef.current.style.height = 'auto';

        const { height } = divRef.current.getBoundingClientRect();
        divRef.current.style.height = '0';
        divRef.current.getBoundingClientRect();
        divRef.current.style.height = height + 'px';
      } else {
        if (!divRef.current) return;
        const { height } = divRef.current.getBoundingClientRect();
        divRef.current.style.height = height + 'px';
        divRef.current.getBoundingClientRect();
        divRef.current.style.height = '0';
      }
    });
    return (
      <div key={item.text} className={scpoedClass(`level-${level} tree-item`)}>
        {item.children && (
          <span>
            {expanded ? (
              <span onClick={collapse}>-</span>
            ) : (
              <span onClick={expand}>+</span>
            )}
          </span>
        )}
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
        <div
          ref={divRef}
          className={scpoedClass({ children: true, collapsed: !expanded })}
        >
          {item.children?.map((subItem) =>
            renderItem(subItem, selected, level + 1)
          )}
        </div>
      </div>
    );
  };
  return (
    <div>{props.sourceData?.map((i) => renderItem(i, props.selected))}</div>
  );
};
