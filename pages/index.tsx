import React, { ReactElement } from 'react'
import HeadTag from '../component/Header'
import TrendTag from '../component/TrendImg'
import TimelineTag from '../component/Timeline'
import Theme from '../styles/Theme.module.css'
import { Carousel, Card } from 'antd';
import Slider from "react-slick";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

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


  return (
      <>
        <HeadTag/>  
        <div className={Theme.dark}>
          {/* <h1 className={Theme.lightTextSubHeading} >Top 5</h1> */}
          <Slider {...settings}>
            <div>
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
          </Slider>
          {/* <h1 className={Theme.lightTextBody}>{startDate_event.id}</h1> */}
          {/* <h1 className={Theme.lightTextBody}>{ JSON.stringify(startDate_event.id)}</h1> */}
          <div style= {{padding: '3vmax 0'}}>
            <TimelineTag data={startDate_event}></TimelineTag>
          </div>
        </div>
      </>
  )
}




