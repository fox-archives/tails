import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Projects from '@/pages/Projects'
import Settings from '@/pages/Settings'

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
              <Projects />
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
