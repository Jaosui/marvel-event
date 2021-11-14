import React, { ReactElement } from 'react'
import Theme from '../styles/Theme.module.css'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'
import { getHeroImg, rankEvents } from '../utils/handleFirebase'
import { eventDetail1 } from '../utils/marveiApi'

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
          // src={
          //   "https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/banner%2F266.jpg?alt=media&token=44f476ff-0203-429e-b98c-2a184fb2a777"
          // }
          src={`${imgPath}`}
          alt="error"
          layout="fill"
        />
      </div>
      
      <div className={Theme.trendIndex}>
        <div style={{whiteSpace: 'nowrap'}}>
          <img style={{display: 'inline', filter: 'drop-shadow(0 0 0.5rem #333)'}} alt="top" src='../new.png' width="50px"/> 
          {/* <div style={{whiteSpace: 'nowrap', display: 'inline', backgroundColor: 'rgba(255, 0, 0, 0.3)'}} className={Theme.trendIndexFont}>
            TOP#{index}
          </div> */}
        </div>
          
      </div>
      {/* <h2 className={Theme.lightText}>error1</h2>
      <h6 className={Theme.lightText}>error1{JSON.stringify(topEvent[0].imgUrl) }</h6> */}
    </div>
  )
}
