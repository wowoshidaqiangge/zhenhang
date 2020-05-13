import axios from 'axios'


export const onenet = {
    ossInfo () {
        return axios({
          url: `https://picture.thingcom.cn/web/token`,
          method: 'get'
        })
          .then(response => {
            return response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
}