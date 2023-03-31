/*
 * Author: yuanzhirong
 * Date: 2023-03-31 10:22:29
 * LastEditors: yuanzhirong
 * LastEditTime: 2023-03-31 10:50:07
 * Description:
 */
import ReactBScroll from "../ReactBScroll";
import styles from "./simple.less";

const SimplePage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>导航栏</div>
      <ReactBScroll>
        <ul>
          {new Array(20).fill(1).map((item, index) => (
            <li key={index} className={styles.item}>
              {index}
            </li>
          ))}
        </ul>
      </ReactBScroll>
    </div>
  );
};

export default SimplePage;
