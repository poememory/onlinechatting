/// <reference types="node" />
// 防抖函数
function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timerId: NodeJS.Timeout;
  
    return function (...args: Parameters<T>): void {
      clearTimeout(timerId);
  
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

export default debounce;