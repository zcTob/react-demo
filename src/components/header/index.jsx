import React, { Component } from 'react'
import styles from './index.sass'
import logo from '../../logo.svg'
console.log(styles)

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className='icon'>
          <img src={logo} alt='avatar' />
        </div>
        <div className='name'>清唱小宇宙</div>
        <div className='desc'>这是一个有故事的博客</div>
      </div>
    )
  }
}
