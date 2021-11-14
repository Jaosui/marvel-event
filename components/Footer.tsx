import React, { ReactElement } from 'react'
import { Row, Col, Divider } from 'antd';
import Theme from "../styles/Theme.module.css"
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'
interface Props {
    
}
export default function Footer({}: Props): ReactElement {
  const [copyright, setCopyright] = React.useState("")

  
  React.useEffect(() => {
    const copyrightText = async () => {
      const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
      const TS = '1564731162583'
      const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
      const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
      //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
      const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

      const reqUrl = `${API_URL}?${AUTHforMarvel_API}`
      const reqUrl_res = await fetch(reqUrl)
      const reqUrl_data = await reqUrl_res.json()
      console.log ('reqUr_data', reqUrl_data)
      const attributionText = reqUrl_data.attributionText
      setCopyright(attributionText)
    }
    copyrightText()
  },[])

  return (
    <>
      <div style={{padding: '20px', background: '#202020'}}>
        <span>
          <Divider style={{ borderWidth: 2, borderColor: '#fff', margin: '10px' }}></Divider>
        </span>
        <div className={Theme.centerHorizonal} style={{padding: '10px'}} >
          <h6 className={Theme.lightText}>
          FOLLOW MARVEL
          </h6>
          <h4 className={Theme.lightText}>
          <img style={{display: 'inline', padding: '5px'}} alt="fb" src='../SocialMedia/facebook.png' width="40px"/>
          <img style={{display: 'inline', padding: '5px'}} alt="instagram" src='../SocialMedia/instagram.png' width="40px"/>
          <img style={{display: 'inline', padding: '5px'}} alt="pinterest" src='../SocialMedia/pinterest-social-logo.png' width="40px"/>
          <img style={{display: 'inline', padding: '5px'}} alt="snapchat" src='../SocialMedia/snapchat.png' width="40px"/>
          <img style={{display: 'inline', padding: '5px'}} alt="twitter" src='../SocialMedia/twitter.png' width="40px"/>
          <img style={{display: 'inline', padding: '5px'}} alt="tumblr" src='../SocialMedia/tumblr.png' width="40px"/>
          <img style={{display: 'inline', padding: '5px'}} alt="youtube" src='../SocialMedia/youtube.png' width="40px"/>
          </h4>
          <h6 className={Theme.lightText}>{copyright} </h6>
          {/* <img style={{display: 'inline'}} alt="logo" src='../logo.png' width="100px"/> */}
        </div>
      </div>
      
    </>
  )
}
