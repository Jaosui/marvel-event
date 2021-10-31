import React, { ReactElement } from "react";
import HeadTag from "../../component/Header";
import { useRouter } from "next/router";
import Theme from "../../styles/Theme.module.css";
import { Form, Input, Card, Button, Row, Col, Modal, notification } from "antd";
import { HeartOutlined, CommentOutlined, MessageOutlined, HeartFilled  } from "@ant-design/icons";
import Image from "next/image";
import Slider from "react-slick";
import { charactersDetail, eventDetail1 } from "../../utils/marveiApi";
import { saveComment } from "../../utils/localstorage";
import { getData, sendData } from "../../utils/handleFirebase";

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

export default function EventID({ eventDetail }: Props): ReactElement {
  const router = useRouter();
  const [event, setEvent] = React.useState(null);
  const [eventID, setEventID] = React.useState(null);
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

  // const getEventDetail = async (id:number) => {
  //   console.log('id', id)
  //   const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
  //   const TS = '1564731162583'
  //   const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
  //   const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
  //   //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
  //   const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

  //   const eventDetail = `${API_URL}/${id}?${AUTHforMarvel_API}`
  //   const eventDetail_res = await fetch(eventDetail)
  //   const eventDetail_data = await eventDetail_res.json() //object
  //   const event = eventDetail_data.data.results//object
  //   console.log ('data', event)
  //   setEvent(event)
  //   //characters data
  //   const charactersPath = `${API_URL}/${id}/characters?${AUTHforMarvel_API}`
  //   const characters_res = await fetch(charactersPath)
  //   const characters_data = await characters_res.json() //object
  //   const characters = characters_data.data.results//object
  //   console.log ('characters data', characters)
  //   setCharacters(characters)
  // }

  const initId = async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId });
    } catch (error) {
      console.error("liff init error", error.message);
    }
    if (liff.isLoggedIn()) {
      console.log("เข้าสู่ระบบแล้ว");
      liff
        .getProfile()
        .then((profileData) => {
          console.log(profileData);
          setUserId(profileData.userId);
          setDisplayName(profileData.displayName);
          setImgUser(profileData.pictureUrl);
          setStatusMessage(profileData.statusMessage);
        })
        .catch((err: any) => console.error(err));
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
    setCharacters(charactersData);
  };

  React.useEffect(() => {
    //     // getOldData()
    if (router.query.eventID) {
      initId();
      const queryID = router.query.eventID; //string
      const id: number = parseInt(queryID as string, 10);
      console.log("getID", id);
      setEventID(id)
      // getEventDetail(id)
      eventData01(id);
      //old-comment
      userComment(id)
      // console.log('fav firsttime :', favActive)
    }
    currentDate()
    //  console.log('router.query>>', router.query)
  }, [router.query]);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const myLoaderFirebase = ({ src }) => {
    return `${src}`;
  };
  const favBtn = () => {
    console.log("fav>>");
    console.log(favActive)
    setFavActive(!favActive)
    const data = {
      userID: userId,
      Myfav: "1",
    };
    console.log(data);
  };

  const settings = {
    className: "center",
    infinite: true,
    swipeToSlide: true,
    centerMode: true,
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

  const userComment = async (eventID:number) => {
    const commentFirestore = await getData(eventID)
    console.log('Pls>>', commentFirestore)
    setComments(commentFirestore)
  }

  const NotifyBlankComment = () => {
    notification['warning']({
      message: 'Notification',
      description:
        'Please enter any comments.',
    });
  };

  const NotifySuccessComment = () => {
    notification['success']({
      message: 'Notification',
      description:
        `You're done! your comment has been post on this event.`,
    });
  };

  const currentDate = () => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const day = today.getDate()
    const month =  monthNames[today.getMonth()]
    const years = today.getFullYear()
    const date =  month + ' ' + day+ ', ' + years
    const time = today.getHours()+ ":"+ today.getMinutes() + ":"+ today.getSeconds();
    setDateComments(date)
    setTimeComments(time)
  }

  const onFinish = (values: any) => {
    // saveComment(values)
    console.log("Success:", values);
    console.log("values.comment:", values.comment);
    const userProfile = JSON.parse(localStorage.getItem("User_Profile")) || []; // string>>>obj
    console.log("userProfile", userProfile);
    const commentData:Comment = {
      eventID: eventID,
      userId: userId,
      displayName: displayName,
      pictureUrl: imgUser,
      comment: values.comment,
      date: dateComments,
      time: timeComments
    }
    if (userProfile.length === 0) {
      console.log('notice: Login')
      setIsModalLogin(true);
    } else if (values.comment === undefined) {
      console.log('notice: blank comment')
      NotifyBlankComment()
    } else {
      console.log('notice: save comment')
      currentDate()
      console.log(typeof commentData)
      sendData(commentData)
      setTimeout(() => {
        userComment(eventID)
        console.log('notice: setTimeout')
      }, 500);
      // clearTimeout(id)
      NotifySuccessComment()
      console.log('notice: new comment')
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
    console.log("login")
    const liff = (await import('@line/liff')).default
    await liff.ready
    liff.login({ redirectUri: window.location.href });
  }

  const commentsData = [
    {
      userId: "001",
      displayName: "Slyfer2812",
      pictureUrl: `https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/avatar%2F2624893_avengers_iron%20man_marvel_super%20hero_icon.png?alt=media&token=b32f1bff-5d2a-4ba0-8248-80c120fba985`,
      comment:
        "The first time I have seen this Green Goblin grenade I was 5 years old. 21 now.",
      date: "Jan 13, 2021",
    },
    {
      userId: "002",
      displayName: "Faiz Patel",
      pictureUrl: `https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/avatar%2F2624896_avengers_captain_captain%20america_super%20hero_icon.png?alt=media&token=78e9073a-5e69-495f-8a4f-4683a3c59b74`,
      comment: `If you've grown with all the 3 Spider-Men, then you're something of a legend yourselves 😁`,
      date: "Oct 12, 2021",
    },
    {
      userId: "003",
      displayName: "MKSpider-ManFan2021",
      pictureUrl: `https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/avatar%2F2624867_humanoid_loki_super%20villain_thanos_icon.png?alt=media&token=3e820d82-1037-4105-9eb7-32c473f2ec2f`,
      comment: `Andrew and Tom: Dangit, we're out of web fluid!
      Tobey: I missed the part where that's my problem.`,
      date: "Sep 9, 2021",
    },
  ];

  return (
    <>
      <HeadTag />
      <div className={Theme.dark}>
        {/* descpirtion */}
        {event &&
          event.map((item, index) => (
            <div key={index}>
              <Row wrap={true}>
                <Col
                  flex="1 0 50%"
                  className="columnFlex"
                  style={{ background: "transparent" }}
                >
                  <div
                    style={{ margin: " 6px auto 0", background: "transparent" }}
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
                  style={{ background: "#fff" }}
                >
                  <div style={{ padding: "20px " }}>
                    <div style={{ whiteSpace: "nowrap" }}>
                      <h3
                        className={Theme.nameEvent}
                        style={{ margin: "0 ", display: "inline" }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          display: "inline",
                          float: "right",
                        }}
                      >
                        <Button
                          type="link"
                          onClick={favBtn}
                          icon={ favActive ?
                            <HeartFilled style={{ fontSize: '40px', color: '#EC1D24'}} /> :
                            <HeartOutlined style={{ fontSize: "40px", color: "#EC1D24" }} />
                           
                          }
                        />
                        {/* <div style={{ width: "2rem" }}>
                          <Heart isActive={favActive} onClick={() => setFavActive(!favActive)}/>
                        </div> */}
                      </div>
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
                    <h4
                      className={Theme.darkThinText}
                      style={{ textAlign: "justify" }}
                    >
                      {item.description}
                    </h4>
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
                    hoverable
                    bordered={false}
                    style={{ padding: "2px" }}
                    bodyStyle={{ border: 0, padding: "0.5vmax 0 0" }}
                    cover={<Image
                      loader={myLoader}
                      alt={`${character.name}`}
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      width="150px"
                      height="150px"
                      />
                    }
                  >
                    <span className={Theme.titleText}>{character.name}</span>
                  </Card>
                </div>
              ))}
          </Slider>
        </div>
        {/* comments */}
        <div
          style={{ backgroundColor: "#f3f3f3", padding: "10px 20px 15px 20px" }}
        >
          <h2 className={Theme.darkText}>Comments</h2>
          <div className={Theme.writeComment} style={{ padding: "0 20px" }}>
            <Form form={form} onFinish={onFinish} layout="inline">
              <Form.Item
                name="comment"
                wrapperCol={{ sm: 24 }}
                style={{ width: "90%", marginBottom: 0, marginRight: 0 }}
              >
                <Input.TextArea className={Theme.comment} />
              </Form.Item>
              <Form.Item wrapperCol={{ sm: 24 }}  style={{ width: "10%", marginRight: 0 }}>
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
          <div className={Theme.u_cbox_comment_box}>
            <span className={Theme.u_cbox_avatar}>
              <Image
                loader={myLoaderFirebase}
                src={`https://firebasestorage.googleapis.com/v0/b/marvel-event.appspot.com/o/avatar%2F2624860_hawkeye_hero_marvel%20characteristic_super%20hero_icon.png?alt=media&token=a5a0da01-99cf-4131-87ac-6eb246d0730f`}
                alt="user"
                unoptimized={true}
                width={50}
                height={50}
              />
            </span>
            <span className={Theme.u_cbox_name}>my hpn 🍋👀🍒🧸</span>
            <span className={Theme.u_cbox_contents}>
              test1
            </span>
            <span className={Theme.u_cbox_date}>Sep 9, 2021</span>
          </div>
          {comments ?
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
                <span className={Theme.u_cbox_name}>{item.displayName}</span>
                <span className={Theme.u_cbox_contents}>{item.comment}</span>
                <span className={Theme.u_cbox_date}>{item.date}</span>
              </div>
            )) : <div className={Theme.u_cbox_comment_none}>
            <div>
              <MessageOutlined style={{ fontSize: '60px', paddingBottom: '10px' }}/>
            </div>
            <span className={Theme.u_cbox_comment_none}>There is no comment.<br/>Be the first to comment.</span>
          </div>}
          <div>
            <Modal
              title="Notice"
              visible={isModalLogin}
              onOk={handleOk} onCancel={handleCancel}
              bodyStyle={{padding: '15px 16px'}}
              footer={[
                <button
                  key="1"
                  className={Theme.btnLogin}
                  onClick={login}
                >
                  LOGIN
                </button>
              ]}
            >
              <h5 className={Theme.darkText} style={{textAlign: 'center'}}>
                Login and Enjoy special features.
              </h5>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
