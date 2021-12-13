import React, { ReactElement } from "react";
import {
  initId1,
  loginWithLine,
  logoutWithLine,
} from "../utils/initLiff";
import Image from "next/image";
import { myLoader } from "../utils/handleImg";
import { getProfileData } from "../utils/localstorage";
import { Menu, Dropdown } from "antd";
import Theme from "../styles/Theme.module.css";

interface Props {}

export default function User({}: Props): ReactElement {
  const [imgUser, setImgUser] = React.useState(null);
  const [UserName, setUserName] = React.useState(null);

  React.useEffect(() => {
    const userData = async () => {
      const text = await initId1();
      console.log(text);
      const getUserProfile = getProfileData() || [];
      if (getUserProfile.length === 0 || !getUserProfile) {
        setImgUser(null);
        setUserName(null);
      } else {
        setImgUser(getUserProfile[0].pictureUrl);
        setUserName(getUserProfile[0].displayName);
      }
    };
    setTimeout(() => {
      userData();
    }, 5000);
  }, []);

  const menuForGuest = (
    <Menu onClick={loginWithLine}>
      <Menu.Item key="1">
        <div className={Theme.centerHorizonal}>
          <img
            className="rounded-corners"
            style={{ background: "#202020" }}
            alt="logo"
            src="../user.png"
            width="35"
          />
          <h4 className={Theme.darkText} style={{ margin: "0" }}>
            Guest
          </h4>
          <h6 className={Theme.grayThinText} style={{ paddingBottom: "15px" }}>
            Login and Enjoy special features.
          </h6>
          <button className={Theme.btnLogin}>Login</button>
        </div>
      </Menu.Item>
    </Menu>
  );

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
          <h4 className={Theme.darkText} style={{ paddingBottom: "15px" }}>
            {UserName}
          </h4>
          <button className={Theme.btnLogin}>Logout</button>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {imgUser ? (
        <Dropdown overlay={menuForUser} placement="bottomRight">
          <Image
            className="rounded-corners"
            loader={myLoader}
            src={`${imgUser}`}
            alt="imgUser"
            width={30}
            height={30}
          />
        </Dropdown>
      ) : (
        <Dropdown key="2" overlay={menuForGuest} placement="bottomRight">
          <img
            className="rounded-corners"
            alt="logo"
            src="../user.png"
            width="30vw"
          />
        </Dropdown>
      )}
    </>
  );
}
