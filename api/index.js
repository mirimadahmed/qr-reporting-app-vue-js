import axios from 'axios'
const axiosObj = axios.create({
  baseURL: 'https://bookable.pk/poi'
  // headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data' }
})

export default {
  putData (data) {
    return axiosObj.post('/set_values.php', data)
  },
  getData () {
    return axiosObj.get('/get_values.php')
  }
}
