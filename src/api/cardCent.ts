import request from '../utils/request'

/**
 * 卡牌广场（无需登录）
 */
export function apiCardList(data){
  return request({
    url: '/app/carddiy/card/square-list',
    method: 'post',
    data
  })
}

