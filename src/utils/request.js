import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
// 每个请求的头信息，都带上 token 这个字段， 如果这个为空，那么就不发送请求。 
// 这个是在前端最基本的校验，token 的获取从后端过来
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code != 20000) {
            ElMessage({
                message: res.message || "Error! ErrorCode: " + res.code,
                type: 'error',
                duration: 5 * 1000
            })
        } else if (res.code == 50001 || res.code == 50002 || res.code == 50003) {
            ElMessageBox.confirm('认证过期或者无效， 请重新登录', '确认', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        else {
            return res
        }
    },
    error => {
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service