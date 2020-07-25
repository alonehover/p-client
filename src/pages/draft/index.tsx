import React, { Component } from 'react'

import Toast from '@/components/toast'
import styles from './index.less';

export default class Draft extends Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            words: ''
        }
    }

    componentDidMount() {
        document.onkeydown = (e) => {
            var ev = e || window.event; 
            //获取键盘的keyCode值
            var nKeyCode = ev.keyCode || ev.which || ev.charCode;
            //获取ctrl 键对应的事件属性
            var bCtrlKeyCode = ev.ctrlKey || ev.metaKey;

            if(nKeyCode === 13 && bCtrlKeyCode) {
                e.preventDefault();
                this.toSave();
            }
        }
    }

    render() {
        return (
            <div className={styles.wrap}>
                <textarea 
                    className={styles.content} 
                    placeholder="写点儿什么？(Ctrl + 回车保存)"
                    onChange={this.handleInputChange}
                />
            </div>
        )
    }

    handleInputChange = (e: any) => {
        this.setState({
            words: e.target.value
        })
    }

    toSave() {
        console.log('success');
        Toast.success('保存成功');
    }
}
