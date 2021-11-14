import React, { ReactElement } from "react";
import Theme from "../styles/Theme.module.css";
import { Card, Row, Col } from "antd";
import Image from "next/image";
import Slider from "react-slick";
import { useRouter } from "next/router";

interface Props {
  data: any;
}

export default function Timeline({ data }: Props): ReactElement {
  const router = useRouter();

  const settings = {
    className: "center",
    infinite: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
    <>
      <div style={{ backgroundColor: "#f3f3f3", padding: "10px 20px 15px 20px" }}>
        <h3 className={Theme.darkText}>Events Calendar&emsp;</h3>
        <Slider {...settings}>
          {data &&
            data.map((event: any, index: number) => (
              <div key={index}>
                {/* <h1 className={Theme.lightTextBody}>{event.id} {event.title} {event.thumbnail.path}.{event.thumbnail.extension}</h1> */}
                <Card
                  hoverable
                  bordered={false}
                  style={{ position: 'relative', padding: "2px" }}
                  bodyStyle={{ border: 0, padding: "0.5vmax 0 0" }}
                  cover={
                    <img
                      alt={`${event.title}`}
                      src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                    />
                  }
                  onClick={() => pickEvent(event.id)}
                >
                  <div className={Theme.titleText}>
                      {event.title}
                  </div>
                  <span className={Theme.dateText}>
                    {event.start.slice(0, 10)}
                  </span>
                </Card>
              </div>
            ))}
        </Slider>
      </div>
      <button
        className={Theme.buttonOval}
        onClick={() => router.push("/allEvent")}
      >
        SEE ALL EVENT
      </button>
    </>
  );
}
