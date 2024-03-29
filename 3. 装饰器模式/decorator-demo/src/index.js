// 装饰器函数，它的第一个参数是目标类
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 装饰器函数在代码编译时就已经执行了
function funcDecorator(target, name, descriptor) {
  console.log('descriptor: ', descriptor)
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑');
    return originalMethod.apply(this, arguments);
  };
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
  // Button类的相关逻辑
  @funcDecorator
  onClick() {
    console.log('我是Func的原有逻辑');
  }
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator);
const button = new Button();
button.onClick();
