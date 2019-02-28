/// <reference path="./type.d.ts" />
interface NumberArray {
    [index: number]: number,
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];

// console.log(fibonacci)

// 在typescript的类型定义中， =>用来表示函数的定义，左边是输入类型，右边是输出类型
// $('dom')

enum Color {Red, Green, Blue = "blue"};
// console.log(Color['blue']);

class Foo {
    public name:any = 'zj'
    protected age:any = '25'
    static hello = 123
    static staticName () {
        console.log('hello', this.hello)
        return 123
    }
    private school = 'zhongbei'
    constructor (name: string, age:any) {
        this.name = name
        this.age = age
    }

    getName () {
        console.log('name:', this.name)
        console.log('school', this.school);
        this.age
        
    }
    
}

const foo = new Foo('zy',123)
console.log(foo);
foo.getName()
