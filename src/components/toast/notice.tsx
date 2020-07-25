import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class Notice extends Component<any, any> {
    public transitionTime: number

    constructor(props: any) {
        super(props)
        this.transitionTime = 300
        this.state = { 
            notices: []
        }
    }

    getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    addNotice(notice: any) {
        const { notices } = this.state
        notice.key = this.getNoticeKey()
        if (notices.every((item: any) => item.key !== notice.key)) {
            if (notices.length > 0 && notices[notices.length - 1].type === 'loading') {
                notices.push(notice)
                setTimeout(() => {
                    this.setState({ notices })
                }, this.transitionTime)
            } else {
                notices.push(notice)
                this.setState({ notices })
            }
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.removeNotice(notice.key)
                }, notice.duration)
            }
        }
        return () => {
            this.removeNotice(notice.key)
        }
    }

    removeNotice = (key: any) => {
        const { notices } = this.state
        this.setState({
            notices: notices.filter((notice: any) => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
                    return false
                }
                return true
            })
        })
    }

    render() {
        const { notices } = this.state

        const icons: any = {
            info: 'icon-info-circle-fill',
            success: 'icon-check-circle-fill',
            warning: 'icon-warning-circle-fill',
            error: 'icon-close-circle-fill',
            loading: 'icon-loading'
        }

        return (
            <TransitionGroup className="toast-notification">
                {notices.map((notice: any) => (
                    <CSSTransition
                        key={notice.key}
                        classNames="toast-notice-wrapper notice"
                        timeout={this.transitionTime}
                    >
                        <div className={`toast-notice ${notice.type}`}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref={`#${icons[notice.type]}`} />
                            </svg>
                            <span>{notice.content}</span>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        )
    }
}

function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref: any = React.createRef()

    ReactDOM.render(
        <Notice ref={ref} />, div
    )
    
    return {
        addNotice(notice: any) {
            return ref.current.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

export default createNotification()