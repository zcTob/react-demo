import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'normalize.css';
import 'github-markdown-css/github-markdown.css';
import App from './views/App';
// import * as serviceWorker from './serviceWorker'

ReactDOM.render(React.createElement(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more abou>t service workers: https://bit.ly/CRA-PWA

// tslint:disable-next-line
// serviceWorker.unregister()
