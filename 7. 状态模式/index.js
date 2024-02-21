/**
 * 状态模式主要解决的是当控制一个对象状态的条件表达式过于复杂时的情况。
 * 把状态的判断逻辑转移到表示不同状态的一系列类中，可以把复杂的判断逻辑简化。
 */

// - 美式咖啡态（american)：只吐黑咖啡
// - 普通拿铁态(latte)：黑咖啡加点奶
// - 香草拿铁态（vanillaLatte）：黑咖啡加点奶再加香草糖浆
// - 摩卡咖啡态(mocha)：黑咖啡加点奶再加点巧克力

class CoffeeMaker {
  constructor() {
    /**
    这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
  **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = 'init';
  }

  // 可能会用到 state 等其他内容
  stateToProcessor = {
    american() {
      console.log('我只吐黑咖啡');    
    },
    latte() {
      this.american();
      console.log('加点奶');  
    },
    vanillaLatte() {
      this.latte();
      console.log('再加香草糖浆');
    },
    mocha() {
      this.latte();
      console.log('再加巧克力');
    }
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    // // 记录当前状态
    // this.state = state;
    // if (state === 'american') {
    //   // 这里用 console 代指咖啡制作流程的业务逻辑
    //   console.log('我只吐黑咖啡');
    // } else if (state === 'latte') {
    //   console.log(`给黑咖啡加点奶`);
    // } else if (state === 'vanillaLatte') {
    //   console.log('黑咖啡加点奶再加香草糖浆');
    // } else if (state === 'mocha') {
    //   console.log('黑咖啡加点奶再加点巧克力');
    // }

    // //2. 记录当前状态
    // this.state = state;
    // if (state === 'american') {
    //   // 这里用 console 代指咖啡制作流程的业务逻辑
    //   this.americanProcess();
    // } else if (state === 'latte') {
    //   this.latteProcress();
    // } else if (state === 'vanillaLatte') {
    //   this.vanillaLatteProcress();
    // } else if (state === 'mocha') {
    //   this.mochaProcress();
    // }

    // 记录当前状态
    this.state = state;
    // 若状态不存在，则返回
    if(!this.stateToProcessor[state]) {
      return ;
    }
    this.stateToProcessor[state]();
  }
  // americanProcess() {
  //   console.log('我只吐黑咖啡');
  // }

  // latteProcress() {
  //   this.americanProcess();
  //   console.log('加点奶');
  // }

  // vanillaLatteProcress() {
  //   this.latteProcress();
  //   console.log('再加香草糖浆');
  // }

  // mochaProcress() {
  //   this.latteProcress();
  //   console.log('再加巧克力');
  // }
}

new CoffeeMaker().changeState('vanillaLatte');
