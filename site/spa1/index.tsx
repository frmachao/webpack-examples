import React from "react";
import ReactDOM from "react-dom";
import { DatePicker } from "antd";
import styles from "./index.less";

const APP: React.FC = () => {
  // console.log('styles==',styles)
  return (
    <div>
      <h1 className={styles.hello}>这是 spa1</h1>
      <DatePicker />
      <h2>{`process.env==${process.env}`}</h2>
    </div>
  );
};
ReactDOM.render(<APP />, document.getElementById("app"));
