import React, { ReactElement } from "react";
import { Layout, Button, Row, Col } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  SearchOutlined,
  TrophyOutlined,
  TrophyFilled,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import User from "./User";
import Link from "next/link";

interface Props {}

export default function Header({}: Props): ReactElement {
  const onSearch = (e: any) => {
    if (e.keyCode == 13) {
      console.log("value", e.target.value);
      // put the login here
    }
  };
  const router = useRouter();
  const { Header } = Layout;
  const currectPath = router.pathname.substr(1);

  const [pageMyfav, setPageMyfav] = React.useState(false);
  const [pageRank, setPageRank] = React.useState(false);

  React.useEffect(() => {
    if (currectPath == "myFav") {
      // console.log ("if", currectPath)
      setPageMyfav(true);
      setPageRank(false);
    } else if (currectPath === "") {
      // console.log ("ifindex", currectPath)
      setPageMyfav(false);
      setPageRank(false);
    } else if (currectPath === "rank") {
      // console.log ("ifindex", currectPath)
      setPageMyfav(false);
      setPageRank(true);
    }
    // console.log ("ifout", currectPath)
    // setPageURL(location.href);
  }, [currectPath]);

  return (
    <>
      <Layout>
        <Header style={{ background: "#202020", padding: "0 4px", height: 64 }}>
          <Row
            gutter={[8, { xs: 8, sm: 16, md: 24, lg: 32 }]}
            justify="space-around"
          >
            <Col xs={2} lg={1} className="center">
              <span>
                {pageRank ? (
                  <Button
                    type="link"
                    onClick={() => router.push("/rank")}
                    icon={
                      <TrophyFilled
                        style={{ fontSize: "4vw", color: "#fff" }}
                      />
                    }
                  />
                ) : (
                  <Button
                    type="link"
                    onClick={() => router.push("/rank")}
                    icon={
                      <TrophyOutlined
                        style={{ fontSize: "4vw", color: "#fff" }}
                      />
                    }
                  />
                )}
              </span>
            </Col>
            <Col xs={2} lg={1} className="center">
              <span>
                {pageMyfav ? (
                  <Button
                    type="link"
                    onClick={() => router.push("/myFav")}
                    icon={
                      <HeartFilled style={{ fontSize: "4vw", color: "#fff" }} />
                    }
                  />
                ) : (
                  <Button
                    type="link"
                    onClick={() => router.push("/myFav")}
                    icon={
                      <HeartOutlined
                        style={{ fontSize: "4vw", color: "#fff" }}
                      />
                    }
                  />
                )}
              </span>
            </Col>
            <Col xs={3} lg={{ offset: 1, span: 1 }} className="center">
              {" "}
            </Col>
            <Col xs={8} lg={8} className="center">
              <span
                style={{ fontSize: "28px" }}
                className="logo"
                onClick={() => router.push("/")}
              >
                MARVEL
              </span>
            </Col>
            <Col xs={3} lg={{ offset: 1, span: 1 }} className="center">
              {" "}
            </Col>
            <Col xs={2} lg={{ offset: 1, span: 1 }} className="center">
              <span>
                <Button
                  type="link"
                  onClick={() => router.push("/search")}
                  icon={
                    <SearchOutlined
                      style={{ fontSize: "3.5vw", color: "#fff" }}
                    />
                  }
                />
              </span>
            </Col>
            <Col xs={3} lg={1} className="center">
              <div>
                <User />
              </div>
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
}
