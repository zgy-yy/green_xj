import http from "./http";
import {Cat, ChannelList, CommentsInfo, HomeList, PlayInfo, SpecialDetail, VideoInfo, VideoLike} from "../types/type";


export const A = 90

export async function getGlobalData() {
    const globalDataUrl = '/getGlobalData'
    return http.get(globalDataUrl).then(data => {
        return data
    })
}

export async function getHomeRecommendList() {
    const url = '/index'
    return http.get<HomeList>(url).then(data => {
        return data
    })
}

export async function getLikeRows() {
    const url = '/getLikeRows'
    return http.get<{ likerows: VideoInfo[] }>(url).then(data => {
        return data
    })
}

//播放信息  retcode = 5  没有权限   retcode: 0 可以
export async function getPlayInfo(vid: string) {
    const url = '/vod/reqplay/'
    return http.get<PlayInfo>(url+vid, {videoId: vid}).then(data => {
        return data
    })
}

export async function getVideoComments(vid: string) {
    const url = '/comment/listing-'
    return http.get<CommentsInfo>(url+vid+'-0-1').then(data => {
        return data
    })
}
//根据当前视频推荐的视频
export async function getVideoLike(vid: string) {
    const url = '/vod/show/'
    return http.get<VideoLike>(url+vid, {videoId: vid}).then(data => {
        return data
    })
}
//频道 actor 1, other 2
export async function getChannels(page:number,sptype=2,orderby=0) {
    const url = '/special/listing-'
    return http.get<ChannelList>(url+sptype+'-'+orderby+'-'+page).then(data => {
        return data
    })
}

export async function getSpecialDetail(spid:string){
    const url = '/special/detail/'
    return http.get<SpecialDetail>(url+spid).then(data => {
        return data
    })
}

export function getCats(...args:number[]){
    let param = ''
    for (let i = 0; i < args.length; i++) {
        param+=`-${args[i]}`
    }
    return http.get<Cat>('/vod/listing'+param).then(data => {
        return data
    })
}