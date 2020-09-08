import React, { Component } from 'react';
import Http, { CommonAPI } from '@/common/api';
import { debounce } from '@/utils';
import Toast from '@/components/toast';
import styles from './index.less';

export default class Draft extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      words: '',
    };
  }

  componentDidMount() {
    this.getData();

    document.onkeydown = e => {
      var ev = e || window.event;
      //获取键盘的keyCode值
      var nKeyCode = ev.keyCode || ev.which || ev.charCode;
      //获取ctrl 键对应的事件属性
      var bCtrlKeyCode = ev.ctrlKey || ev.metaKey;

      if (nKeyCode === 13 && bCtrlKeyCode) {
        e.preventDefault();
        this.toSave();
      }
    };

    document.onkeyup = debounce(() => {
      this.toSave();
    }, 1000);
  }

  render() {
    return (
      <div className={styles.wrap}>
        <textarea
          value={this.state.words}
          className={styles.content}
          placeholder="临时存放保管处 —— 用于跨设备临时数据传递 (Ctrl + 回车保存)"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }

  handleInputChange = (e: any) => {
    this.setState({
      words: e.target.value,
    });
  };

  async getData() {
    const res = await Http.get(CommonAPI.draft.getVal);
    if (res) {
      this.setState({
        words: res,
      });
    }
  }

  async toSave() {
    const res = await Http.post(CommonAPI.draft.setVal, {
      words: this.state.words,
    });
    Toast.success('保存成功');
  }
}
