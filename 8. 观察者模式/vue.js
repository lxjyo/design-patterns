function setArrayPrototype(data) {
  const originMethods = [
    'push',
    'pop',
    'splice',
    'shift',
    'unshift',
    'sort',
    'reverse',
  ];
  const prototype = Object.create(Array.prototype);
  originMethods.forEach((method) => {
    const origin = data[method];
    const newMethod = function (...args) {
      const result = origin.apply(this, args);
      const ob = data.__ob__;
      let inserted = null;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;
        case 'splice':
          inserted = args.slice(2);
          break;
      }

      // 将新添的元素设置成响应式
      if (inserted) {
        ob.observeArray(inserted);
      }
      // 通知依赖
      ob.dep.notify();
      return result;
    };
    set(prototype, method, newMethod);
  });
  // 修改原型
  Object.setPrototypeOf(data, prototype);
}

function set(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value,
  });
}

class Observer {
  constructor(data) {
    this.dep = new Dep();
    set(data, '__ob__', this);
    if (Array.isArray(data)) {
      // 处理是数组的情况
      setArrayPrototype(data);
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }
  // 将数组的每一项设置成响应式
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i]);
    }
  }
  // 将对象中的每一项设置成响应式
  walk(obj) {
    for (let prop in obj) {
      defineReactive(obj, prop, obj[prop]);
    }
  }
}

function observe(target) {
  if (target !== null && typeof target === 'object') {
    if (!target.__ob__) {
      return new Observer(target);
    }
    return target.__ob__;
  }
}

function defineReactive(data, key, value) {
  const dep = new Dep();
  // 如果是对象，继续设置响应式
  const child = observe(value);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get', key);
      dep.addSub();
      if (child) {
        child.dep.addSub();
      }
      return value;
    },
    set(newVal) {
      console.log('set');
      value = newVal;
      dep.notify();
    },
  });
}

// 管理依赖
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub() {
    if (Dep.target && this.subs.indexOf(Dep.target) < 0) {
      this.subs.push(Dep.target);
    }
  }
  notify() {
    console.log('notify', this.subs);
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

// 订阅者
class Watcher {
  constructor(getter, cb) {
    this.cb = cb;
    this.getter = getter;
    this.get();
  }
  get() {
    Dep.target = this;
    this.value = this.getter();
    Dep.target = undefined;
  }
  update() {
    const oldValue = this.value;
    this.get();
    this.cb(this.value, oldValue);
  }
}

const obj = {
  age: 1,
  name: 'Jessica',
  hobbies: ['read', 'jog', 'sleep'],
  work: {
    location: 'xxx',
  },
};

observe(obj);
// new Watcher(
//   () => {
//     return obj.age;
//   },
//   (age, oldAge) => {
//     console.log(`Jessica age change ${oldAge} -> ${age}`);
//   }
// );

// new Watcher(
//   () => {
//     return obj.work.location;
//   },
//   (location, oldLocation) => {
//     console.log(`location change ${oldLocation} -> ${location}`);
//   }
// );

new Watcher(
  () => {
    return obj.hobbies;
  },
  (hobbies, oldHobbies) => {
    console.log(
      `hobbies change ${oldHobbies.join(',')} -> ${hobbies.join(',')}`
    );
  }
);

// setTimeout(() => {
//   obj.age = 2;
// }, 1000);

// setTimeout(() => {
//   obj.work.location = 'Korea';
// }, 2000);

setTimeout(() => {
  obj.hobbies.push('play');
}, 1000);
setTimeout(() => {
  obj.hobbies.shift();
}, 3000);
