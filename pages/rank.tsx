import React, { ReactElement } from 'react'
import HeadTag from '../component/Header'
import Theme from '../styles/Theme.module.css'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'
import { Grid, Tag } from 'antd';

// import { test3 } from '../utils/handleFirebase';

interface Props {
    
}

export default function rank({}: Props): ReactElement {
  const { useBreakpoint } = Grid;  

  const screens = useBreakpoint();
  console.log(screens)
  if(screens.lg === true){
    console.log('lg')
  }
    return (
      <div >
        <HeadTag/> 
        rank
        Current break point:{' '}
      {Object.entries(screens)
        .filter(screen => !!screen[1])
        .map(screen => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
      </div>
    )
}
