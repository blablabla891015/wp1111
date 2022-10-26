import axios from 'axios'
const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const startGame = async () => {
   try {
      const { data: { msg } } = await instance.post('/start')
      return msg
   }
   catch (error) {
      try{
         return 'Error : '+error['response']['status']+" "+error['response']['data']['msg']
      }
      catch(error2){
         return 'Error : 503 '+error['message']
      }
   }
}
const guess = async (number) => {
 try {
    const { data: { msg } } = await instance.get('/guess', { params: { number } })
    return msg
 }
 catch (error) {
   try{
      return 'Error : '+error['response']['status']+" "+error['response']['data']['msg']
   }
   catch(error2){
      return 'Error : 503 '+error['message']
   }
 }
}
const restart = async ()=>{
   try {
      const { data: { msg } } = await instance.post('/restart')
      return msg
   }
   catch (error) {
      try{
         return 'Error : '+error['response']['status']+" "+error['response']['data']['msg']
      }
      catch(error2){
         return 'Error : 503 '+error['message']
      }
   }
}

export { startGame, guess, restart }