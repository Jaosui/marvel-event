import React, { ReactElement } from 'react'
import HeadTag from '../components/Header'
import Image from 'next/image'
import TrendTag from '../components/TrendImg'
import TimelineTag from '../components/Timeline'
import Theme from '../styles/Theme.module.css'
import { Carousel, Card } from 'antd';
import Slider from "react-slick";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getHeroImg, rankEvents } from '../utils/handleFirebase'
import { myLoader } from '../utils/handleImg'

interface Props {
    test: any
    test01: any
    data: any
    attributionText: any
    id: any
    images: any
    startDate_event: any
}

export const getStaticProps: GetStaticProps = async () => {
  const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
  const TS = '1564731162583'
  const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
  const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
  //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
  const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`
  const startDate = `${API_URL}?orderBy=startDate&limit=10&offset=7&${AUTHforMarvel_API}`
  const startDate_res = await fetch(startDate)
  const startDate_data = await startDate_res.json() //object
  const startDate_event = startDate_data.data.results //object


  const test01 = ["ant", "bee", "cat", "dog"]
  return {
      props: { 
        startDate_event: startDate_event
      },// will be passed to the page component as props
    }
}

export default function Index({ test, test01, data, attributionText, id, images, startDate_event }: Props): ReactElement {
  const router = useRouter()

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 10000,
    arrows: false,
    customPaging: function (i) {
      return <div style={{color: 'rgba(246,245,245,0)'}}>{i}</div>;
    },
    dotsClass: "slick-dots slick-thumb"
  };
  React.useEffect(() => {
    getrankData()
    console.log(topEvent)
  }, [])
  const initEvent = [{
    eventId: "0",
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/banner%2F263.jpg?alt=media&token=a38370ef-1b82-4faa-9a41-1404cd538e1d",
    userFav: 0
  },
  {
    eventId: "0",
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/banner%2F263.jpg?alt=media&token=a38370ef-1b82-4faa-9a41-1404cd538e1d",
    userFav: 0
  },
  {
    eventId: "0",
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/banner%2F263.jpg?alt=media&token=a38370ef-1b82-4faa-9a41-1404cd538e1d",
    userFav: 0
  },
  {
    eventId: "0",
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/banner%2F263.jpg?alt=media&token=a38370ef-1b82-4faa-9a41-1404cd538e1d",
    userFav: 0
  },
  {
    eventId: "0",
    imgUrl: "https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/banner%2F263.jpg?alt=media&token=a38370ef-1b82-4faa-9a41-1404cd538e1d",
    userFav: 0
  }]
  const [topEvent, setTopEvent] = React.useState(initEvent);
  const getrankData = async () => {
    const rankData = await rankEvents()
    console.log(rankData)
    const topFive = rankData.filter((item,index) => index < 5)
    console.log(topFive)
    const topRankData = []
    for (const element of topFive) {
      const imgPath = await getHeroImg(element.eventId)
      console.log(imgPath)
      const eventData = {
        eventId: element.eventId,
        imgUrl: imgPath,
        userFav: element.userFav
      }
      console.log(eventData)
      topRankData.push(eventData)
    }
    console.log(topRankData)
    setTopEvent(topRankData)
  }
  const myLoaderFirebase = ({ src }) => {
    return `${src}`;
  };


  return (
      <>
        <HeadTag/>
        {topEvent &&
          <div>
            {/* <h5>{JSON.stringify(topEvent)}</h5> */}
            <Slider {...settings} >
              <div >
                <TrendTag index={1} imgPath={topEvent[0].imgUrl}/>
              </div>
              <div>
                <TrendTag index={2} imgPath={topEvent[1].imgUrl}/>
              </div>
              <div>
                <TrendTag index={3} imgPath={topEvent[2].imgUrl}/>
              </div>
              <div>
                <TrendTag index={4} imgPath={topEvent[3].imgUrl}/>
              </div>
              <div>
                <TrendTag index={5} imgPath={topEvent[4].imgUrl}/>
              </div>
            </Slider>
          </div>
        }
        
        
        <div className={Theme.dark}>
          {/* <h1 className={Theme.lightTextSubHeading} >Top 5</h1> */}
          {/* <Slider {...settings} >
            <div >
              <TrendTag index={1} />
            </div>
            <div>
              <TrendTag index={2}/>
            </div>
            <div>
              <TrendTag index={3}/>
            </div>
            <div>
              <TrendTag index={4}/>
            </div>
            <div>
              <TrendTag index={5}/>
            </div>
          </Slider> */}
          {/* <h1 className={Theme.lightTextBody}>{startDate_event.id}</h1> */}
          {/* <h1 className={Theme.lightTextBody}>{ JSON.stringify(startDate_event.id)}</h1> */}
          <div style= {{padding: '3vmax 0'}}>
            <TimelineTag data={startDate_event}></TimelineTag>
          </div>
        </div>
      </>
  )
}




