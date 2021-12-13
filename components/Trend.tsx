import React, { ReactElement } from 'react'
import { Row, Col, Button } from 'antd'
import Theme from '../styles/Theme.module.css'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'

interface Props {
  index: number
}

export default function Trend({ index }: Props): ReactElement {
 
  return (
    <div>
      <Row style={{ background: '#ec1d24'}}  justify="center" > 
        <Col span={12} >
          <div style={{  margin: " 6px auto 0", background: '#ec1d24'}} className={Theme.centerHorizonal}>
            <Image
              loader={myLoader}
              src={`http://i.annihil.us/u/prod/marvel/i/mg/6/40/51099f1f3d12d.jpg`}
              alt="The Thanos Imperative"
              width={500}
              height={500}
            />
          </div>
        </Col>
        <Col span={12} >
          <div className={Theme.centerVertical} style={{ padding: '0 2vmax '}}> 
            <h3 className={Theme.darkText}>TRENDING#{index}</h3>
            <h2 className={Theme.lightText}>The Thanos Imperative</h2>
            <h5 className={Theme.lightText}>A realm where death has become extinct bleeds into our reality, and in order to stop it the Guardians of the Galaxy must recruit one of their greatest enemies: Thanos! This six-issue event written by Dan Abnett and Andy Lanning with art by Miguel Sepulveda chronicles if the Marvel Universeâ€™s most notorious murderer will find redemption or doom all that live!</h5>
            <div style={{ textAlign: 'right'}}>
              <Button className= 'buttonText' onClick={() => console.log ('READ MORE')}  danger>READ MORE</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
