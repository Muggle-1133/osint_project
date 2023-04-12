import React, { useState } from "react";
import "./loading.css";

const Loading = (props) => {
  const check = props.loading == null ? false : props.loading;

  let ment_list = [
    {
      id: 1,
      ment: "데이터를 불러오는 중입니다.",
    },
    {
      id: 2,
      ment: "데이터 로딩 중 약간의 시간이 걸릴 수 있습니다.",
    },
    {
      id: 3,
      ment: "잠시만 기다려 주세요.",
    },
  ];
  const [ment, setMent] = useState(ment_list[0].ment);
  const [count, setCount] = useState(0);
  let timer = setTimeout(() => {
    if (count < ment_list.length) {
      setMent(ment_list[count].ment);
      setCount(count + 1);
    }
    if (count >= ment_list.length) {
      setMent(ment_list[0].ment);
      setCount(0);
    }
  }, 10000);
  return (
    check && (
      <div
        className="axios-loading"
        style={{ display: props.loading === true ? "block" : "none" }}
      >
        <div className="wrapper">
          <div className="loadingBox">
            <div className="loadingBar">
              <div className="folding-square">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
              </div>
              <p className="loading-text">{ment}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Loading;
