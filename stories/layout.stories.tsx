import * as React from 'react';
import { storiesOf } from '@storybook/react';
import './layout.scss';
import { Layout, Header, Content, Footer, Aside } from '../src';

const stories = storiesOf('LayoutExample', module);

stories.add('first', () => {
  return (
    <Layout>
      <Header className='header'>Header</Header>
      <Content className='content'>Content</Content>
      <Footer className='footer'>Footer</Footer>
    </Layout>
  );
});
stories.add('second', () => {
  return (
    <Layout>
      <Header className='header'>Header</Header>
      <Layout>
        <Aside className='aside'>Aside</Aside>
        <Content className='content'>Content</Content>
      </Layout>
      <Footer className='footer'>Footer</Footer>
    </Layout>
  );
});
stories.add('three', () => {
  return (
    <Layout>
      <Aside className='aside'>Aside</Aside>
      <Layout className='layout'>
        <Header className='header'>Header</Header>
        <Content className='content'>Content</Content>
        <Footer className='footer'>Footer</Footer>
      </Layout>
    </Layout>
  );
});

stories.add('four', () => {
  return (
    <Layout>
      <Header className='header'>Header</Header>
      <Layout>
        <Content className='content'>Content</Content>
        <Aside className='aside'>Aside</Aside>
      </Layout>
      <Footer className='footer'>Footer</Footer>
    </Layout>
  );
});
