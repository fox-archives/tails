import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Layout } from 'antd';
import Header from '@/components/Header'
import Content from '@/components/Content'
import Footer from '@/components/Footer'

function App() {
  return (
    <Layout.Content>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Content />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout.Content>
  );
}

export default hot(App)
