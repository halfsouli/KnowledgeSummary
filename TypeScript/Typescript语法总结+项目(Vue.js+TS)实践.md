<a name="a6dfe4ed"></a>
# 前言

<br />**个人学习的过程** ：<br />阿宝哥的[1.2W字 | 了不起的 TypeScript 入门教程](https://juejin.im/post/6844904182843965453),配合了部分视频食用,最后对知识点系统梳理了一遍<br />慕课网typescript入门视频，主要看一部分语法视频 <br />项目撸的是b站的 Vue.js+TS 项目(对新手非常友好,1小时写完一个项目哈哈哈，项目涉及的内容还是比较全面的)
<a name="QMFGj"></a>
# 语法篇
![dVk8zD.jpg](https://github.com/halfsouli/KnowledgeSummary/blob/master/images/dVk8zD.jpg)<br />

<a name="wda3Z"></a>
## 一、基本类型
| **数据类型** | **关键字/描述** | **用法** |
| --- | --- | --- |
| 数字类型 | number | let decLiteral: number = 6 |
| 布尔类型 | boolean | let flag: boolean = true; |
| 字符串类型 | string | let name: string = "Runoob" |
| 数组类型 | array  | //在元素类型后面加上[]<br />let arr: number[] = [1, 2];<br />//使用数组泛型<br />let arr: Array<number> = [1, 2]; |
| 元组 | 固定元素数量和类型，类型可不一致，但位置必须一样 | let x: [string, number];<br />x = ['Runoob', 1];    // 运行正常<br />x = [1, 'Runoob'];    // 报错<br />console.log(x[0]);    // 输出 Runoob |
| 枚举 | enum/定义数值集合 | enum Color {Red, Green, Blue};<br />let c: Color = Color.Blue;<br />console.log(c);    // 输出 2 |
| void | void/表示该方法没有返回值 | function hello(): void {<br />//没有return 返回值<br />} |
| null | null/对象值缺失 | let n: null = null; |
| undefined | undefined/未定义的值 | let u: undefined = undefined; |
| never | never/never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值 | // 返回never的函数必须存在无法达到的终点ffunction error(message: string): never {   throw new Error(message); } |
| unknown | unknown/unknown类型只能赋值给any类型和unknown类型 | let value: unknown;  <br />let value1: unknown = value; // OK<br />let value2: any = value; // OK<br />let value3: boolean = value; // Error |

<a name="pisYM"></a>
### 补充
<a name="rAufS"></a>
#### enum类型 
映射对应数据<br />**1. 数字枚举**：初始值可自动增长<br />**实际场景**：文章分类有固定的id 这时候就可以使用到枚举去定义
```typescript
enum Category {
  Work,//这里是有默认初始值 为 0 依次增长 
  Life,
  Study,
}
  let cateGoryId: Category =Category.Study
  console.log(cateGoryId)// 2

```
** 2.字符串枚举**<br />定义的成员必须都是字符串<br />比如每个人会取自己的英文名,对应的英文名和真实人名，可以去做一一映射
```typescript
enum Person {
  jack = '小王',
  role = '小蓝',
  Anna = '小红',
}
  let person: Person =Person.Anna
  console.log(person)//小红
```
**3.异构枚举 **<br />异：就是里面成员既有数字又有字符串，大杂炖
```typescript
enum mess {
  jack = '小王',
  role = '小蓝',
  Anna = '小红',
     c = 1,
     b = 2
}
```
<a name="pNTgJ"></a>
## 二、断言
**类型断言必须联合类型中的一种，类型断言只是做类型选择，而不是做类型转换**<br />编译阶段起作用<br />在定义一个变量为联合类型时，要去做判断会遇到以下的情况
```typescript
const unionGetLength2 = (something: string | number): number => {
    if(something.length){ //报错something无法去判断到底时哪个类型
        return something.length;
    } else {
        return something.toString().length;
    }
}

```
可以用断言去处理上面这个类型不能判断的问题，断言有两种写法：

1. as语法
1. 尖括号语法
<a name="UL52N"></a>
### 1. as语法（值 as 类型）
```typescript
const assertionGetLength = (something: string | number): number => {
    if((something as string).length){//告诉TS something 就是字符串类型
        return (something as string).length;
    } else {
        return something.toString().length;
    }
}
```
<a name="AY8TR"></a>
### 2. 尖括号语法（<类型>值）
```typescript
const assertionGetLengthOther = (something: string | number): number => {
    if((<string>something).length){ 告诉ts something就是字符串类型
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```
<a name="Zi73o"></a>
## 三、类型守卫
<a name="za2De"></a>
### 1. 类型守卫
<a name="I2SGF"></a>
#### 1.1 什么是类型守卫
**当遇到条件语句时，会****限制变量类型**

- 类型判断：   ` typeof `
- 实例判断：   `instanceof`
- 属性判断： `in `
- 字面量相等判断：`== `，`===`，`!=`， `!==`
<a name="Xge9Z"></a>
#### 1.2 类型判断（typeof）
```typescript
function test(own: string | boolean | number) {
  if (typeof own == 'string') {
    // 这里 own 的类型限制为 string
  } else if (typeof own == 'number') {
    // 这里 own 的类型限制为 number
  } else {
      // 这里 own 的类型限制为 boolean
  }
}
```
<a name="r5zOF"></a>
#### 1.3 属性判断(in) 
```typescript
interface one {
  name: string;
  speak:string;
}

interface two {
  age: number;
  see:string;
}


function test(own:one | two){
  console.log("Name: " + own.name);
  if ("name" in own) { 
    //这里限制为own 对象为one
    console.log(own.speak);
  }
  if ("see" in own) {
    //这里限制为own限制的对象为two
    console.log(own.see);
  }
}
```
<a name="uH50N"></a>
#### 1.4 实例判断（instanceof）
```typescript
interface  Padder {
  getPaddingString():string
}
class Space implements Padder {
  constructor(private numSpaces: number) {} 
  getPaddingString() {
    return Array(this.numSpaces + 1).join(' ');
  }
}
class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getrandom() {
  return Math.random() < 0.5 ? new Space(4) : new StringPadder('');
}

let padder: Padder = getrandom();

//判断padder是否是Space的实例对象,如果中间有其他值覆盖了，会出现问题
if (padder instanceof Space) {
  //判断后，确保这个值是它的实例对象 padder类型收缩在'SpaceRepeatingPadder'
}
```
<a name="wm8fy"></a>
### 2. 自定义类型守卫
返回布尔值条件函数
```typescript
function isString (own: any): own is string {
  return typeof own === 'string';
}
function test (xdom:any) {
 if (isString(xdom)) {
    	//xdom 限制为 'string'
    } else {
     //其他类型
    }
}
```
<a name="OuGNo"></a>
## 四、联合类型和类型别名
<a name="As19Y"></a>
### 1. 联合类型
**取值可以为多种类型中的一种**<br />特点：1.使用的属性和方法需要类型共有的<br />          2.通常与 `null` 或 `undefined` 一起使用：
```typescript
let stringAndNumber: string | number;
```
<a name="PHQUh"></a>
### 2. 类型别名
类型另一个外号，用**type**定义
```typescript
不用类型别名：
let greet = (message: string | string[]) => {
  // ...
};
用类型别名：
type Message = string | string[];
let greet = (message: Message) => {
  // ...
};
```
<a name="lMZGz"></a>
## 五、交叉类型
同时满足多个类型，多种类型叠加成为一种类型，要包含所需所有类型的特性
```javascript
interface IPerson {
  id: string;
  age: number;
}

interface IWorker {
  companyId: string;
}

type IStaff = IPerson & IWorker;//定义IStaff类型 同时满足这两个接口类型条件

const staff: IStaff = { //staff我i IStaff类型 必须一起满足才可
  id: 'E1006',
  age: 33,
  companyId: 'EFT'
};

console.dir(staff)
```
<a name="mYs2t"></a>
## 六、函数
| TypeScript | JavaScript |
| --- | --- |
| 含类型 | 无类型 |
| 箭头函数 | 箭头函数(ES2015) |
| 函数类型 | 无函数类型 |
| 必填和可选参数 | 所有参数都是可选的 |
| 默认参数 | 默认参数 |
| 剩余参数 | 剩余参数 |
| 函数重载 | 函数重载 |

<a name="qHIbr"></a>
### 1. 普通函数
**可以定义函数的参数类型和返回值**
```javascript
function createUserId(name:string,id:number) {
	return name + id
}
```
<a name="ZCOVY"></a>
### 2. 箭头函数
```javascript
let createUserId:(name:string,id:number)=>string
```
<a name="FzVWM"></a>
### 3. 可选参数
**?表示这个参数是可选的**<br />注意：可选参数要放在普通参数后面，不然会导致编译错误
```javascript
function createUserId(name:string,id:number,age?:number) {
	return name + id;
}
```
<a name="z9wru"></a>
### 4. 默认参数
默认name这个参数的值为Jons
```typescript
function createUserId(name:string = 'Jons',id:number) {
 return name + id;
}
```
<a name="zCIIY"></a>
### 5. 剩余参数
简写，可以把剩余后面写的那些参数一起表示
```typescript
function push(array,...items) {
  console.log(items)
}
push(a,1,2,3) //items是个数组 [1,2,3]
```
<a name="Dd4BV"></a>
### 6. 函数重载
常见的**根据参数的类型执行不同的函数**<br />**多数用于传入不同的参数得到不同的结果**<br />**重载分两个部分：1.声明 2.实现 缺一不可**
<a name="9KTzm"></a>
#### 6.1 重载使用场景
**例1：**<br />例如我们有一个add函数，可以接收string 类型相拼接，也可以接收number类型，相加
```typescript
//声明：
function add (arg1: string, arg2: string): string
function add (arg1: number, arg2: number): number 
//实现,
function add (arg1: string | number, arg2: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2
  }
}
```
注意：如果实现部分没有严格判断，会提示此重载签名与其实现签名不兼容。**函数重载只是多个函数声明，逻辑依旧要自己写，并不会把我们声明的多个函数进行合并**<br /><br /> **例子2** :<br />写个函数test,当传入参数 param 是User时，不传入flag，当传入的param时number时，传入flag<br />下面看看不用重载：
```javascript
interface User {
  name: string;
  age: number;
}

declare function test(param: User | number, flag?: boolean): number;
const user={
name:'Jack',
age:18
}
const res=test(user,false) //虽然不报错，但是与想法违背 当传入的是User是 此时应该不让传入flag
```
**重载解决上诉问题：**
```typescript
interface User{
	name:string;
	age:number;
}
declare function  test(params:User):number;
declare function  test(params:number,flag:boolean):number;
const user={
  name:'jack',
  age:666
};
//类型“{ name: string; age: number; }”的参数不能赋给类型“number”的参数。ts(2345)
const res=test(user,false);
```
**实际项目中的用法：**<br />**有声明之后，需要有具体的实现**
```typescript
interface User{
  name:string;
  age: number;
}
const user:User ={
  name:'jack',
  age:  123
}
class oneClass {
  //声明
  public test(param: User): number;
  public test(param: number, flag: boolean): number;
  //实现
  public test(param: User | number, flag?:boolean) {
    if (typeof param==='number') {
      return param+(flag?1:0)
    }else{
      return param.age
    }
  }
}
```
**如果传入的参数不同，但是得到的结果是一样的，那么重载就意义不大了**<br />重载个人觉得比较繁琐，一些可以用其他方法代替重载，反而更加的简单<br />例如：<br />用**可选参数**来代替
```typescript
function func (a: number): number
function func (a: number, b: number): number
//代替上面：
function func (a: number, b?: number): number
```
用**联合类型**来代替：
```typescript
function func (a: number): number
function func (a: string): number
//替代上面
function func (a: number | string): number
```
<a name="6bJYG"></a>
## 七、数组
ts在这个过程是类型校验，如果定义该类型，与后面数组对应数据冲突，会提示
```typescript
//不能将类型 “ number ” 分配给类型 “ string ”
let x: number;
let y: number;
let z: string;
let five_array = [0, 1, 2, 3, 4];
[x, y, z] = five_array;
```
<a name="9W7CQ"></a>
### 1. 基本类型的数组
**定义一个只包含数字的数组：**
```typescript
const arr: number[] = [1,2,3]
```
**既存数字又存字符串：**
```typescript
const arr1: (number | string)[] = [1, '2' ,3]
```
<a name="ZKhqh"></a>
### 2. 对象类型数组
```typescript
const objectArr: {name: string, age: number}[] = [{name:'a', age:16}]
```
<a name="Mkm9W"></a>
### 3. 与元组对比
元组本质上也是数组，所以数组上的操作元组也可以去使用 一个数组里面的长度和类型都是固定的时候，就可以使用元祖
```typescript
const teacherinfo2: [string, string, number] = ['zina', 'girl', 18];
//这里是固定长度以及固定了每一个的类型,如果类型不一样会提示
```
<a name="xzOTU"></a>
## 八、接口
接口来**定义对象的类型**
<a name="vuvBt"></a>
### 1. 写法
**1.首字母大写**<br />**2.变量的形状必须和接口的形状保持一致**<br />举个栗子：
```javascript
interface Person {
  name:string
  age:number
}
let jack:Person = { //变量的类型必须和上面是保持一致的
	name:'jack',
     age:18
}
```
<a name="KITvy"></a>
### 2. 可选属性
和数组一样，对象里面的属性是可选的,我们经常需要不一样形状的对象
```typescript
interface Person {
  name:string
  age?:number
}
  let jack:Person = { 
	name:'jack' // age 可以不写
}
```
<a name="Jy378"></a>
### 3. 任意属性
用于不确定属性的数量的场景<br />**确定属性和可选属性都必须符合任意属性的类型**<br />如果不符合如下：
```typescript
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}
//类型“number”的属性“age”不能赋给字符串索引类型“string”。
```
**正确写法：**
```typescript
interface Person {
name:string;
age?:number;
[proppName:string]:any;
}
```
<a name="tugCR"></a>
### 4. 只读属性
有些字段**只能在创建的时候被赋值**，其他时候不允许被更改，可以使用只读属性
```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;
//无法分配到 "id" ，因为它是只读属性
```
<a name="M7Dm6"></a>
## 九、泛型
**类型不明确，但是要求其中一部分或者全部类型是一致的情况**
<a name="O9boc"></a>
### 使用场景
在不知道变量类型的情况下定义： 如果要求first输入的类型，second必须一样 这时候下面这个代码就不能做到了<br />**可以用泛型解决这个的问题**
```typescript
function test（first:any,second:any）{
  return `${first}+${second}`
}
```
**泛型解决：T为自定义的，取ABC都可以**
```typescript
function test<T>（first:<T>,second:<T>）{
  return `${first}+${second}`
}
test<number>(1,1)
test<number>(1,'1')//报错
```
**可以定义一个数组里面的类型**
```typescript
function map<T>(params:T[]){
  return params
}
另一个写法
function map<T>(params:Array<T>){
  return params
}

map<string>([1,'1'])//报错
map<string>(['1','1'])
```
**定义多个泛型：**
```typescript
function test<T,P>(first:T,second:P):T{
 return first  //要求返回值和first 的类型一致
}
test<string,number>('1',1)
test('1',1) //不定义类型也可以，ts会自动推断出该T是string类型和P是number类型
```
<a name="9itd6"></a>
## 十、类
<a name="egqjm"></a>
### 1. 如何定义一个类
```typescript
class Person {
  name = 'dell'
  getName(){
    return this.name;
  }
}
const person = new Person();
console.log(person.getName())//dell 
```
<a name="7slv9"></a>
### 2. 类的继承
```typescript
class Person {
  name = 'dell'
  getName(){
    return this.name;
  }
}
class Teacher extends Person {
  getTeacherName(){
    return 'teacher'
  }
}
const teacher = new Teacher(); //声明的teacher实例里面 既有getName方法 又有getTeacherName
console.log(teacher.getName()); //dell
console.log(teacher.getTeacherName()) //teacher
```
<a name="flxRC"></a>
### 3. 类的重写和super
在继承了父类方法之后，可以子类方法里面去重写父类的方法<br />**注意：覆盖了之后，还需调用父类的方法，可以用 **`super` **去调用**
```typescript
class Person {
  name = 'dell'
  getName(){
    return this.name;
  }
}
class Teacher extends Person {
  getTeacherName() {
    return 'teacher';
  }
  getName() {
    return 'lee';
  }
}
console.log(teacher.getName());//lee 这个时候子类的getName把父类的getName给覆盖了
// 如果Teacher 写成如下
class Teacher extends Person {
  getTeacherName() {
    return 'teacher';
  }
  getName() {
   // super.getName()//调用的是父类的方法
    return 'lee' + super.getName();
  }
}
```
<a name="a3gr8"></a>
### 4. 访问类型
<a name="MygLO"></a>
#### 4.1 private 私有的
**允许在类内被使用**<br />首先明确什么是类内，什么是类外
```typescript
class Person {
 private name = 'dell'
  getName(){
   console.log(this.name)//类内 可以被调用
  }
}
const person = new Person()
console.log(person.name) //这个是类外 报错
```
<a name="kD32p"></a>
#### 4.2 protected 被保护的
**允许在类内及继承的子类中使用**
```typescript
class Person {
 protected name = 'dell'
  getName(){
   console.log(this.name)//类内 可以被调用
  }
}
class Teacher extends Person {
  getTeacherName() {
   console.log(this.name)//继承了父类的name 允许被调用
  }
}

```
<a name="X1Sf4"></a>
#### 4.3 public 公共的
**允许我在类内外被调用，不写的情况默认就是public**
```typescript
class Person {
  name = 'dell'//默认前面都是public name
  getName(){ //默认前面都是public getName
   console.log(this.name)
  }
}
const person = new Person()
console.log(person.name)
```
<a name="lpdBT"></a>
### 5. constructor 构造函数
**new 实例的时候 这个瞬间 constructor()被会马上执行**
```javascript
传统写法：
class Person {
  public name:string
  constructor(name:string){
    this.name=name
 }
}
const person =new  Person('dell')
console.log(person.name)
可以简化为：
class Person {
  constructor(public name: string) {
  }
}
```
**继承中父子构造器冲突的情况：**<br />继承之后 如果父类有构造器 子类也有构造器的时候 **子类必须调用父类的构造函数。还必须按照父类的构造器的要求把参数传入**
```javascript
class Person{
constructor(public name:string){

}
}
class Teacher extends Person{
  constructor(public age:number){
    super('dell')
  }
}
const teacher =new Teacher(28)
console.log(teacher.age)//28
console.log(teacher.name)//dell
```
<a name="1KRkl"></a>
### 6. getter和setter
**举个栗子：**<br />假设某类有一个私有变量，但是又需要向外界去暴露这个私有变量，然后不能被外界知道这个变量的具体情况<br />可以用下面方法实现:<br />这里的getter和setter 可以对变量进行处理加工之后，向外界暴露，外界直接调用get/set的方法去读取更改_name这个属性
```typescript
class Person{
  constructor(private _name:string){
  get name(){
    return this._name+' lee'; //可以将name加密之后暴露出去
  }
  set name(name:string){ //也可以保护变量
    const realName=name.split('')[0]; //对得到的name 进行一个处理
    this._name=realName
  }
}
const person=new Person('dell')
console.log(person.name);//dell lee 不需要括号 
person.name ='dell lee'
```
<a name="d2F5r"></a>
### 7. 例子(单例模式)
永远只生成一个实例，当发现 instance 已经创建了之后,就不再创建实例了
```typescript
class Demo{
  private static instance:Demo 
  private constructor(public name:string){}// 不允许被调用 规避创建实例的情况
  static getInstance(){
    if(!this.instance){ //如果没有创建  创建让instance储存
    this.instance = new Demo('dell lee')
  }
    return this.instance;
  }
  
}
const demo1 =Demo.getInstance();
```
<a name="7dk0b"></a>
### 8. 抽象类
**主要是把有共性的部分去做一个封装**<br />**抽象类只能被继承  不能被 new **<br />抽象类的用法 extends 子类如果继承了父类的抽象类之后，必须在子类里面去实现父类的抽象方法<br />举个栗子：算长方形，圆形 椭圆的面积 直接写 class 那么每个 class   下面都需要写这个方法，这个方法可以被提取出来写在抽象类里，再长方形，圆形，椭圆都去继承这个抽象类，各个形状的面积计算公式是不一样的，具体实现在自己的类里面去写<br />**具体写法：**
```javascript
abstract class Geom{ //abstract 去定义一个抽象类
  getType(){
    return 'gemo';
  }
  abstract getArea():number //抽象方法 没有具体实现
}
class Circle extends Geom{
  private r:number
getArea(){
  return '123'
}

}
class Square extends Geom{
getArea(){
  return 'hello'
}
}
class Triangle extends Geom{
getArea(){
  return ''
}
}
```
<a name="EY7Oy"></a>
## 十一、装饰器
<a name="i4oUQ"></a>
### 1. 什么是装饰器
修饰的工具<br />装饰器**本身是一个函数**
<a name="6Ed9e"></a>
### 2. 装饰器种类

- 类的装饰器
- 方法的装饰器
- 访问器的装饰器
- 属性的装饰器
- 参数的装饰器
<a name="bbzi0"></a>
### 3. 类的装饰器
<a name="JJgKp"></a>
#### 3.1 如何写一个装饰器
通过`@`符号来使用,不能直接使用装饰器，在标准里面属于实验性质的语法，需要在 tsconfig.json 文件中把配置项打开<br />![dVk0FP.png](https://s1.ax1x.com/2020/08/16/dVk0FP.png)<br />
![dVkBJf.png](https://s1.ax1x.com/2020/08/16/dVkBJf.png)
```typescript
function testDecorator(constructor:any){
  constructor.prototype.getName = () =>{
    console.log('dell')
  }
  console.log('decorator')
}
@testDecorator
class Test{}//运行时机 会在类创建好之后,立马执行


const test = new Test();
```
<a name="iGQSN"></a>
#### 3.2 多个装饰器的执行顺序
收集的时候是从上到下依次收集<br />但是**执行的时候会从下到上**
```typescript
function testDecorator1(constructor:any){
  console.log('decorator1')
}
function testDecorator2(constructor:any){
  console.log('decorator2')
}
@testDecorator1
@testDecorator2
class Test{}
//控制台：
//decorator2
//decorator1
```
<a name="PCwh8"></a>
#### 3.3 装饰器包装
有时候装饰器里面会存在一些判断，可以用工厂模式去包装装饰器，里面返回一个函数
```typescript
function testDecorator(flag:boolean){ //接收装饰器的参数
  if (flag) {
    return function (constructor: any) {
      constructor.prototype.getName = () => {
        console.log('dell');
      };
      console.log('decorator');
    };
  }else{
    return function (constructor: any) {}
  }
 
  
}
@testDecorator(false)//装饰器返回的是一个函数，然后再调用该函数
class Test{}
```
<a name="NfBJL"></a>
### 4. 方法装饰器
方法装饰器接收三个参数

- **targe**：普通方法, target 对象的是类的 prototype ，如果是静态方法 target对应的是类的构造函数
- **key**：普通方法 key 装饰的方法的名字
- **descriptor：**属性描述符
```typescript
function getNameDecorator(target:any,key:string,descriptor:PropertyDecorator){
  console.log(target, key, descriptor);
};
```
在创建完实例之后，对方法进行修改，如何让方法不被修改呢？如何让方法的原始值进行修改？<br />可以用 `descriptor`去控制
```typescript
function getNameDecorator(target:any,key:string,descriptor:PropertyDescriptor){
  console.log(target, key, descriptor);
  descriptor.writable=false //方法不允许被修改
  descriptor.value = function() { //让方法里面返回的原始值进行修改
    return 'yeyeyeye'
  }
};
class Test{
  name:string;
  constructor(name:string){
    this.name=name;
  }
  @getNameDecorator
  getName(){ //class创建好之后，立刻对方法做一个装饰
    return this.name
  }
}
const test =new Test ('dell')
test.getName=()=>{ //error
  return '123'
}

```
<a name="DX5Os"></a>
### 5. 访问器的装饰器
访问器的装饰器接收的参数和方法装饰器是一样的<br />访问器装饰器接收三个参数

- **targe**：普通方法,target 对象的是类的prototype，如果是静态方法 target对应的是类的构造函数
- **key**：普通方法 key 装饰的方法的名字
- **descriptor：**属性描述符

给set去写一个装饰器：
```typescript
function visitDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  console.log(target, key, descriptor);
  descriptor.writable = false; //方法不允许被修改
};
class Test{
private  _name:string;
  constructor(name:string){
    this._name=name;
  }
  get name() {
    return this._name;
  }
  @visitDecorator
  set name(name:string){
    this._name = name;
  }
}
const test =new Test ('dell')
test.name = '123123' //走的是 set 方法 会报错 set 上面的装饰器写了descriptor.writable = false 方法不允许被修改
console.log(test.name) //走的是 get 方法
```
<a name="lIzPl"></a>
### 6. 属性的装饰器
属性装饰器接收两个参数

- **targe**：普通方法, target 对象的是类的 prototype，如果是静态方法 target 对应的是类的构造函数
- **key**：被修饰的属性名

可以自己定义`descriptor` 返回 新的`descriptor` 可以去覆盖原始 name 的`descriptor`<br />比如下面：name 是可以进行修改的，自己定义`descriptor` 将 writable 更改成 false 之后 将不能被修改了
```typescript
function nameDecorator(
  target: any,
  key: string,
):any{
  console.log(target, key);
  const descriptor :PropertyDescriptor ={
    writable:false
  }
  return descriptor;
};
class Test{
 name:string='dell';
}
const test =new Test ()
test.name = '123123'
```
<a name="n5B1P"></a>
### 7. 参数的装饰器
参数装饰器接收三个参数

- **targe**：原型
- **method**：方法名
- **paramIndex**：参数所在的位置
```typescript
function paramDecorator(target: any, method: string,paramIndex:number): any {
  console.log(target, method, paramIndex); //原型 getinfo 0
};
class Test{
 getinfo(@paramDecorator name:string,age:number){
   console.log(name,age)
 }
}
const test =new Test ()
test.getinfo('dell',30)
```
<a name="PChS2"></a>
# Vue.js+TS项目实践
<a name="1o9nB"></a>
### 1.项目环境搭建
```typescript
npm i -g @vue/cli //安装 vue 脚手架
vue create vueAddts //创建 vue 项目
vue add @vue/typescript //创建 @vue/typescript
npm i vuex  //安装 vuex
```
<a name="nqEVh"></a>
### 2.Vuejs版与Vuejs+TS版区别
**TS版:**需要先去导入两个组件 Component ,  Vue <br />**Component**组件注解，用来注册组件<br />**vue-property-decorator** 属性装饰器<br />**如下：**
```typescript
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ResList from '@/components/ResList.vue'

@Component({
  components: {
    ResList
  }
})
export default class extends Vue {}
```
**Vue版**：对象的方式去描述整个vue
```javascript
<script>
export default {
  name: "App",
  data(){
  return{}
  }
};
</script>
```
<a name="k3nBH"></a>
### 3.项目地址
项目跟着TS+Vue.js视频写的一个标签应用，对新手非常友好，强烈推荐小伙伴去看~<br />功能：对标签添加删除分类修改<br />![dVe3KU.png](https://s1.ax1x.com/2020/08/16/dVe3KU.png)<br />感兴趣的可以点击这[项目链接](https://gitee.com/halfsouli/vue-ts-tag)查看 
<a name="iw5dK"></a>
### 4.了不起的 tsconfig.json 指南
  写项目的时候没有太关注这边,所以贴大佬链接,想看的小伙伴转场啦~
  [了不起的 tsconfig.json 指南](https://juejin.im/post/6844904178234458120)<br />
# 叨叨时间
学习时间大概花了4天左右，前面一部分时间自己的注意力非常不集中，一会看TS，又一会看其他的知识点，导致浪费了挺多时间的，非常没有效率QAQ ，童鞋们要以此为戒，集中时间，规划模块学习~<br />第一次写这么长的文章，太难了，不知道有没有捡到了我的肝，麻烦请还给我，蟹蟹~<br />作为一个资深注水大师，技术菜的抠脚贴图仔，放以前绝对不会相信我能写这么长，以前最多贴贴代码，加几行字完事了<br />[![dVEtUI.th.jpg](https://s1.ax1x.com/2020/08/16/dVEtUI.th.jpg)](https://imgchr.com/i/dVEtUI)<br />就是面试很尴尬，放自己博客吧，的放在犄角旮旯里，太水了，怕被喷哈哈哈。要是不放吧，又不甘心，就是这么的矛盾。<br />非常感谢阿宝哥和师父的指引，洗心革面，争取以后不那么注水了~ 。<br />
点个赞再走吧~~₍₍Ϡ(੭•̀ω•́)੭✧⃛
<a name="nZCgf"></a>
# 参考文章
[如何编写 Typescript 声明文件](https://juejin.im/post/6844903693226082318#heading-8)<br />[1.2W字 | 了不起的 TypeScript 入门教程](https://juejin.im/post/6844904182843965453)<br />

