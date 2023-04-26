import type { ImageList, ImageItem ,ImageInfo , 
  codeList , userInfo , picCreat ,
  myArtCollectionTotalList , MyList ,SelfList ,
  PicInfoList , cardFrameHistoryListItem} from '@/api/model/homeModel';
import {request} from '@/utils/http';


enum Api {
  ImageList = '/app/carddiy/card/square-list',//卡牌广场（无需登录）
  CardLike = '/app/carddiy/card/like',
  CardInfo = '/app/carddiy/card/info', //卡牌详情
  userCodelist = '/app/carddiy/user/code-list',
  userpicGetConfig = '/app/carddiy/pic/get-config',
  getUserInfo = '/app/carddiy/pic/get-user-info',
  picCreat = '/app/carddiy/pic/create',
  picTaskStatus = '/app/carddiy/pic/task-status',
  myArtCollectionTotal = '/app/carddiy/user/my-art-collection-total',
  picMyList = '/app/carddiy/pic/my-list',
  carSelfList = '/app/carddiy/card/self-list',
  picDelete = '/app/carddiy/pic/delete',
  PicInfo = '/app/carddiy/pic/info',
  PicPublish = '/app/carddiy/pic/publish',
  CardPublish = '/app/carddiy/card/publish',
  CardDelete = '/app/carddiy/card/delete',
  cardFrameHistory = '/app/carddiy/card-frame/history',
  cardFrameCreat = '/app/carddiy/card-frame/create'
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

//我的画集数量myArtCollectionTotal
export function myArtCollectionTotalApi(params: {batch_id : number}) {
  return request<myArtCollectionTotalList>(
    {
      url: Api.myArtCollectionTotal,
      method: 'POST',
      data: params,
    }
  );
}
//我的卡图列表 /app/carddiy/pic/my-list picMyList
export function picMyListApi(params: {batch_id : number , page :number , page_size:number}) {
  return request<MyList>(
    {
      url: Api.picMyList,
      method: 'POST',
      data: params,
    }
  );
}
//carSelfList 我的卡牌列表（草稿/已发布）
export function carSelfListApi(params: {card_status : number , page :number , page_size:number}) {
  return request<SelfList>(
    {
      url: Api.carSelfList,
      method: 'POST',
      data: params,
    }
  );
}

//picDelete 删除卡图
export function picDeleteApi(params: {batch_id : number , pic_id :number}) {
  return request(
    {
      url: Api.picDelete,
      method: 'POST',
      data: params,
    }
  );
}

//PicInfo 卡图详情
export function PicInfoApi(params: {batch_id : number , pic_id :number}) {
  return request<PicInfoList>(
    {
      url: Api.PicInfo,
      method: 'POST',
      data: params,
    }
  );
}

//发布卡图 PicPublish
export function PicPublishApi(params: {batch_id : number , pic_id :number , title : string}) {
  return request(
    {
      url: Api.PicPublish,
      method: 'POST',
      data: params,
    }
  );
}

//CardPublish 发布卡牌
export function CardPublishApi(params: {card_id :number , title : string}) {
  return request(
    {
      url: Api.CardPublish,
      method: 'POST',
      data: params,
    }
  );
}
//CardDelete 删除卡牌
export function CardDeleteApi(params: {card_id :number}) {
  return request(
    {
      url: Api.CardDelete,
      method: 'POST',
      data: params,
    }
  );
}

//cardFrameHistory 获取历史牌框
export function cardFrameHistoryApi(params: {game_id :string}) {
  return request<cardFrameHistoryListItem>(
    {
      url: Api.cardFrameHistory,
      method: 'POST',
      data: params,
    }
  );
}

//cardFrameCreat 创建牌框
export function cardFrameCreatApi(params:any) {
  return request(
    {
      url: Api.cardFrameCreat,
      method: 'POST',
      data: params,
    }
  );
}