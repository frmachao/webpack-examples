import React from 'react';
import ReactDOM from 'react-dom';
// import styles from './index.less'
import { DatePicker } from 'antd';
const APP = () => {
  return (
    <div>
      {/* <h1 className={styles.hello}>这是 spa1</h1> */}
      <DatePicker/>
      <h2>{`process.env==ss${process.env}`}</h2>
    </div>
  )
}

ReactDOM.render(<APP />, document.getElementById('app')
);