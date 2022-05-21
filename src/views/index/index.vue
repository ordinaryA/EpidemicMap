<script setup lang="ts">
import { onMounted, reactive } from "vue";
import axios from "axios";
import "./css/index.scss";

interface IData {
  areaTree: Array<{}>;
  chinaDayList: Array<{}>;
  chinaTotal: object;
  lastUpdateTime: string;
  overseaLastUpdateTime: string;
}

const data = reactive<IData>({
  areaTree: [],
  chinaDayList: [],
  chinaTotal: {},
  lastUpdateTime: "",
  overseaLastUpdateTime: "",
});

const requestWuhan = async () => {
  const url = "/api/ug/api/wuhan/app/data/list-total?t=330415245809";
  const resp = await axios(url).catch((err) => {
    throw err;
  });
  const { areaTree } = resp.data.data;
  console.log("resp.data.data", resp.data.data);

  data.areaTree = areaTree;
};

onMounted(() => {
  requestWuhan();
});
</script>

<template>
  <div class="index">
    <div class="index__top">
      <div class="index__top--title">
        <h1>科学防护 共渡难关</h1>
        <h2>肺炎疫情实时动态播报</h2>
      </div>
      <div class="index__cards">
        <div class="index__cards--tabs">
          <div class="tab-item active">全国疫情数据</div>
          <div class="tab-item">湖北疫情数据</div>
        </div>
        <div class="index__cards--info">
          <div class="info-item">
            <h4>境外输入</h4>
            <p class="info-item__num">12345</p>
            <p>
              <span class="prev-day">较昨日</span>
              <span class="prev-nums">+12</span>
            </p>
          </div>
          <div class="info-item">
            <h4>境外输入</h4>
            <p class="info-item__num">12345</p>
            <p>
              <span class="prev-day">较昨日</span>
              <span class="prev-nums">+12</span>
            </p>
          </div>
          <div class="info-item">
            <h4>境外输入</h4>
            <p class="info-item__num">12345</p>
            <p>
              <span class="prev-day">较昨日</span>
              <span class="prev-nums">+12</span>
            </p>
          </div>
          <div class="info-item">
            <h4>境外输入</h4>
            <p class="info-item__num">12345</p>
            <p>
              <span class="prev-day">较昨日</span>
              <span class="prev-nums">+12</span>
            </p>
          </div>
          <div class="info-item">
            <h4>境外输入</h4>
            <p class="info-item__num">12345</p>
            <p>
              <span class="prev-day">较昨日</span>
              <span class="prev-nums">+12</span>
            </p>
          </div>
          <div class="info-item">
            <h4>境外输入</h4>
            <p class="info-item__num">12345</p>
            <p>
              <span class="prev-day">较昨日</span>
              <span class="prev-nums">+12</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

