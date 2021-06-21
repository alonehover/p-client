import React from 'react';

import Menu from './menu';

import styles from './index.less';

export default (props: any) => {
  const showMenu = true;
  const { location, routes, match, menuWith = showMenu ? 64 : 0 } = props;
  console.log(match, props);

  return (
    <div className={styles.page}>
      {showMenu ? <Menu width={menuWith} location={props.location} /> : null}

      <div className={styles.content}>
        <div className={styles.main}>{props.children}</div>
      </div>
    </div>
  );
};
