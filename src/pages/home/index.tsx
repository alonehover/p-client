import React from 'react';
import Icon from '@/components/icon';

import styles from './index.less';

export default () => {
  const links = [
    { title: '马蜂窝', icon: 'https://www.mafengwo.cn/favicon.ico' },
    { title: '百度', icon: 'https://www.baidu.com/favicon.ico' },
    { title: '知乎', icon: 'https://www.zhihu.com/favicon.ico' },
  ];

  const tabs = ['设计', '视频', '工具', '社区'];
  return (
    <div className={styles.wrap}>
      {/* 分类 */}
      <ul className={styles.linkTabs}>
        {tabs.map(tab => (
          <li className={styles.linkTabItem} key={tab}>
            # {tab}
          </li>
        ))}
      </ul>

      {/* 链接 */}
      <div className={styles.linkListWrap}>
        <div className={styles.linkGroup}>
          <div className={styles.linkGroupTitle}># 设计</div>
          <ul className={styles.linkList}>
            {links.map(link => (
              <li className={styles.linkItem} key={link.title}>
                <div className={styles.linkItemImg}>
                  <img src={link.icon} />
                </div>
                <div className={styles.linkItemWrap}>
                  <div className={styles.linkItemTitle}>{link.title}</div>
                  <div className={styles.linkItemSubTitle}>副标题</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.linkGroup}>
          <div className={styles.linkGroupTitle}># 设计</div>
          <ul className={styles.linkList}>
            {links.map(link => (
              <li className={styles.linkItem} key={link.title}>
                <div className={styles.linkItemImg}>
                  <img src={link.icon} />
                </div>
                <div className={styles.linkItemWrap}>
                  <div className={styles.linkItemTitle}>{link.title}</div>
                  <div className={styles.linkItemSubTitle}>副标题</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 操作 */}
      {/* <div className={styles.action}>
                <Icon type="iconadd" />
            </div> */}
    </div>
  );
};
