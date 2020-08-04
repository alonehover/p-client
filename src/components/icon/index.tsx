import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Icon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1952715_1c00jt4k83h.js'
});

export default (props: any) => {
    return <Icon {...props} />
}
