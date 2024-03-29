/**
 * 开放封闭原则：对拓展开放，对修改封闭；
 * 软件实体（类、模块、函数）可以扩展，但不可以修改。
 */

// 抽象工厂只约定基本组成，不干活
class MobilePhoneFactory {
  // 提供操作系统的接口
  createOS() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
  }
  // 提供硬件的接口
  createHardWare() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
  }
}

// 具体工厂继承自抽象工厂，完成实现
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS();
  }
  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare();
  }
}

// 定义操作系统这类产品的抽象产品类
class OS {
  controlHardWare() {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
  controlHardWare() {
    console.log('我会用安卓的方式去操作硬件');
  }
}

class AppleOS extends OS {
  controlHardWare() {
    console.log('我会用🍎的方式去操作硬件');
  }
}

// 定义手机硬件这类产品的抽象产品类
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log('我会用高通的方式去运转');
  }
}

class MiWare extends HardWare {
  operateByOrder() {
    console.log('我会用小米的方式去运转');
  }
}

const phone = new FakeStarFactory();
const phoneOs = phone.createOS();
const phoneHardware = phone.createHardWare();
console.log('*********FakeStarFactory*********');
phoneOs.controlHardWare();
phoneHardware.operateByOrder();

class MoonPhoneFactory extends MobilePhoneFactory {
  createOS() {
    return new AppleOS();
  }
  createHardWare() {
    return new MiWare();
  }
}

const moonPhone = new MoonPhoneFactory();
console.log('*********MoonPhoneFactory*********');
moonPhone.createOS().controlHardWare();
moonPhone.createHardWare().operateByOrder();
