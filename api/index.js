import axios from 'axios'
const axiosObj = axios.create({
  baseURL: 'https://bookable.pk/poi'
  // headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data' }
})

export default {
  checkAsset (id) {
    return axiosObj.get(`/get_asset.php?asset_no=${id}`)
  },
  login (asset, id, pass) {
    return axiosObj.get(`/login.php?emp_id=${id}&password=${pass}&asset_no=${asset}`)
  },
  getStations () {
    return axiosObj.get('/get_stations.php')
  },
  putData (data) {
    return axiosObj.post('/set_submission.php', data)
  },
  getData () {
    return axiosObj.get('/get_values.php')
  }
}
