import React, { ReactElement, Fragment } from 'react';
import { getScpoedClass } from '../scopedClass';
import './dialog.scss';

interface IProps {
  /**
   * visible
   */
  visible: boolean;
  /**
   * children
   */
  children: ReactElement;
}

const scpoedClass = getScpoedClass('gui-dialog');
const Content: React.FunctionComponent<IProps> = (props: IProps) => {
  return props.visible ? (
    <Fragment>
      <div className={scpoedClass('mask')} />
      <div className={scpoedClass()}>
        <div className={scpoedClass('close')}>x</div>
        <header className={scpoedClass('header')}>notice</header>
        <div className={scpoedClass('content')}>{props.children}</div>
        <footer className={scpoedClass('footer')}>
          <button>ok</button>
          <button>cancel</button>
        </footer>
      </div>
    </Fragment>
  ) : null;
};

export { Content };
