import React, { ReactElement } from "react";
import HeadTag from "../../components/Header";
import { useRouter } from "next/router";
import {
  Form,
  Input,
  Card,
  Button,
  Row,
  Col,
  Modal,
  notification,
  Grid,
} from "antd";
import {
  HeartOutlined,
  CommentOutlined,
  MessageOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Image from "next/image";
import Slider from "react-slick";
import { charactersDetail, eventDetail1 } from "../../utils/marveiApi";
import {
  allMyFav,
  deleteFav,
  getData,
  sendData,
  sendFav,
} from "../../utils/handleFirebase";
import { async } from "@firebase/util";
import Theme from "../../styles/Theme.module.css";

interface Props {
  eventDetail: any;
}

interface Comment {
  eventID: number;
  userId: string;
  displayName: string;
  pictureUrl: string;
  comment: string;
  date: string;
  time: string;
}

interface Favorite {
  eventID: number;
  userId: string;
  Myfav: boolean;
  eventName: string;
}

export default function EventID({ eventDetail }: Props): ReactElement {
  const router = useRouter();
  const [event, setEvent] = React.useState(null);
  const [eventID, setEventID] = React.useState(null);
  const [eventName, setEventName] = React.useState(null);
  //profileUser
  const [userId, setUserId] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [imgUser, setImgUser] = React.useState("");
  const [statusMessage, setStatusMessage] = React.useState("");
  //characters
  const [characters, setCharacters] = React.useState(null);
  //comments
  const [comments, setComments] = React.useState(null);
  const [isModalLogin, setIsModalLogin] = React.useState(false);
  const [dateComments, setDateComments] = React.useState("");
  const [timeComments, setTimeComments] = React.useState("");
  //favHeart
  const [favActive, setFavActive] = React.useState(false);

  const liffId = "1656481834-Gdg42lxP";

  // init for comment
  const initId = async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId });
    } catch (error) {
      console.error("liff init error", error.message);
    }
    if (liff.isLoggedIn()) {
      console.log("เข้าสู่ระบบแล้ว");
      const user = JSON.parse(localStorage.getItem("User_Profile"));
      setUserId(user[0].userId);
      setDisplayName(user[0].displayName);
      setImgUser(user[0].pictureUrl);
      setStatusMessage(user[0].statusMessage); //ตัสไลน์
      firstTimeFav(user[0].userId);
    } else {
      const profileData = null;
      setImgUser(profileData);
      // console.log('ยังไม่เข้าสู่ระบบ')
    }
  };

  const eventData01 = async (id) => {
    const event = await eventDetail1(id);
    const charactersData = await charactersDetail(id);
    console.log("event", event);
    console.log("charactersData", charactersData);
    setEvent(event);
    setEventName(event[0].title);
    setCharacters(charactersData);
  };

  React.useEffect(() => {
    if (router.query.eventID) {
      initId();
      const queryID = router.query.eventID; //string
      const id: number = parseInt(queryID as string, 10);
      console.log("getID", id);
      setEventID(id);
      eventData01(id);
      //old-comment
      userComment(id);
      console.log("fav firsttime :", favActive);
      console.log("userId :", userId);
    }
    currentDate();
  }, [router.query]);

  const firstTimeFav = async (userId: string) => {
    const queryID = router.query.eventID; //string
    const id: number = parseInt(queryID as string, 10);
    console.log(userId);
    const favEvent = await allMyFav(userId);
    console.log(favEvent);
    console.log("eventID", id);
    for (const i of favEvent.myFav) {
      console.log(i);
      // truncate the sequence at 1000
      if (i === id) {
        console.log("favไว้แล้วจ้า");
        setFavActive(true);
      }
    }
  };

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const myLoaderFirebase = ({ src }) => {
    return `${src}`;
  };

  const favBtn = () => {
    const userProfile = JSON.parse(localStorage.getItem("User_Profile")) || []; // string>>>obj
    console.log("userProfile", userProfile);
    console.log("fav>>");
    console.log(eventName);
    setFavActive(!favActive);
    console.log("2", favActive);
    // console.log(userId)
    const favData: Favorite = {
      eventID: eventID,
      userId: userId,
      Myfav: !favActive,
      eventName: eventName,
    };
    if (userProfile.length === 0) {
      console.log(userId); //delete in firebase
      setIsModalLogin(true);
      setFavActive(false);
    } else if (favActive === true) {
      console.log(userId);
      console.log("fav false"); //delete in firebase
      deleteFav(favData);
    } else if (favActive === false) {
      console.log(userId);
      console.log("fav true"); ///add in firebase
      sendFav(favData);
    }
  };

  const settings = {
    className: "center",
    infinite: false,
    swipeToSlide: true,
    slidesToShow: 5,
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

  //comments
  const [form] = Form.useForm();

  const userComment = async (eventID: number) => {
    const commentFirestore = await getData(eventID);
    console.log("commentFirestore>>", commentFirestore);
    setComments(commentFirestore);
  };

  const NotifyBlankComment = () => {
    notification["warning"]({
      message: "Notification",
      description: "Please enter any comments.",
    });
  };

  const NotifySuccessComment = () => {
    notification["success"]({
      message: "Notification",
      description: `You're done! your comment has been post on this event.`,
    });
  };

  const currentDate = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const today = new Date();
    const day = today.getDate();
    const month = monthNames[today.getMonth()];
    const years = today.getFullYear();
    const date = month + " " + day + ", " + years;
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    setDateComments(date);
    setTimeComments(time);
  };

  const onFinish = (values: any) => {
    // saveComment(values)
    console.log("Success:", values);
    console.log("values.comment:", values.comment);
    const userProfile = JSON.parse(localStorage.getItem("User_Profile")) || []; // string>>>obj
    console.log("userProfile", userProfile);
    const commentData: Comment = {
      eventID: eventID,
      userId: userId,
      displayName: displayName,
      pictureUrl: imgUser,
      comment: values.comment,
      date: dateComments,
      time: timeComments,
    };
    if (userProfile.length === 0) {
      console.log("notice: Login");
      setIsModalLogin(true);
    } else if (values.comment === undefined) {
      console.log("notice: blank comment");
      NotifyBlankComment();
    } else {
      console.log("notice: save comment");
      currentDate();
      console.log(typeof commentData);
      sendData(commentData);
      setTimeout(() => {
        userComment(eventID);
        console.log("notice: setTimeout");
      }, 500);
      // clearTimeout(id)
      NotifySuccessComment();
      console.log("notice: new comment");
    }
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalLogin(false);
  };

  const handleCancel = () => {
    setIsModalLogin(false);
  };

  const login = async () => {
    console.log("login");
    const liff = (await import("@line/liff")).default;
    await liff.ready;
    liff.login({ redirectUri: window.location.href });
  }

  return (
    <>
      <HeadTag />
      <div className={Theme.dark}>
        {/* descpirtion */}
        {characters ? (
          <div>
            {event &&
              event.map((item, index) => (
                <div key={index}>
                  <Row wrap={true} style={{ background: "#fff" }}>
                    <Col
                      flex="1 0 50%"
                      className="columnFlex"
                      style={{ background: "transparent" }}
                    >
                      <div
                        style={{
                          margin: " 6px auto 0",
                          background: "transparent",
                        }}
                        className={Theme.centerHorizonal}
                      >
                        <Image
                          loader={myLoader}
                          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                          alt="The Thanos Imperative"
                          width={500}
                          height={500}
                        />
                      </div>
                    </Col>
                    <Col
                      flex="1 0 50%"
                      className="columnFlex"
                      style={{ background: "transparent" }}
                    >
                      <div
                        style={{
                          margin: " 6px auto 0",
                          padding: "15px",
                          background: "#fff",
                          maxWidth: "500px",
                        }}
                      >
                        <div className={Theme.detailBox}>
                          <a style={{ display: "block" }}>
                            <span className={Theme.detailNameBox}>
                              {item.title}
                            </span>
                          </a>
                          <a className={Theme.detailImgBox}>
                            <Button
                              type="link"
                              onClick={favBtn}
                              icon={
                                favActive ? (
                                  // <HeartOutlined style={{ fontSize: "30px", color: "#000" }} />
                                  <HeartFilled
                                    style={{
                                      fontSize: "30px",
                                      color: "#EC1D24",
                                    }}
                                  />
                                ) : (
                                  <HeartOutlined
                                    style={{ fontSize: "30px", color: "#000" }}
                                  />
                                )
                              }
                            />
                          </a>
                        </div>
                        <h5
                          className={Theme.grayThinText}
                          style={{ marginBottom: "0" }}
                        >
                          start: {item.start.slice(0, 10)}
                        </h5>
                        <h5
                          className={Theme.grayThinText}
                          style={{ marginBottom: "15px" }}
                        >
                          end: {item.end.slice(0, 10)}
                        </h5>
                        <h5
                          className={Theme.darkThinText}
                          style={{ textAlign: "justify", lineHeight: "1.2" }}
                        >
                          {item.description}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            {/* Characters In This Event */}
            <div style={{ padding: "50px 0" }}>
              <h2 className={Theme.lightText}>Characters In This Event</h2>
              <Slider {...settings}>
                {characters &&
                  characters.map((character: any, index: number) => (
                    <div key={index}>
                      <Card
                        bordered={false}
                        style={{ padding: "2px" }}
                        bodyStyle={{ border: 0, padding: "0.5vmax 0 0" }}
                        cover={
                          <Image
                            loader={myLoader}
                            alt={`${character.name}`}
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            width="150px"
                            height="150px"
                          />
                        }
                      >
                        <span className={Theme.titleText}>
                          {character.name}
                        </span>
                      </Card>
                    </div>
                  ))}
              </Slider>
            </div>
            {/* comments */}
            <div
              style={{
                backgroundColor: "#f3f3f3",
                padding: "10px 20px 15px 20px",
              }}
            >
              <h2 className={Theme.darkText}>Comments</h2>
              <div className={Theme.writeComment} style={{ padding: "0 10px" }}>
                <Form form={form} onFinish={onFinish} layout="inline">
                  <Form.Item
                    name="comment"
                    wrapperCol={{ sm: 24 }}
                    style={{ width: "90%", marginBottom: 0, marginRight: 0 }}
                  >
                    <Input.TextArea className={Theme.comment} />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{ sm: 24 }}
                    style={{ width: "10%", marginRight: 0 }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={Theme.btnCbox}
                    >
                      POST
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              {comments ? (
                comments.map((item, index) => (
                  <div key={index} className={Theme.u_cbox_comment_box}>
                    <span className={Theme.u_cbox_avatar}>
                      <Image
                        className="rounded-corners"
                        loader={myLoaderFirebase}
                        src={`${item.pictureUrl}`}
                        alt="user"
                        unoptimized={true}
                        width={50}
                        height={50}
                      />
                    </span>
                    <span className={Theme.u_cbox_name}>
                      {item.displayName}
                    </span>
                    <span className={Theme.u_cbox_contents}>
                      {item.comment}
                    </span>
                    <span className={Theme.u_cbox_date}>{item.date}</span>
                  </div>
                ))
              ) : (
                <div className={Theme.u_cbox_comment_none}>
                  <div>
                    <MessageOutlined
                      style={{ fontSize: "60px", paddingBottom: "10px" }}
                    />
                  </div>
                  <span className={Theme.u_cbox_comment_none}>
                    There is no comment.
                    <br />
                    Be the first to comment.
                  </span>
                </div>
              )}
              <div>
                <Modal
                  title="Notice"
                  visible={isModalLogin}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  bodyStyle={{ padding: "15px 16px" }}
                  footer={[
                    <button key="1" className={Theme.btnLogin} onClick={login}>
                      LOGIN
                    </button>,
                  ]}
                >
                  <h5
                    className={Theme.darkText}
                    style={{ textAlign: "center" }}
                  >
                    Login and Enjoy special features.
                  </h5>
                </Modal>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{ margin: " 6px auto 0", background: "transparent" }}
              className={Theme.centerHorizonal}
            >
              <div className={Theme.u_cbox_comment_none}>
                <Image
                  loader={myLoader}
                  src="https://thumbs.gfycat.com/LeanEnlightenedAndeancockoftherock.webp"
                  alt="loading"
                  width={60}
                  height={80}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
