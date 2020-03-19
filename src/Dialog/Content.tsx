import React, {
  ReactElement,
  Fragment,
  cloneElement,
  ReactFragment,
  ReactNode
} from 'react';
import ReactDOM from 'react-dom';

import { getScpoedClass } from '../scopedClass';
import './dialog.scss';
import '../index.scss';

interface IProps {
  /**
   * visible
   */
  visible: boolean;
  /**
   * children
   */
  children: ReactElement;

  buttons?: Array<ReactElement | string>;
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
}

const scpoedClass = getScpoedClass('gui-dialog');
const Content: React.FunctionComponent<IProps> = (props: IProps) => {
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };
  return ReactDOM.createPortal(
    props.visible ? (
      <Fragment>
        <div className={scpoedClass('mask')} onClick={onClickMask} />
        <div className={scpoedClass()} onClick={props.onClose}>
          <div className={scpoedClass('close')}>x</div>
          <header className={scpoedClass('header')}>notice</header>
          <div className={scpoedClass('content')}>{props.children}</div>

          {props.buttons && (
            <footer className={scpoedClass('footer')}>
              {props.buttons.map((item: any, index: number) =>
                cloneElement(item, { key: index })
              )}
            </footer>
          )}
        </div>
      </Fragment>
    ) : null,
    document.body
  );
};

const modal = (
  content: ReactNode,
  buttons?: ReactElement[],
  afterClose?: () => void
) => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div); // 事件销毁，垃圾回收
    div.remove();
  };
  const component = (
    <Content
      visible={true}
      buttons={buttons}
      onClose={() => {
        close();
        // tslint:disable-next-line:no-unused-expression
        afterClose && afterClose();
      }}
    >
      <div>{content}</div>
    </Content>
  );
  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
  return close;
};

const alert = (content: string) => {
  const buttons = [<button onClick={() => close()}>ok</button>];
  const close = modal(content, buttons);
};

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    close();
    // tslint:disable-next-line: no-unused-expression
    yes && yes();
  };
  const onNo = () => {
    close();
    // tslint:disable-next-line: no-unused-expression
    no && no();
  };
  const buttons = [
    <button onClick={onYes}>Yes</button>,
    <button onClick={onNo}>No</button>
  ];
  const close = modal(content, buttons);
};

Content.defaultProps = { closeOnClickMask: false };

export { Content, alert, confirm, modal };
