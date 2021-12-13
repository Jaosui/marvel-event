import React, { ReactElement } from 'react'
import HeadTag from '../components/Header'
import Theme from '../styles/Theme.module.css'
import { List, Modal } from 'antd'
import Image from 'next/image'
import { myLoader } from '../utils/handleImg'
import { allMyFav } from '../utils/handleFirebase'
import { useRouter } from 'next/router'
import { eventDetail1 } from '../utils/marveiApi'
import { HeartFilled  } from '@ant-design/icons';

interface Props {
    
}

export default function MyFav({}: Props): ReactElement {

  const [myFav, setMyFav] = React.useState([]);
  const [isModalLogin, setIsModalLogin] = React.useState(false);

  const router = useRouter()

  const userDataFav = async (userID:string) => {
    const favFirestore = await allMyFav(userID)
    // console.log('Pls>>', favFirestore)
    const events = favFirestore.myFav
    const myFavData = []
    for (const element of events) {
      // console.log(element);
      const eventDetail = await eventDetail1(element)
      myFavData.push(eventDetail[0])
    }
    // console.log(myFavData)
    // setMyFav(favFirestore.myFav)
    setMyFav(myFavData)
  }

  React.useEffect(() => {
      // const userID = 'user5'
      // userDataFav(userID)
      const user = JSON.parse(localStorage.getItem("User_Profile")) || [];
      if(user.length !== 0){
        console.log('เข้าสู่ระบบแล้ว', user)
        // console.log('length', user.length)
        // console.log('userId', user[0].userId)
        setIsModalLogin(false)
        userDataFav(user[0].userId)
      } else{
        console.log('ยังไม่เข้าสู่ระบบ')
        setIsModalLogin(true)
        // console.log(isModalLogin)
      }
    },[]);

    const data = myFav


    const pickEvent = (id: React.Key) => {
      // console.log('pickEvent: ', id)
      const eventID = parseInt(id as string, 10)
      // console.log(eventID)
      router.push({
        pathname: '/eventDetail/[eventID]',
        query: { eventID: eventID },
      })
    }

    const handleOk = () => {
      setIsModalLogin(false);
    };
  
    const handleCancel = () => {
      setIsModalLogin(false);
    };

    const login = async () => {
      console.log("login")
      const liff = (await import('@line/liff')).default
      await liff.ready
      liff.login({ redirectUri: window.location.href });
    }

  return (
    <>
      <HeadTag/>
      <div className={Theme.dark}>
        <div>
            <Modal
              title="Notice"
              visible={isModalLogin}
              onOk={handleOk} onCancel={handleCancel}
              bodyStyle={{padding: '15px 16px'}}
              footer={[
                <button
                  key="1"
                  className={Theme.btnLogin}
                  onClick={login}
                >
                  LOGIN
                </button>
              ]}
            >
              <h5 className={Theme.darkText} style={{textAlign: 'center'}}>
                Login and Enjoy special features.
              </h5>
            </Modal>
          </div>
        <h2 className={Theme.lightText}>My Favorite</h2>
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
       <img
         src='empty.png'
         alt= "No data"
         width="80px"
       />
     </div>
     <span className={Theme.u_cbox_comment_none}>Keep your favorite moments. </span>
   </div>}}
       dataSource={data}
       rowKey={data => data.id}
       renderItem={event => (
         <List.Item>
             <div className={Theme.favBody}>
               <span className={Theme.favImg}>
                 <Image
                 loader={myLoader}
                 src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`}
                 alt= {`${event.title}`}
                 width={80}
                 height={80}
                 />
               </span>
               <div className={Theme.favTitle} >
                 {event.title}
                 <button
                   onClick={() => pickEvent(event.id)}
                   className={Theme.btnReadmore}
                 >
                   Read more
                 </button>
               </div>
               <span className={Theme.favIcon}>
                 <HeartFilled   style={{ fontSize: '25px', color: '#ec1d24'}} />
               </span>
             </div>
         </List.Item>
       )}
     />
      </div>
    </>
  )
}
