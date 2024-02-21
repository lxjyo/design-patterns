// 1. 如何才能保证一个类仅有一个实例？
class Singleton {
  static getInstance() {
    // 如果实例不存在，则创建
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    // 否则返回
    return Singleton.instance;
  }
}

// 使用闭包的形式
Singleton.getInstance = (function Singleto2() {
  let instance = null;
  return function () {
    if (!instance) {
      instance = new Singleto2();
    }
    return instance;
  };
})();

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2);

// 2.通用的单例模式方法
function MakeSingleton(func) {
  // 检查func是否为一个构造函数
  if (
    typeof func !== 'function' ||
    !func.prototype ||
    typeof func.prototype !== 'object'
  ) {
    throw new Error('MakeSingleton: func must be a constructor function.');
  }

  let instance;
  return function (...args) {
    if (!instance) {
      instance = new func(...args);
    }
    return instance;
  };
}
