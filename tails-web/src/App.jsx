import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Rate } from 'antd';
import Header from '@/components/Header'
import DisplayAllProjects from '@/components/DisplayAllProjects'

function App() {
  return (
    <>
      <Header/>
      <DisplayAllProjects/>
      <div>
        <Rate allowHalf defaultValue={2.5} />
      </div>
    </>
  );
}

export default hot(App)
