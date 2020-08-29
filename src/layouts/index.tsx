import React from 'react';

import Menu from './menu';

import styles from './index.less';

export default (props: any) => {
  const showMenu = document.body.clientWidth > 400;
  const { location, routes, match, menuWith = showMenu ? 64 : 0 } = props;
  console.log(match, props);

  return (
    <div style={{ height: '100%' }}>
      {showMenu ? <Menu width={menuWith} location={props.location} /> : null}

      <div className={styles.content} style={{ marginLeft: menuWith }}>
        {/* <div className={styles.head}>
          <div className={styles.headTitle}>导航</div>
          <div className={styles.subHeadTitle}>导航</div>
        </div> */}
        <div className={styles.main}>{props.children}</div>
      </div>
    </div>
  );
};
