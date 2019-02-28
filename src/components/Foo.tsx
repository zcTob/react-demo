import React from 'react'
import { observer } from 'mobx-react'

interface FooProps {
    num: any
}

@observer
export class Foo extends React.Component<FooProps, {}> {

    handleClick() {
        console.log(this.props.num);

        // this.props.num.addNum()
        this.props.num.changeName('zj')
        // this.props.num.add(2, 4)
    }

    render() {
        return (
            <React.Fragment>
                <div onClick={this.handleClick.bind(this)}>{32131}</div>
                <h3>{this.props.num.name}</h3>
            </React.Fragment>
        )
    }
}