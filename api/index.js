import axios from 'axios'
const axiosObj = axios.create({
  baseURL: 'https://api.dlpvi.com'
  // headers: { 'Cache-Control': 'no-cache', 'Content-Type': 'multipart/form-data' }
})

export default {
  fixSubmission (id, comment) {
    return axiosObj.get(`/update_submission.php?id=${id}&comment=${comment}`)
  },
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
