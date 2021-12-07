import { saveProfileData } from './localstorage';

const liffId = '1656481834-Gdg42lxP'

export const initId = async() => {
  const liff = (await import('@line/liff')).default
  try {
    await liff.init({ liffId });
  } catch (error) {
    console.error('liff init error', error.message)
  }

    if(liff.isLoggedIn()) {
      console.log('เข้าลิ้งผ่านไลน์ + เข้าสู่ระบบแล้ว')
      liff.getProfile().then((profileData) => {
        // console.log(profileData);
        const userData = [{
          key: '0',
          userId: profileData.userId,
          displayName: profileData.displayName,
          pictureUrl: profileData.pictureUrl
        }]
        console.log('userData', userData)
        saveProfileData(userData)
      }).catch((err: any) => console.error(err));
      // return 'a'
    } else  if(liff.isInClient()){
      console.log('เข้าลิ้งผ่านไลน์ + ยังไม่เข้าสู่ระบบ')
      await liff.ready
      liff.login({ redirectUri: window.location.href });
      // return 'b'
    } else  if(!liff.isInClient()){
      console.log('เข้าลิ้งผ่านexternal browser + ยังไม่เข้าสู่ระบบ')
      // return 'c'
    }
    return liff.isInClient()

  
}

const getUserProfile = async () => {
  const liff = (await import('@line/liff')).default
  liff.getProfile().then((profileData) => {
    // console.log(profileData);
    const userData = [{
      key: '0',
      userId: profileData.userId,
      displayName: profileData.displayName,
      pictureUrl: profileData.pictureUrl
    }]
    console.log('userData', userData)
    saveProfileData(userData)
  }).catch((err: any) => console.error(err));
}

export const initId1 = async () => {
  const liff = (await import('@line/liff')).default
  await liff.init({ liffId });

  if (liff.isInClient()) {
    //เข้าผ่าน liff + หลังจากเรียกคำสั่ง liff.init() ในแต่ละหน้า LIFF จะทำการ Login ให้อัตโนมัติ
    getUserProfile()
    console.log('เข้าลิ้งผ่านไลน์ + เข้าสู่ระบบอัตโนมัติ')
  } else {
    if (liff.isLoggedIn()) {
      getUserProfile()
      console.log('เข้าลิ้งผ่านexternal browser + เข้าสู่ระบบแล้ว')

    } else {
      console.log('เข้าลิ้งผ่านexternal browser + ยังไม่เข้าสู่ระบบ')
    }
  }
  return liff.isInClient()
}
export const loginWithLine = async () => {
  console.log("login")
  const liff = (await import('@line/liff')).default
  try {
    await liff.init({ liffId });
  } catch (error) {
    console.error('liff init error', error.message)
  }
  
  await liff.ready
  liff.login({ redirectUri: window.location.href });
}

export const logoutWithLine = async () => {
  console.log("logout")
  const liff = (await import('@line/liff')).default
  try {
    await liff.init({ liffId });
  } catch (error) {
    console.error('liff init error', error.message)
  }
  await liff.ready
  liff.logout();
  localStorage.setItem('User_Profile', JSON.stringify([]));
  location.reload();
}