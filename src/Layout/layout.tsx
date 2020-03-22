import React, { ReactNode, CSSProperties, ReactElement } from 'react';
import './layout.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-layout');
interface IProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children?: ReactNode;
  style?: CSSProperties;
}

const Layout: React.FunctionComponent<IProps> = (props: IProps) => {
  const { className, ...rest } = props;
  const hasAside = (props.children as ReactElement[]).reduce((result, now) => {
    return result || now.type === Aside;
  }, false);
  return (
    <div
      className={scpoedClass({ hasAside, '': true }, { extra: className })}
      {...rest}
    >
      {props.children}
    </div>
  );
};

const Header: React.FunctionComponent<IProps> = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <div className={scpoedClass('header', { extra: className })} {...rest}>
      {props.children}
    </div>
  );
};

const Footer: React.FunctionComponent<IProps> = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <div className={scpoedClass('footer', { extra: className })} {...rest}>
      {props.children}
    </div>
  );
};

const Content: React.FunctionComponent<IProps> = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <div className={scpoedClass('content', { extra: className })} {...rest}>
      {props.children}
    </div>
  );
};

const Aside: React.FunctionComponent<IProps> = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <div className={scpoedClass('aside', { extra: className })} {...rest}>
      {props.children}
    </div>
  );
};

export { Layout, Header, Footer, Content, Aside };
