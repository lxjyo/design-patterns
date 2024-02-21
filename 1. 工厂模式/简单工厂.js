// const liLie = {
//   name: 'Lilie',
//   age: 18,
//   career: 'coder'
// }
// const hanMeiMei = {
//   name: 'hanMeiMei',
//   age: 18,
//   career: 'product manager'
// }


/**
 * 变与不变：
 * 不变的是每个用户都拥有name、age、career这些属性；变化的是每个用户的name、age、career属性的值
 * 
 * 使用构造器本质抽象了每个对象实例的变与不变。
 */
// 使用构造器
class User {
  constructor(name, age, career) {
    this.name = name;
    this.age = age;
    this.career = career;
  }
}

const liLie = new User('Lilie', 18, 'coder');
const hanMeiMei = new User('hanMeiMei', 18, 'product manager');


// function Coder(name , age) {
//   this.name = name
//   this.age = age
//   this.career = 'coder' 
//   this.work = ['写代码','写系分', '修Bug']
// }
// function ProductManager(name, age) {
//   this.name = name 
//   this.age = age
//   this.career = 'product manager'
//   this.work = ['订会议室', '写PRD', '催更']
// }
// function Factory(name, age, career) {
//   switch(career) {
//       case 'coder':
//           return new Coder(name, age) 
//           break
//       case 'product manager':
//           return new ProductManager(name, age)
//           break
// }


/**
 * 工厂模式将创建对象的过程单独封装；实现无脑传参
 */
class Worker {
  constructor(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
  }
}
function Factory(name, age, career) {
  let work;
  switch(career) {
    case 'coder':
      work = 'coding';
      break;
    case 'product manager':
      work = 'product management';
      break;
    default:
      work = 'other';
  }
  return new Worker(name, age, career, work);
}

const coder1 = Factory('Lilie', 18, 'coder');
console.log(coder1);