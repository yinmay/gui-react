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

const alert = (content: string) => {
  const component = (
    <Content
      visible={true}
      onClose={() => {
        ReactDOM.render(React.cloneElement(component, { visible: false }), div);
        ReactDOM.unmountComponentAtNode(div); // 事件销毁，垃圾回收
        div.remove();
      }}
    >
      <div>{content}</div>
    </Content>
  );
  const div = document.createElement('div');
  document.body.append(div);
  return ReactDOM.render(component, div);
  // yy([<button onClick={onClose}>ok</button>]);
};

// const yy=(content:any,buttons:any)={
//   const onClose=() => {
//     ReactDOM.render(React.cloneElement(component, { visible: false }), div);
//     ReactDOM.unmountComponentAtNode(div); // 事件销毁，垃圾回收
//     div.remove();
//   }
//   const component = (
//     <Content
//       visible={true}
//       buttons={buttons}
//       onClose={onClose}
//     >
//       <div>{content}</div>
//     </Content>
//   );
//   const div = document.createElement('div');
//   document.body.append(div);
//   return ReactDOM.render(component, div);
// }

const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const closeModal = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div); // 事件销毁，垃圾回收
    div.remove();
  };
  const component = (
    <Content
      visible={true}
      onClose={() => {
        closeModal();
        // tslint:disable-next-line: no-unused-expression
        no && no();
      }}
      buttons={[
        <button
          onClick={() => {
            closeModal();
            // tslint:disable-next-line: no-unused-expression
            yes && yes();
          }}
        >
          yes
        </button>,
        <button
          onClick={() => {
            closeModal();
            // tslint:disable-next-line: no-unused-expression
            no && no();
          }}
        >
          no
        </button>
      ]}
    >
      <div>{content}</div>
    </Content>
  );
  const div = document.createElement('div');
  document.body.append(div);
  return ReactDOM.render(component, div);
};

const modal = (content: ReactNode | ReactFragment) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div); // 事件销毁，垃圾回收
    div.remove();
  };
  const component = (
    <Content visible={true} onClose={onClose}>
      <div>{content}</div>
    </Content>
  );
  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);
  return onClose;
};

Content.defaultProps = { closeOnClickMask: false };

export { Content, alert, confirm, modal };
