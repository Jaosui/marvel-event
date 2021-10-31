export const eventDetail1 = async (id:number) => {
    const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
    const TS = '1564731162583'
    const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
    const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
    //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
    const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

    const eventDetail = `${API_URL}/${id}?${AUTHforMarvel_API}`
    const eventDetail_res = await fetch(eventDetail)
    const eventDetail_data = await eventDetail_res.json() //object
    const event = eventDetail_data.data.results//object
    console.log ('data', event)
   return event
}

export const charactersDetail = async (id:number) => {
    console.log('id', id)
    const API_URL = 'https://gateway.marvel.com:443/v1/public/events'
    const TS = '1564731162583'
    const API_KEY ='6e70a1e22940665344ba83e6af995cd9'
    const HASH = 'cfbd637b4bdc3e2a71f0207709daf88b'
    //Server-side applications must pass three parameters in addition to the apikey parameter: ts apikey hash
    const AUTHforMarvel_API =`ts=${TS}&apikey=${API_KEY}&hash=${HASH}`

    //characters data
    const charactersPath = `${API_URL}/${id}/characters?${AUTHforMarvel_API}`
    const characters_res = await fetch(charactersPath)
    const characters_data = await characters_res.json() //object
    const characters = characters_data.data.results//object
    console.log ('characters data', characters)
    return characters
  }