import axios from 'axios'

const BASE_URL = 'https://bard-api-five.vercel.app/api/bardapi'



const getBardApi = (userMsg)=>axios.get(BASE_URL+"?ques="+userMsg)

export default{
    getBardApi
}