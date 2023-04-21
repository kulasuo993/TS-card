import type { ImageList, ImageItem ,ImageInfo , codeList , userInfo , picCreat} from '@/api/model/homeModel';
import {request} from '@/utils/http';


enum Api {
  ImageList = '/app/carddiy/card/square-list',//卡牌广场（无需登录）
  CardLike = '/app/carddiy/card/like',
  CardInfo = '/app/carddiy/card/info', //卡牌详情
  userCodelist = '/app/carddiy/user/code-list',
  userpicGetConfig = '/app/carddiy/pic/get-config',
  getUserInfo = '/app/carddiy/pic/get-user-info',
  picCreat = '/app/carddiy/pic/create',
  picTaskStatus = '/app/carddiy/pic/task-status'
}

export function ImageListApi(params: { page: number; page_size: number }) {
  return request<ImageList>(
    {
      url: Api.ImageList,
      method: 'POST',
      data: params,
    },
  );
}

export function CardLikeApi(params: Pick<ImageItem, 'card_id'>) {
  return request(
    {
      url: Api.CardLike,
      method: 'POST',
      data: params,
    }
  );
}

export function CardInfoApi(params: {card_id : number}) {
  return request<ImageInfo>(
    {
      url: Api.CardInfo,
      method: 'POST',
      data: params,
    }
  );
}

export function userCodelistApi(params: {batch_id : number}) {
  return request<codeList>(
    {
      url: Api.userCodelist,
      method: 'POST',
      data: params,
    }
  );
}

export function userpicGetConfigApi(params: {batch_id : number}) {
  return request(
    {
      url: Api.userpicGetConfig,
      method: 'POST',
      data: params,
    }
  );
}

export function getUserInfoApi(params: {batch_id : number}) {
  return request<userInfo>(
    {
      url: Api.getUserInfo,
      method: 'POST',
      data: params,
    }
  );
}
export function picCreatApi(params: {batch_id : number}) {
  return request<picCreat>(
    {
      url: Api.picCreat,
      method: 'POST',
      data: params,
    }
  );
}
export function picTaskStatusApi(params: {batch_id : number,task_id:any}) {
  return request(
    {
      url: Api.picTaskStatus,
      method: 'POST',
      data: params,
    }
  );
}