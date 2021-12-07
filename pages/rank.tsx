import React, { ReactElement } from 'react'
import HeadTag from '../components/Header'
import Theme from '../styles/Theme.module.css'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'
import { useRouter } from 'next/router'
import { Row, Col, Grid, Tag, List } from 'antd';
import { getHeroImg, rankEvents } from '../utils/handleFirebase'
import { HeartOutlined, HeartFilled  } from '@ant-design/icons';
import { eventDetail1 } from '../utils/marveiApi'
// import { test3 } from '../utils/handleFirebase';

interface Props {
    
}

export default function Rank({}: Props): ReactElement {
  const { useBreakpoint } = Grid;  
  const router = useRouter()

  const [imgPath, setImgPath] = React.useState('')
  const [rankEventId, setRankEventId] = React.useState([])

  const screens = useBreakpoint();
  console.log(screens)
  if(screens.lg === true){
    console.log('lg')
  }
  React.useEffect(() => {
    getrankData()
  }, [])

  const getrankData = async () => {
    const rankData = await rankEvents()
    console.log(rankData)
    const topRankData = []
    for (const element of rankData) {
      const eventDetail = await eventDetail1(element.eventId)
      const eventData = {
        eventId: element.eventId,
        eventTitle: eventDetail[0].title,
        thumbnail: eventDetail[0].thumbnail,
        userFav: element.userFav
      }
      // console.log(eventData)
      topRankData.push(eventData)
    }
    console.log(topRankData)
    setRankEventId(topRankData)
  }

  const test4 = () => {
    // const eventId = 116
    // const getImgPath = await getHeroImg(eventId)
    // console.log('getImgPath', getImgPath)
    // setImgPath(getImgPath)
  }

  const pickEvent = (id: React.Key) => {
    console.log('pickEvent: ', id)
    const eventID = parseInt(id as string, 10)
    console.log(eventID)
    router.push({
      pathname: '/eventDetail/[eventID]',
      query: { eventID: eventID },
    })
  }
  
  const data = rankEventId

  return (
    <div >
      <HeadTag/> 
      <div className={Theme.dark}>
      <h2 className={Theme.lightText}>Today&apos;s ranking</h2>
       <List
       grid={{
       gutter: 16,
       xs: 1,
       sm: 1,
       md: 2,
       lg: 2,
       xl: 2,
       xxl: 2,
     }}
     locale={{ emptyText: <div className={Theme.u_cbox_comment_none}>
     <div>
       {/* <MessageOutlined style={{ fontSize: '60px', paddingBottom: '10px' }}/> */}
       <img
         src='empty.png'
         alt= "No data"
         width="80px"
       />
     </div>
     <span className={Theme.u_cbox_comment_none}>No data available</span>
   </div>}}
     dataSource={data}
     rowKey={data => data.id}
     renderItem={(event, index) => (
       <List.Item>
         <div className={Theme.favBody}>
           <span className={Theme.flagNumber}>
             {index+1}
           </span>
           <span className={Theme.favImg}>
             <Image
               loader={myLoader}
               src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`}
               alt= {`${event.eventTitle}`}
               width={80}
               height={80}
             />
           </span >
           <div className={Theme.favTitle} >
             {event.eventTitle}
             <p>
               <HeartFilled style={{ fontSize: '12px', color: '#ec1d24'}} />
               <span className={Theme.favNum}>{event.userFav}</span>
             </p>
           </div>
         </div>
       </List.Item>
     )}
   />
      </div>
    </div>
  )
}
