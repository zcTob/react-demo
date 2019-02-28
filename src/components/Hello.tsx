import * as React from 'react'
import { observable, computed, action, inject } from 'mobx';
import { observer } from 'mobx-react';
import { Foo } from './Foo'


class Num {
    @observable name = 'zy'
    // @observable num = 0;
    // @computed get getLog() {
    //     console.log('getnum', this.num)
    //     return 'zy' + this.num
    // }
    // @action
    // addNum() {
    //     this.num++
    // }
    @action
    changeName(name: string) {
        this.name = name
    }
}

var numOp = new Num()

export interface HelloProps {
    compiler: string,
    framework: string,
    age: number,
    like: string[],
    [propName: string]: any
}

interface HelloState {
    [propName: string]: any,
}

@observer
export class Hello extends React.Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props)
        this.state = {
            timer: 1
        }
    }

    handleClick() {

    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <Foo num={numOp}></Foo>
            </div>
        )
    }
}