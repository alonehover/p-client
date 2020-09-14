export function debounce(fn: any, wait: number): any {
  let callback = fn;
  let timerId: any = null;

  function debounced(this: any) {
    // 保存作用域
    let context: any = this;
    // 保存参数，例如 event 对象
    let args = arguments;

    clearTimeout(timerId);
    timerId = setTimeout(function() {
      callback.apply(context, args);
    }, wait);
  }

  // 返回一个闭包
  return debounced;
}
