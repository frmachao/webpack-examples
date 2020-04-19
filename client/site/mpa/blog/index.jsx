import React from "react";
import ReactDOM from "react-dom";
import { testFun } from "@/common/utils";
import { DatePicker } from "antd";
import styles from "./index.less";

const APP = () => {
  testFun();
  return (
    <div>
      <h1 className={styles.hello}>这是 spa1</h1>
      <DatePicker />
      <h2>{`process.env==ss是生生世世三水世世世生生世${process.env}`}</h2>
    </div>
  );
};

ReactDOM.render(<APP />, document.getElementById("app"));
