/*
 * Author: yuanzhirong
 * Date: 2023-03-31 11:08:01
 * LastEditors: yuanzhirong
 * LastEditTime: 2023-03-31 14:20:57
 * Description:
 */
import React, { useEffect, useState } from "react";
import ReactBScroll from "../ReactBScroll";
import _ from "lodash";
import styles from "./pull.less";

const pageSize = 20;

function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const PullPage = () => {
  const bScrollInstance = React.useRef(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await onPullingDown();
      setTimeout(() => {
        bScrollInstance && bScrollInstance.current?.refresh();
      }, 1000);
    }
    fetchData();
  }, []);

  const fetchList = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (params.page === 0) {
          const data = new Array(20).fill(0);
          const result = data.map((item, index) => {
            return {
              title: `Richard${index + 1}`,
              id: index,
            };
          });
          resolve(result);
        } else {
          const data = new Array(20).fill(0);
          const result = data.map((item, index) => {
            return {
              title: `Richard${guid()}`,
              id: guid(),
            };
          });
          resolve(result);
        }
      }, 1500);
    });
  };

  const onPullingDown = async () => {
    // 下拉刷新
    setLoading(true);
    await fetchList({ page: 0 })
      .then((res) => {
        setList(res);
        setPage(0);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPullingUp = async () => {
    // 上拉加载
    setLoading(true);
    await fetchList({ page: page + 1 })
      .then((res) => {
        const newList = [...list, ...res];
        setList(newList);
        setPage(page + 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>导航栏</div>
      <ReactBScroll
        ref={bScrollInstance}
        showPullUpElement={!(loading || _.isEmpty(list))}
        hasMore={list.length < 100}
        onPullingUp={onPullingUp}
        onPullingDown={onPullingDown}
      >
        <ul>
          {list.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <div>姓名：{item.title}</div>
              <div>编号：{item.id}</div>
            </li>
          ))}
        </ul>
        <div className={styles.footer}></div>
      </ReactBScroll>
      {loading && _.isEmpty(list) ? (
        <div style={{ position: "absolute", top: "100px", left: "50px" }}>
          数据加载中...
        </div>
      ) : null}
    </div>
  );
};

export default PullPage;
