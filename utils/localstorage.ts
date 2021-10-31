export const saveProfileData = (values:{}) => {
    console.log(values);// typeof values is obj 
    localStorage.setItem('User_Profile', JSON.stringify(values)); // obj>>>string
  }

export const saveComment =  (values:string) => {
    console.log(values);// typeof values is obj 
    const userProfile = JSON.parse( localStorage.getItem('User_Profile') ) || []; // string>>>obj
    if (!userProfile) {
        
    }
    localStorage.setItem('User_Profile', JSON.stringify(values)); // obj>>>string
  }
