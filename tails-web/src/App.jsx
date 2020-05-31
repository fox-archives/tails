import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '@/components/Header'
import Content from '@/components/Content'
import Settings from '@/pages/Settings'
import Footer from '@/components/Footer'

function App() {
  return (
    <Router>
      <Layout.Content>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <Route exact path="/">
              <Content />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout.Content>
    </Router>
  );
}

export default hot(App)
