import React, { Component, createRef } from 'react';
import superagent from 'superagent';

import Toast from '@/components/toast';
import Icon from '@/components/icon';

import styles from './index.less';

export default class En_Zh extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      words: '',
      result: [],
      loading: false,
      active: false,
    };
  }

  componentDidMount() {
    document.onkeydown = e => {
      var ev = e || window.event;
      //获取键盘的keyCode值
      var nKeyCode = ev.keyCode || ev.which || ev.charCode;
      //获取ctrl 键对应的事件属性
      var bCtrlKeyCode = ev.ctrlKey || ev.metaKey;

      if (nKeyCode === 13 && bCtrlKeyCode) {
        e.preventDefault();
        this.toQuery();
      }
    };
  }

  render() {
    const { words, result } = this.state;
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

        <div className={styles.resultContent}>
          {result.length ? (
            <div className={styles.translateContent}>
              {result
                .map((item: any) => {
                  if (!item.data) {
                    return '';
                  }

                  return (
                    <div className={styles.translateRow} key={item.name}>
                      <div className={styles.translateRowTitle}>
                        [{item.name}]
                      </div>
                      <div className={styles.translateRowMain}>
                        {item.data.pinyin ? (
                          <div className={styles.translateRowItem}>
                            <div className={styles.translateRowItemLabel}>
                              拼音 :
                            </div>
                            <div>{item.data.pinyin}</div>
                          </div>
                        ) : null}
                        {item.data.basic ? (
                          <div className={styles.translateRowItem}>
                            <div className={styles.translateRowItemLabel}>
                              词典 :
                            </div>
                            <div>
                              {item.data.basic.map(
                                (word: string, index: number) => (
                                  <div key={index}>{word}</div>
                                ),
                              )}
                            </div>
                          </div>
                        ) : null}
                        {item.data.translation ? (
                          <div className={styles.translateRowItem}>
                            <div className={styles.translateRowItemLabel}>
                              翻译 :
                            </div>
                            <div>{item.data.translation}</div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })
                .filter((i: any) => i !== '')}
            </div>
          ) : (
            <div className={styles.placeholderBox}>
              <Icon className={styles.placeholderIcon} type="iconfanyi" />
            </div>
          )}
        </div>
      </div>
    );
  }

  handleInputChange = (e: any) => {
    // console.log(e.target.value);
    this.setState({
      words: e.target.value,
    });
  };

  toQuery = async () => {
    // console.log(this.state.words);
    if (this.state.words === '') {
      Toast.warning('请输入查询内容', 5000);
      return false;
    }

    const hideLoading = Toast.loading('翻译中', 2000);
    const res: any = await superagent
      .post('https://api.t4f.app/translate')
      .send({
        words: this.state.words,
      });

    const { data, code } = res.body;

    if (code !== 0) {
      Toast.error(res.message);
      return false;
    }

    // console.log(res, data);
    this.setState(
      {
        result: data.data,
      },
      () => {
        hideLoading();
      },
    );
  };
}
