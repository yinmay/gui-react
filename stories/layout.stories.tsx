import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Layout, Header, Content, Footer, Aside } from '../src';

const stories = storiesOf('LayoutExample', module);

stories.add('第一个例子', () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
});
stories.add('第二个例子', () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Aside>Aside</Aside>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
});
stories.add('第三个例子', () => {
  return (
    <Layout>
      <Aside>Aside</Aside>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
});
