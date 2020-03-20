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

const Layout: React.FunctionComponent<IProps> = (props: IProps) => {
  console.log(1);
  return (
    <span>
      <svg {...props}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    </span>
  );
};

export { Layout };
