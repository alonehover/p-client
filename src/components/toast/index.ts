import noticeDOM from './notice'
import './index.less'
import './icon'

let notification: any = null;
const notice = (type: string, content: string, duration = 2000, onClose?: Function) => {
    if (!notification) notification = noticeDOM
    return notification.addNotice({ type, content, duration, onClose })
}

export default {
    info(content: string, duration?: number, onClose?: Function) {
        return notice('info', content, duration, onClose)
    },
    success(content: string, duration?: number, onClose?: Function) {
        return notice('success', content, duration, onClose)
    },
    warning(content: string, duration?: number, onClose?: Function) {
        return notice('warning', content, duration, onClose)
    },
    error(content: string, duration?: number, onClose?: Function) {
        return notice('error', content, duration, onClose)
    },
    loading(content: string, duration: number = 0, onClose?: Function) {
        return notice('loading', content, duration, onClose)
    }
}