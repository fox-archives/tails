import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Rate } from 'antd';
import Header from '@/components/Header'

function App() {
  // Declare a new state variable, which we'll call "count"
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header/>
      <div>
        {/* <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button> */}
        informationdd
        <Rate allowHalf defaultValue={2.5} />
      </div>
    </>
  );
}

export default hot(App)
