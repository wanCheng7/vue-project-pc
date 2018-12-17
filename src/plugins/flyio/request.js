import Flyio from './interceptors'
import API from '@/api'
import Config from './config'
// 异常情况的错误处理
const errorFunction = (reqConfig, err) => {
  // 如果有异常需要提示
  if (!reqConfig.errorAction && reqConfig.isErrorDefaultTip) {
    setTimeout(() => {
      Config.resError.tipShow(err)
    }, 0)
  }
  throw (err)
}

// 接口请求封装函数
const rMethod = (url = '', data = {}, flyConfig = {}) => {
  let flyio = Flyio.request(url, data, {
    ...Config.flyConfig,
    ...flyConfig
  })

  return flyio.then(res => {
    return res
  }).catch(err => {
    if (err.response.status == 401) {
      location.href = `${location.href.split('#')[0]}` ? `${location.href.split('#')[0]}#/login?return_url=${location.href}` : `${location.href}#/login?return_url=${location.href}`
    }
    else if (err.response.status == 502) {

    }
    return err.response.data;
  })
}

export default {
  //通用自定义
  request: rMethod,

  get(url, data, flyConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'get'
    });
  },

  // flyConfig中method默认为post
  post: rMethod,

  put(url, data, flyConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'put'
    });
  },

  delete(url, data, flyConfig = {}) {
    return rMethod(url, data, {
      ...Config.flyConfig,
      ...flyConfig,
      method: 'delete'
    });
  },
}
