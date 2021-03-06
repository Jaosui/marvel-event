import Title from "antd/lib/skeleton/Title"

const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
const TS = '1564731162583'
const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
//Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

export const eventDetail1 = async (id:number) => {
    
    const eventDetail = `${API_URL}/${id}?${AUTHforMarvel_API}`
    const eventDetail_res = await fetch(eventDetail)
    const eventDetail_data = await eventDetail_res.json() //object
    const event = eventDetail_data.data.results//object
    // console.log ('data', event)
   return event
}

export const charactersDetail = async (id:number) => {
    console.log('id', id)
    //characters data
    const charactersPath = `${API_URL}/${id}/characters?${AUTHforMarvel_API}`
    const characters_res = await fetch(charactersPath)
    const characters_data = await characters_res.json() //object
    const characters = characters_data.data.results//object
    console.log ('characters data', characters)
    return characters
  }

export const allEvents = async () => {
  const eventsPath = `${API_URL}?orderBy=name&limit=68&offset=7&${AUTHforMarvel_API}`
  const events_res = await fetch(eventsPath)
  const events_data = await events_res.json() //object
  const events = events_data.data.results//object
  const event = []
  const eventsData = events.map ( item => {
    const data = {
      eventid: item.id,
      title: item.title
    }
    event.push(data)
  })
  eventsData
  console.log(event)
  return event
}

export const searchKeyword = async (value:string) => {
  console.log(value)
  const searchKeyPath = `${API_URL}?nameStartsWith=${value}&limit=50&${AUTHforMarvel_API}`
  const searchKey_res = await fetch(searchKeyPath)
  const searchKey_data = await searchKey_res.json() //object
  const searchKey = searchKey_data.data.results//object
  console.log('searchKey',searchKey)
  const searchKeys = []
  const searchData = searchKey.map( item => {
    const data = {
      eventid: item.id,
      title: item.title,
      thumbnail: item.thumbnail
    }
    searchKeys.push(data)
  })
  searchData
  const searchKeyData = {
    total: searchKey_data.data.total,
    data: searchKeys
  }
  console.log(searchKeyData)
  return searchKeyData
}
