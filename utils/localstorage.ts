export const saveProfileData = (values:{}) => {
    console.log(values);// typeof values is obj 
    localStorage.setItem('User_Profile', JSON.stringify(values)); // obj>>>string
  }

export const getProfileData = () => {
  const profileData = JSON.parse( localStorage.getItem('User_Profile') )
  return profileData
}