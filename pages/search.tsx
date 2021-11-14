import React, { ReactElement } from 'react'
import Theme from '../styles/Theme.module.css'
import { Row, Col, AutoComplete, Input, Divider, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { allEvents } from '../utils/marveiApi'


interface Props {
    
}

export default function Search({}: Props): ReactElement {
  const router = useRouter()
  
  const [eventObj, setEventObj] = React.useState([])
  // const { Search } = Input;
  const onSearch = (e: any) => {
    if(e.keyCode == 13){
      console.log('value', e.target.value);
      const historyKeyword = JSON.parse( localStorage.getItem('historyKeyword') ) || []; // string>>>obj
      const key = Object.keys(historyKeyword).length
      historyKeyword[ key ] ={ id: key, keyword: e.target.value };
      console.log("keyadd", key)
      localStorage.setItem('historyKeyword', JSON.stringify(historyKeyword)); // obj>>>string
      // localStorage.clear()
      // openNotification()
      // router.push('/userData')
      // put the login here
      // console.log(e)
   }
  //  console.log(e)
  }

  const getData = async () => {
    const data = await allEvents()
    console.log(typeof data, data[1])
    setEventObj(data)
  }
  // const options = eventObj

  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];

  const [dataHistory, setDataHistory] = React.useState(null);
  React.useEffect(() => {
    getData()
    const historyKeyword = JSON.parse(localStorage.getItem("historyKeyword"))|| [];
    console.log(historyKeyword)
    console.log('historyKeyword', historyKeyword)
    setDataHistory(historyKeyword);
    localStorage.setItem('historyKeyword', JSON.stringify(historyKeyword));
  }, []);


  return (
    <div className={Theme.dark}>
      <Row>
        <Col span={24}>
        <span >
                <Button
                  type="link"
                  onClick={() => router.push('/')} 
                  icon={
                  // <HeartOutlined  style={{ fontSize: '20px', color: '#fff'}} />}
                  <LeftOutlined  style={{ fontSize: '4vw', color: '#fff'}} />
                  }
                  />
              </span>
        </Col>
      </Row>
        <div className={Theme.centerHorizonal} style={{ background: '#202020'}}>
          <h1 className={Theme.lightTextSubHeading} >What Are You Looking For? </h1>
           {/* <Search size="large" placeholder="input search text" onSearch={onSearch} enterButton /> */}
           <Input style={{ width: '50vw', height: '4vmax' }} allowClear placeholder="Basic usage" onPressEnter={onSearch}/>
           {/* <AutoComplete
            style={{ width: 200 }}
            options={options}
            placeholder="try to type `b`"
            // filterOption={(inputValue, option) =>
            //   option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            // }
          /> */}
          <Divider orientation="left" className={Theme.lightTextSubHeading} style={{ margin:'20px 0 10px 0', borderWidth: 2, borderColor: '#fff' }}>History</Divider>
          {/* <h1>{JSON.stringify(dataHistory)}</h1> */}
          {dataHistory && dataHistory.map (item => 
          <>
            <h1 key={item.id} className={Theme.lightTextBody}>{item.keyword}</h1>
            <Divider style={{ margin:'4px 0 2px 0', borderWidth: 1, borderColor: '#5c5c5c' }}/>
          </>
            )}
           
        </div>
        
    </div>
  )
}
