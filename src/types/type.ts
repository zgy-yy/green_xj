export interface VideoInfo {
    actor_tags: Array<{ tagid: string, tagtype: string, tagname: string, itemcount: string }>
    areaid: string
    areaname: string
    author: string
    authorid: string
    cateid: string
    catename: string //类别
    commentcount: string
    coverpic: string //img
    createtime: string
    definition: string // 分辨率 0 ， 3 ， 4
    down_url: string
    downcount_total: number
    downlist: []
    downnum: string
    duration: string
    episode_status: string
    episode_total: string //集数
    exclusive: 0
    intro: string
    islimit: string
    islimitv3: string
    isvip: string
    limit_free: number
    mosaic: string //码
    play_url: string
    playcount_total: number
    playindex: number
    playlist: []
    portrait: string
    scorenum: string
    tags: Array<{ tagid: string, tagtype: string, tagname: string, itemcount: string }>
    title: string
    updatetime: string
    upnum: string
    view_price: string
    vodid: string
    vodkey: string
    yearid: string
    yearname: string
}

//播放页信息
export interface PlayInfo {
    encurl: number
    httpurl: string
    httpurls: Array<{ hdtype: string, httpurl: string }>
    isfavorite: number
    iszan: number
}

export interface CommeItem {
    addtime: string
    avatar_url: string
    content: string
    depth: string
    downnum: string
    gender: number
    gicon: string
    id: string
    isvip: number
    lft: string
    nickname: string
    parentid: string
    rgt: string
    rootid: string
    sid: string
    subrows: []
    uid: string
    upnum: string
    username: string
    vodid: string
    __closenum__: string
}

export interface CommentsInfo {
    pageinfo: PageInfo
    rows: Array<CommeItem>

}

export interface VideoLike {

    categories: {
        cateid: string, catename: string, itemcount: number | null
    }
    likerows: Array<VideoInfo>
    similarrows: VideoInfo[]
    vodrow: VideoInfo | undefined
}

//演员
export interface Actor {
    addtime: string
    age: string
    avatar: string
    coverpic: string
    cup: string
    downnum: string
    intro: string
    itemcount: string
    spid: string
    spname: string
    sptype: string
    updatetime: string
    upnum: string
    vodrows: VideoInfo[]
}

export interface PageInfo {
    curr_url: string
    end: number
    first_url: string
    last_url: string
    next: number
    next_url: string
    page: number
    page_url: string
    pages: number[]
    pagesize: number
    plist: { pos: string, page: number, text: number, url: string }
    prev: number
    prev_url: string
    start: number
    total: number
    totalpage: number
}

//频道页

export interface ChannelList {

    actorrows: Array<Actor>
    pageinfo: PageInfo
    params: {
        orderby: number
        page: number
        sptype: number
    }
    rows: Array<Actor>
    sample_params: "$sptype:0-$orderby:0-$page:1"

}

export interface SpecialDetail {
    row: Actor
    vodrows: Array<VideoInfo>
}

export type KV = {
    keyid: number,
    value: string
}

export interface Cat {
    action: string
    areas: Array<{ areaid: number, areaname: string, sortnum: number }>
    categories: Array<{ cateid: number, parentid: string, uuid: '', catename: string }>
    definitions: Array<KV>
    durations: Array<KV>
    freetypes: Array<KV>
    langvoices: Array<KV>
    mosaics: Array<KV>
    now: number
    orders: Array<KV>
    pageinfo: PageInfo|{}
    params: {
        areaid: number
        cateid: number
        definition: number
        duration: number
        freetype: number
        langvoice: number
        mosaic: number
        orderby: number
        page: number
        yearid: number
    }
    // "$cateid:0-$areaid:0-$yearid:0-$definition:0-$duration:0-$freetype:0-$mosaic:0-$langvoice:0-$orderby:0-$page:1"
    sample_params: string
    vodrows: Array<VideoInfo>
    years: Array<{ yearid: number, yearname: string, sortnum: string }>
}


export interface HomeList {
    a_vodrows: VideoInfo[] //自
    b_vodrows: VideoInfo[] //动
    c_vodrows: VideoInfo[] //经
    d_vodrows: VideoInfo[] //字
    dayrows: VideoInfo[] //头条
    hotrows: VideoInfo[] //热门
    latestrows: VideoInfo[]//最新
    likerows: VideoInfo[] //猜你
    mbsliderows: VideoInfo[]
    pcsliderows: VideoInfo[]
    sliderows: VideoInfo[]
    tagvodrows: VideoInfo[] //流
    v2sliderows: Slide[] // 图
}

export interface Slide {
    pic: string
    scene: string
    spid?: number
    title: string
}