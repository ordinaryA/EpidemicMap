import axios from "axios";
import type { IData } from "../type";
import CONFIG from "../../../constants";

class InteData implements IData {
    chinaTotal: any = {}; // 全国疫情数据
    chinaData: any = {}; // 中国疫情数据
    hbData: any = {}; // 湖北疫情数据
    areaTree: any[] = []; // 数据树
    lastUpdateTime: string = ''; // 截止时间
    tabIndex: number = 0; // tab
    cardHeight: number = 0 // 卡片高度
}

/**
 * 初始化数据
 */
const initialData = async (data: InteData) => {
    const url = "/api/ug/api/wuhan/app/data/list-total?t=330415245809";
    // input: 境外输入
    // noSymptom: 无症状感染者
    // incrNoSymptom: 新增
    // confirm: 确诊
    // dead: 死亡
    // heal: 治愈
    // 现有确诊数 = 累计确诊数 - 累计死亡数 - 累计治愈数  confirm - deal - heal
    const resp = await axios(url).catch((err) => {
        throw err;
    });

    const {
        chinaTotal,
        areaTree,
        lastUpdateTime,
        // chinaDayList,
        // overseaLastUpdateTime,
    } = resp.data.data;

    // 全国数量
    data.chinaTotal = chinaTotal;
    // 湖北信息
    data.chinaData = areaTree.find((c: any) => c.id === CONFIG.CHINA_ID) || {};;
    // 湖北信息
    data.hbData = data.chinaData.children.find((c: any) => c.id === CONFIG.HUBEI_ID) || {};;
    // 截止时间
    data.lastUpdateTime = lastUpdateTime;

    // data.chinaDayList = chinaDayList;
    // data.overseaLastUpdateTime = overseaLastUpdateTime;
};

export {
    InteData,
    initialData
}

