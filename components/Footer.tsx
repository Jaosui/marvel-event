import React, { ReactElement } from "react";
import { Row, Col, Divider } from "antd";
import Theme from "../styles/Theme.module.css";
import Image from "next/image";
import { myLoader } from "../utils/handleImg";
interface Props {}
export default function Footer({}: Props): ReactElement {
  const [copyright, setCopyright] = React.useState("");

  React.useEffect(() => {
    const copyrightText = async () => {
      const API_URL = "https://gateway.marvel.com:443/v1/public/events";
      const TS = "1564731162583";
      const API_KEY = "6e70a1e22940665344ba83e6af995cd9";
      const HASH = "cfbd637b4bdc3e2a71f0207709daf88b";
      //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
      const AUTHforMarvel_API = `ts=${TS}&apikey=${API_KEY}&hash=${HASH}`;

      const reqUrl = `${API_URL}?${AUTHforMarvel_API}`;
      const reqUrl_res = await fetch(reqUrl);
      const reqUrl_data = await reqUrl_res.json();
      // console.log ('reqUr_data', reqUrl_data)
      const attributionText = reqUrl_data.attributionText;
      setCopyright(attributionText);
    };
    copyrightText();
  }, []);
  const styleSocialLogo = { display: "inline", padding: "5px" };

  return (
    <>
      <div style={{ padding: "20px", background: "#202020" }}>
        <span>
          <Divider
            style={{ borderWidth: 2, borderColor: "#fff", margin: "10px" }}
          ></Divider>
        </span>
        <div className={Theme.centerHorizonal} style={{ padding: "10px" }}>
          <h6 className={Theme.lightText} style={{ margin: "0px" }}>
            Scan the QR code to join with{" "}
          </h6>
          <h6 className={Theme.lightText}>
            <span style={{ color: "#f1545a" }}>Marvel Event</span> Line Official
            Account.
          </h6>
          <img
            src="https://qr-official.line.me/sid/M/924rzahx.png"
            width="100px"
          />
          <h6
            className={Theme.lightText}
            style={{ paddingTop: "10px", margin: "0px" }}
          >
            FOLLOW MARVEL
          </h6>
          <Row>
            <Col span={4}>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://facebook.com/marvel"
                aria-label="follow us on Facebook, opens a new window"
              >
                <img
                  style={styleSocialLogo}
                  alt="fb"
                  src="../SocialMedia/facebook.png"
                  width="40px"
                />
              </a>
            </Col>
            <Col span={4}>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://twitter.com/marvel"
                aria-label="follow us on Twitter, opens a new window"
              >
                <img
                  style={styleSocialLogo}
                  alt="twitter"
                  src="../SocialMedia/twitter.png"
                  width="40px"
                />
              </a>
            </Col>
            <Col span={4}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/marvel/"
                aria-label="follow us on Instagram, opens a new window"
              >
                <img
                  style={styleSocialLogo}
                  alt="instagram"
                  src="../SocialMedia/instagram.png"
                  width="40px"
                />
              </a>
            </Col>
            <Col span={4}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.pinterest.com/marvel/_created/"
                aria-label="follow us on Pinterest, opens a new window"
              >
                <img
                  style={styleSocialLogo}
                  alt="pinterest"
                  src="../SocialMedia/pinterest-social-logo.png"
                  width="40px"
                />
              </a>
            </Col>
            <Col span={4}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.snapchat.com/add/marvelhq"
                aria-label="follow us on Snapchat, opens a new window"
              >
                <img
                  style={styleSocialLogo}
                  alt="snapchat"
                  src="../SocialMedia/snapchat.png"
                  width="40px"
                />
              </a>
            </Col>
            <Col span={4}>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://youtube.com/marvel"
                aria-label="follow us on Youtube, opens a new window"
              >
                <img
                  style={styleSocialLogo}
                  alt="youtube"
                  src="../SocialMedia/youtube.png"
                  width="40px"
                />
              </a>
            </Col>
          </Row>
          <span
            className={Theme.lightText}
            style={{ fontSize: "13px", paddingLeft: "1px" }}
          >
            {copyright}{" "}
          </span>
        </div>
      </div>
    </>
  );
}
