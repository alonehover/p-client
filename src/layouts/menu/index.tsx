import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'umi';
import Icon from '@/components/icon'

import styles from './index.less'

interface PropsType {
    width?: number;
    location: any
}

export default (props: PropsType) => {

    const { width = 64, location } = props
    const { pathname } = location

    console.log(location)

    const menu = [{
        title: '导航', icon: 'iconlink',
        url: '/tool/home'
    }, {
        title: '翻译', icon: 'iconfanyi2',
        url: '/tool/en'
    }, {
        title: '草稿', icon: 'iconjiantieban',
        url: '/tool/draft'
    }, {
        title: 'TODO', icon: 'icontodo',
        url: '/tool/todo'
    }]

    return (
        <div className={styles.menuLeft} style={{width: width}}>
            <ul className={styles.menuList}>
                { menu.map(item => {
                    const active = location.pathname.includes(item.url)
                    return (
                        <li className={classnames(styles.menuItem, active ? styles.menuActive : '')} 
                            key={item.title}
                            title={item.title}
                        >
                            <Link to={item.url}>
                                <Icon className={styles.menuIcon} type={item.icon} /> 
                            </Link>
                        </li>
                    )
                }) }
            </ul>
        </div>
    )
}
