import * as React from 'react'
import App from '../views/App'
import { StaticRouter } from 'react-router-dom'

export default (url: string, context = {}) => (
    <StaticRouter location={url} context={context}>
        <App />
    </StaticRouter>
)
