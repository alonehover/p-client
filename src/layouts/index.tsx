import React from 'react'

import Menu from './menu';

import styles from './index.less';

export default (props: any) => {
  const menuWith = 64;
  const { location, routes, match } = props
  console.log(match, props);

  return (
    <div style={{ height: '100%' }}>
      <Menu width={menuWith} location={props.location} />

      <div className={styles.content} style={{marginLeft: menuWith}}>
        {/* <div className={styles.head}>
          <div className={styles.headTitle}>导航</div>
          <div className={styles.subHeadTitle}>导航</div>
        </div> */}
        <div className={styles.main}>
          { props.children }
        </div>
      </div>
    </div>
  );
}