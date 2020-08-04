import React, { Component, createRef } from 'react'

import Toast from '@/components/toast'
import Icon from '@/components/icon'

import styles from './index.less';

export default class En_Zh extends Component<any, any> {
    public canvasRef: any
    public canvasWrapRef: any
    constructor(props: any) {
        super(props);

        this.state = {
            words: '',
            result: [],
            loading: false,
            active: false
        }

        this.canvasRef = createRef()
        this.canvasWrapRef = createRef()
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
                this.toQuery();
            }
        }
    }

    render() {
        const { words, result } = this.state
        return (
            <div id="queryWrap" className={styles.flexWrap}>
                <div className={styles.queryBox}>
                    <textarea
                        value={this.state.words}
                        className={styles.queryInput}
                        placeholder="请输入需要翻译的内容...(Ctrl + 回车查询)"
                        onChange={this.handleInputChange}
                    />
                </div>

                <div className={styles.resultContent} ref={this.canvasWrapRef}>
                    {result.length ? (
                        <div>list</div>
                    ) : (
                        <div className={styles.placeholderBox}>
                            <Icon className={styles.placeholderIcon} type="iconfanyi" /> 
                        </div>
                    )}
                </div>
            </div>
        )
    }

    handleInputChange = (e: any) => {
        console.log(e.target.value);
        this.setState({
            words: e.target.value
        })
    }

    toQuery = () => {
        console.log(this.state.words);
        Toast.loading('翻译中', 5000);
    }
}
