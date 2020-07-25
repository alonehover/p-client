import { history } from 'umi';

export function render(oldRender: any) {
    console.log('%c render', 'color: green');
    oldRender()
}