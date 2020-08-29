import React, { Component } from 'react';
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

  return (
    <div className={styles.menuLeft} style={{ width: width }}>
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
  );
};
