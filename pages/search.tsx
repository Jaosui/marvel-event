import React, { ReactElement } from "react";
import Theme from "../styles/Theme.module.css";
import { Row, Col, AutoComplete, Input, Divider, Button } from "antd";
import { LeftOutlined, SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { allEvents, searchKeyword } from "../utils/marveiApi";
import { rankEvents } from "../utils/handleFirebase";
import { List, Card } from "antd";
import Image from "next/image";
import { myLoader } from "../utils/handleImg";

interface Props {}

interface Event {
  eventid: number;
  title: string;
  thumbnail: any;
}

export default function Search({}: Props): ReactElement {
  const router = useRouter();

  const [eventObj, setEventObj] = React.useState(null);
  // const { Search } = Input;
  const onSearch = (e: any) => {
    if (e.keyCode == 13) {
      console.log("value", e.target.value);
      const historyKeyword =
        JSON.parse(localStorage.getItem("historyKeyword")) || []; // string>>>obj
      const key = Object.keys(historyKeyword).length;
      historyKeyword[key] = { id: key, keyword: e.target.value };
      console.log("keyadd", key);
      localStorage.setItem("historyKeyword", JSON.stringify(historyKeyword));
      // obj>>>string
      // localStorage.clear()
      // openNotification()
      // router.push('/userData')
      // put the login here
      // console.log(e)
      // searchKeyword(e.target.value)
      getData(e.target.value);
    }
    console.log(e);
  };

  // const options = eventObj

  const options = [
    { value: "Burns Bay Road" },
    { value: "Downing Street" },
    { value: "Wall Street" },
  ];

  const [dataHistory, setDataHistory] = React.useState(null);
  const [rank, setRank] = React.useState([]);
  const [placeholder, setPlaceholder] = React.useState("Mutant Massacre");
  const [totalEvent, setTotalEvent] = React.useState(null);
  React.useEffect(() => {
    // getData()
    getRankData();
    setTimeout(() => {
      getRankData();
      console.log("time");
    }, 5000);
    const historyKeyword =
      JSON.parse(localStorage.getItem("historyKeyword")) || [];
    console.log(historyKeyword);
    console.log("historyKeyword", historyKeyword);
    setDataHistory(historyKeyword);
    localStorage.setItem("historyKeyword", JSON.stringify(historyKeyword));
  }, []);

  const getRankData = async () => {
    const rankData = await rankEvents();
    const topFive = rankData.filter((item, index) => index < 5);
    setRank(topFive);
    console.log(rank);
    Placeholder(topFive);
  };

  const Placeholder = (data) => {
    let counter = 0;
    // if (rank !== []){
    const changePlaceholder = () => {
      //   console.log('full', data)
      //   console.log("ch", counter)
      if (counter >= 5) {
        // console.log('11')
        counter = 0;
      } else if (data[counter] === undefined) {
        // console.log('00')
        counter = 0;
        setPlaceholder("Infinity War");
      } else {
        // console.log("ch", data[counter].eventName, typeof data[counter])
        setPlaceholder(data[counter].eventName);
      }
      // console.log("ch", counter)
      counter++;
    };
    setInterval(changePlaceholder, 50000);
    // }
  };

  const getData = async (value: any) => {
    console.log(value);
    const data = await searchKeyword(value);
    console.log(data.total);
    setEventObj(data.data);
    console.log(data.data);
    setTotalEvent(data.total);
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
    <div className={Theme.dark}>
      <Row>
        <Col span={24}>
          <span>
            <Button
              type="link"
              onClick={() => router.push("/")}
              icon={
                <HomeOutlined style={{ fontSize: "4vw", color: "#fff" }} />
              }
            />
          </span>
        </Col>
      </Row>
      <div className={Theme.centerHorizonal} style={{ background: "#202020" }}>
        <h1 className={Theme.lightTextSubHeading}>What Are You Looking For?</h1>
        <Input
          suffix={<SearchOutlined />}
          style={{ width: "50vw" }}
          allowClear
          placeholder={`${placeholder}`}
          onPressEnter={onSearch}
        />

        {eventObj ? (
          <>
            <Divider
              orientation="left"
              className={Theme.lightTextSubHeading}
              style={{
                margin: "20px 0 1px 0",
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              Results
            </Divider>
            <h6 className={Theme.lightThinText} style={{ textAlign: "left" }}>
              Total : {totalEvent}
            </h6>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 3,
                md: 4,
                lg: 6,
                xl: 6,
                xxl: 3,
              }}
              locale={{
                emptyText: (
                  <div className={Theme.u_cbox_comment_none}>
                    <div>
                      <img src="empty.png" alt="No data" width="80px" />
                    </div>
                    <span className={Theme.u_cbox_comment_none}>No data</span>
                  </div>
                ),
              }}
              dataSource={eventObj}
              rowKey={eventObj.map((item) => item.eventid)}
              renderItem={(event: Event) => (
                <List.Item>
                  <Card
                    hoverable
                    bordered={false}
                    style={{ backgroundColor: "#ec1d24" }}
                    bodyStyle={{ border: 0, padding: "0.5vmax 0 0" }}
                    cover={
                      <Image
                        loader={myLoader}
                        src={`${event.thumbnail.path}/standard_fantastic.${event.thumbnail.extension}`}
                        alt={`${event.title}`}
                        width={250}
                        height={250}
                      />
                    }
                    onClick={() => pickEvent(event.eventid)}
                  >
                    <div
                      style={{
                        margin: "0 1px",
                        textAlign: "center",
                        fontSize: "16px",
                      }}
                      className={Theme.titleLightText}
                    >
                      {event.title}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </>
        ) : (
          <>
            <Divider
              orientation="left"
              className={Theme.lightTextSubHeading}
              style={{
                margin: "20px 0 10px 0",
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              History
            </Divider>
            {/* <h1>{JSON.stringify(dataHistory)}</h1> */}
            {dataHistory === [] ? (
              dataHistory.map((item) => (
                <>
                  <h1 key={item.id} className={Theme.lightTextBody}>
                    {item.keyword}
                  </h1>
                  <Divider
                    style={{
                      margin: "4px 0 2px 0",
                      borderWidth: 1,
                      borderColor: "#5c5c5c",
                    }}
                  />
                </>
              ))
            ) : (
              <div className={Theme.u_cbox_comment_none}>
                <div>
                  <img src="empty.png" alt="No data" width="80px" />
                </div>
                <span className={Theme.u_cbox_comment_none}>No data</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
