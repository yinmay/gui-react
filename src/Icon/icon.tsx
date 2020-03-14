import React from 'react';
import './button.scss';
import wechat from '../../statics/wechat.svg';

interface IProps extends React.SVGAttributes<SVGElement> {
  /**
   * Name for the button
   */
  name: string;
  /**
   * onClick for the button
   */
  onClick: () => void;
}

const Icon: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <span>
      <svg {...props}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    </span>
  );
};

export { Icon };
