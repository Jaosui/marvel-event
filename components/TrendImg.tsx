import React, { ReactElement } from 'react'
import Theme from '../styles/Theme.module.css'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'

interface Props {
  index: number 
  imgPath: string
}

export default function TrendImg({index, imgPath }: Props): ReactElement {
  
  return (
    <div className={Theme.trendContainer}>
      <div className={Theme.imageContainer}>
        <Image
          className={Theme.image}
          loader={myLoader}
          src={`${imgPath}`}
          alt="error"
          layout="fill"
        />
      </div>
      <div className={Theme.trendIndex}>
        <div style={{whiteSpace: 'nowrap'}}>
          <img style={{display: 'inline', filter: 'drop-shadow(0 0 0.5rem #333)'}} alt="top" src='../rank.png' width="80px"/> 
        </div>
      </div>
    </div>
  )
}
