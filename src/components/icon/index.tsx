import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1952715_svxsaamejm8.js',
});

export default (props: any) => {
  return <Icon {...props} />;
};
