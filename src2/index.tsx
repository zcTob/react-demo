import * as React from "react";
import * as ReactDOM from "react-dom";
import * as styles from './index.scss'
console.log(styles);

interface Props {
    title: string
}

const App = (props: Props) => {
    return <div className={styles['hello']}>{props.title}</div>;
};

ReactDOM.render(<App title="app" />, document.getElementById("root"));
