import React from 'react';
import { Layout, Header, Content, Footer, Aside } from './layout';
import './layout.scss';

interface IProps extends React.SVGAttributes<SVGElement> {}

const LayoutExample: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div>
      <p>第一个例子</p>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
      <p>第二个例子</p>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Aside>Aside</Aside>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <p>第三个例子</p>
      <Layout>
        <Aside>Aside</Aside>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export { LayoutExample };
