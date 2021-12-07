import React, { ReactElement } from "react";
import Theme from "../styles/Theme.module.css";
import { List, Card } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { myLoader } from "../utils/handleImg";

interface Props {}

export default function Test01({}: Props): ReactElement {
  const router = useRouter();

  const event = {
    id: 332,
    title: "Dead No More: The Clone Conspiracy",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/a/00/57e94a282c8de",
      extension: "jpg",
    },
    start: "2016-10-12 01:00:00",
  };

  const pickEvent = (id: React.Key) => {
    console.log("pickEvent: ", id);
    const eventID = parseInt(id as string, 10);
    console.log(eventID);
    router.push({
      pathname: "/eventDetail/[eventID]",
      query: { eventID: eventID },
    });
  };

  return (
    <div>
      {/* <div className={Theme.content}>
        <div className={Theme.imgWrap}>
          <div className={Theme.imgEff}>
            <img src="http://kuzlog.com/img/2017/02/imgmoeffsrc.jpg" />
          </div>
        </div>
        <p>マウスオーバーしてね</p>
      </div> */}
      
      <Card
        hoverable
        bordered={false}
        style={{ position: "relative", padding: "2px" }}
        bodyStyle={{ border: 0, padding: "0.5vmax 0 0" }}
        cover={
          <Image
            loader={myLoader}
            src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`}
            alt={`${event.title}`}
            width={250}
            height={250}
          />
          // <img alt= {`${event.title}`} src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`} />
        }
        onClick={() => pickEvent(event.id)}
      >
        <div className={Theme.titleText}>{event.title}</div>
        <span className={Theme.dateText}>{event.start.slice(0, 10)}</span>
        {/* <Meta title= {<h3 style={{ margin: '0' }} className={Theme.lightText}>{event.title}</h3>} description={<h4 style={{ textAlign: 'center' }} className={Theme.lightText}>{event.start.slice(0,10)}</h4>} /> */}
      </Card>
    </div>
  );
}
