import '../styles/globals.css'
import 'antd/dist/antd.css';
import { Divider } from 'antd';
import { useEffect } from 'react';
import Head from 'next/head'
import FooterTag from '../components/Footer'



function MyApp({ Component, pageProps }) {
  // const {  Content, Footer } = Layout;
  

  return (
    <div className='overlay'>
      <Head>
        <title>MARVEL EVENT</title>
        <meta name="description" content="สนุกกับ MARVEL EVENT ได้ทุกที่ทุกเวลา พบกับ EVENT ที่คุญชื่นชอบทุกวัน ได้ที่ MARVEL EVENT" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        <link rel="icon" href="/logo.png" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <Component {...pageProps} />
      <FooterTag/>
    </div>
  )
}

export default MyApp
