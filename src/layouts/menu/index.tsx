import React, { useState } from 'react';
import classnames from 'classnames';
import { Link } from 'umi';
import Icon from '@/components/icon';

import menu from './menu';

import styles from './index.less';

interface PropsType {
  width?: number;
  location: any;
}

export default (props: PropsType) => {
  const { width = 64, location } = props;
  const { pathname } = location;
  const [searchWords, setSearchWords] = useState('');

  function handleInputChange(e: any) {
    console.log(e.target.value);
    setSearchWords(e.target.value);
  }

  function toSearch(type: string) {
    if (searchWords.trim() === '') {
      return;
    }

    let url = '';
    switch (type) {
      case 'google':
        url = 'https://www.google.com/search?q=' + searchWords;
        break;
      case 'baidu':
        url = 'https://www.baidu.com/s?wd=' + searchWords;
        break;
    }

    window.open(url);
  }

  return (
    <div className={styles.menuNav}>
      <div>
        <ul className={styles.menuList}>
          {menu.list.map(item => {
            const active = pathname.includes(item.url);

            return (
              <li
                className={classnames(
                  styles.menuItem,
                  active ? styles.menuActive : '',
                )}
                key={item.title}
                title={item.title}
              >
                <Link to={item.url}>
                  <Icon className={styles.menuIcon} type={item.icon} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.searchBox}>
        <div className={styles.searchWrap}>
          <div className={styles.searchInput}>
            <input
              type="text"
              value={searchWords}
              placeholder="请输入搜索关键词"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.searchType} onClick={() => toSearch('google')}>
            <Icon type="icongoogle"></Icon>
          </div>
          <div className={styles.searchType} onClick={() => toSearch('baidu')}>
            <Icon type="iconbaidu"></Icon>
          </div>
        </div>
      </div>
    </div>
  );
};
