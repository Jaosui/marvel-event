// import liff from '@line/liff/dist/lib'
import React, { ReactElement } from 'react'
import {initId} from '../utils/initLiff'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'
import {saveProfileData} from '../utils/localstorage'
import { Menu, Dropdown, message } from 'antd';
import { LoginOutlined, LogoutOutlined  } from '@ant-design/icons';
import Theme from "../styles/Theme.module.css"


interface Props {
  
}

export default function User({}: Props): ReactElement {
  const [imgUser, setImgUser] = React.useState(null)
  const [UserName, setUserName] = React.useState(null)

  const liffId = '1656481834-Gdg42lxP'

  React.useEffect(() => {
    const initId = async() => {
      const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId });
      } catch (error) {
        console.error('liff init error', error.message)
      }
      if(liff.isLoggedIn()) {
        console.log('เข้าสู่ระบบแล้ว')
        liff.getProfile().then((profileData) => {
          // console.log(profileData);
          const userData = {
            key: '0',
            userId: profileData.userId,
            displayName: profileData.displayName,
            pictureUrl: profileData.pictureUrl
          }
          console.log('userData', userData)
          saveProfileData(userData)
          setImgUser(profileData.pictureUrl)
          setUserName(profileData.displayName)
        }).catch((err: any) => console.error(err));
      } else {
        const profileData = null
        setImgUser(profileData)
        console.log('ยังไม่เข้าสู่ระบบ')
      }
    }
    initId()
  }, [])

  const text = <div><LoginOutlined /></div>

  const login = async () => {
    console.log("login")
    const liff = (await import('@line/liff')).default
    await liff.ready
    liff.login();
  }

  const logout = async () => {
    console.log("logout")
    const liff = (await import('@line/liff')).default
    await liff.ready
    liff.logout();
    localStorage.setItem('User_Profile', JSON.stringify([]));
    location.reload();
  }
  const menuForGuest = (
    <Menu onClick={login}>
      <Menu.Item key="1">
      <div className={Theme.centerHorizonal}>
        <img className="rounded-corners" style={{ background: '#202020'}} alt="logo" src='../user.png' width="35"/>
        <h4 className={Theme.darkText}style={{ margin: '0'}}>Guest </h4>
        <h6  className={Theme.grayThinText} style={{ paddingBottom: '15px'}}>Login and Enjoy special features.</h6>
        <button
          className={Theme.btnLogin}
        >
          Login
        </button>
      </div>
      
      </Menu.Item>
    </Menu>
  )

  const menuForUser = (
    <Menu onClick={logout}>
      <Menu.Item key="1">
        <div className={Theme.centerHorizonal}>
          <Image
              className="rounded-corners"
              loader={myLoader}
              src={`${imgUser}`}
              alt="imgUser"
              width={35}
              height={35}
            />
          <h4 className={Theme.darkText} style={{ paddingBottom: '15px'}}>{UserName} </h4>
          <button
            className={Theme.btnLogin}
          >
            Logout
          </button>
          {/* <h3><LogoutOutlined  /> Logout</h3> */}
        </div>
        
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      {imgUser ?
      <div style={{ paddingTop: '15px'}}>
        <Dropdown  overlay={menuForUser} placement="bottomRight">
          <Image
            className="rounded-corners"
            loader={myLoader}
            src={`${imgUser}`}
            alt="imgUser"
            width={35}
            height={35}
          />
        </Dropdown>
      </div>:
      <div>
        <Dropdown key='2' overlay={menuForGuest} placement="bottomRight">
          <img className="rounded-corners" alt="logo" src='../user.png' width="35"/> 
        </Dropdown>
      </div>
      }
    </>
  )
}
