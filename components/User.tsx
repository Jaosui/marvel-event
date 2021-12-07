// import liff from '@line/liff/dist/lib'
import React, { ReactElement } from 'react'
import {initId, initId1, loginWithLine, logoutWithLine} from '../utils/initLiff'
import Image from 'next/image'
import {myLoader} from '../utils/handleImg'
import {getProfileData, saveProfileData} from '../utils/localstorage'
import { Menu, Dropdown, message } from 'antd';
import { LoginOutlined, LogoutOutlined  } from '@ant-design/icons';
import Theme from "../styles/Theme.module.css"


interface Props {
  
}

export default function User({}: Props): ReactElement {
  const [imgUser, setImgUser] = React.useState(null)
  const [UserName, setUserName] = React.useState(null)
  const [textt, setTextt] = React.useState('')
  // displayName: "เจ้าสุย"
  // key: "0"
  // pictureUrl: "https://profile.line-scdn.net/0hWtKzzgcuCFt2Ax7eHBl3DEpGBjYBLQ4TDjdPPVBRXj9TOxwPSTZAPQRXXzkMYxhaHjEVbQEBX2IP"
  // userId: "U855263712ae17c1b5dfd8e0878776157"

  
  React.useEffect(() => {
    
    const userData = async () => {
      const text = await initId1()
      setTextt(text.toString())
      console.log(text)
      const getUserProfile = getProfileData() || []
      if(getUserProfile.length === 0 || !getUserProfile){
        console.log('[]')
        setImgUser(null)
        setUserName(null)
      } else {
        console.log(getUserProfile)
        setImgUser(getUserProfile[0].pictureUrl)
        setUserName(getUserProfile[0].displayName)
      }
      
    }
    setTimeout(() => {
      userData()
      console.log('setTimeout userData')
    }, 5000);
  }, [])

  // const text = <div><LoginOutlined /></div>

  // const login = async () => {
  //   console.log("login")
    
  //   const liff = (await import('@line/liff')).default
  //   const liffId = '1656481834-Gdg42lxP'
  //   try {
  //     await liff.init({ liffId });
  //   } catch (error) {
  //     console.error('liff init error', error.message)
  //   }
    
  //   await liff.ready
  //   liff.login({ redirectUri: window.location.href });
  // }

  // const logout = async () => {
  //   console.log("logout")
  //   const liff = (await import('@line/liff')).default
  //   await liff.ready
  //   liff.logout();
  //   localStorage.setItem('User_Profile', JSON.stringify([]));
  //   location.reload();
  // }
  const menuForGuest = (
    <Menu onClick={loginWithLine}>
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
    <Menu onClick={logoutWithLine}>
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
          <h3>gg{textt}</h3>
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
      // <div style={{ paddingTop: '15px'}}>
      
        <Dropdown  overlay={menuForUser} placement="bottomRight">
          <Image
            className="rounded-corners"
            loader={myLoader}
            src={`${imgUser}`}
            alt="imgUser"
            width={30}
            height={30}
          />
        </Dropdown>
      :
        <Dropdown key='2' overlay={menuForGuest} placement="bottomRight">
          <img className="rounded-corners" alt="logo" src='../user.png' width="30vw"/> 
        </Dropdown>
      }
    </>
  )
}
