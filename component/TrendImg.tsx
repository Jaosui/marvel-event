import React, { ReactElement } from 'react'
import Theme from '../styles/Theme.module.css'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'

interface Props {
  index: number 
}

export default function TrendImg({index }: Props): ReactElement {
  return (
    <div className={Theme.trendContainer}>
      <Image
        className={Theme.trendImg}
        loader={myLoader}
        src={'https://i.annihil.us/u/prod/marvel/i/mg/6/90/51c472f43fb49.jpg'}
        alt="Other - Evolve or Die"
        width={1920}
        height={600}
      />
      <div className={Theme.trendIndex}>
        <div style={{whiteSpace: 'nowrap'}}>
          <img style={{display: 'inline'}}alt="top" src='../medal.png' width="30px"/> 
          <div style={{whiteSpace: 'nowrap', display: 'inline'}} className={Theme.trendIndexFont}>
            TOP#{index}
          </div>
        </div>
          
         
      </div>
    </div>
  )
}
