<template>
  <div class="index">
    <div class="index__top">
      <div class="index__top--title">
        <h1>科学防护 共渡难关</h1>
        <h2>肺炎疫情实时动态播报</h2>
      </div>
      <div class="index__cards" ref="cards">
        <div class="index__cards--tabs">
          <div
            :class="['tab-item', { active: tabIndex === 0 }]"
            @click="tabChange(0)"
          >
            全国疫情数据
          </div>
          <div
            :class="['tab-item', { active: tabIndex === 1 }]"
            @click="tabChange(1)"
          >
            湖北疫情数据
          </div>
        </div>
        <div class="index__cards--info" v-if="chinaTotal.total">
          <!-- 全国 -->
          <template v-if="tabIndex === 0">
            <div class="info-item JWSR">
              <h4>境外输入</h4>
              <p class="info-item__num">{{ chinaTotal.total.input }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ chinaTotal.today.input }}</span>
              </p>
            </div>
            <div class="info-item WZZGR">
              <h4>无症状感染者</h4>
              <p class="info-item__num">
                {{ chinaTotal.extData.noSymptom }}
              </p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums"
                  >+{{ chinaTotal.extData.incrNoSymptom }}</span
                >
              </p>
            </div>
            <div class="info-item XYQZ">
              <h4>现有确诊</h4>
              <p class="info-item__num">
                {{
                  chinaTotal.total.confirm -
                  chinaTotal.total.dead -
                  chinaTotal.total.heal
                }}
              </p>
              <p>
                <span class="prev-day LJQZ">较昨日</span>
                <span class="prev-nums"
                  >+{{ chinaTotal.today.storeConfirm }}</span
                >
              </p>
            </div>
            <div class="info-item LJQZ">
              <h4>累计确诊</h4>
              <p class="info-item__num LZSW">{{ chinaTotal.total.confirm }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ chinaTotal.today.confirm }}</span>
              </p>
            </div>
            <div class="info-item LZSW">
              <h4>累计死亡</h4>
              <p class="info-item__num">{{ chinaTotal.total.dead }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ chinaTotal.today.dead }}</span>
              </p>
            </div>
            <div class="info-item LJZY">
              <h4>累计治愈</h4>
              <p class="info-item__num">{{ chinaTotal.total.heal }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ chinaTotal.today.heal }}</span>
              </p>
            </div>
          </template>

          <!-- 湖北 -->
          <template v-if="tabIndex === 1">
            <div class="info-item LJQZ">
              <h4>累计确诊</h4>
              <p class="info-item__num LZSW">{{ hbData.total.confirm }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ hbData.today.confirm }}</span>
              </p>
            </div>
            <div class="info-item LZSW">
              <h4>累计死亡</h4>
              <p class="info-item__num">{{ hbData.total.dead }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ hbData.today.dead }}</span>
              </p>
            </div>
            <div class="info-item LJZY">
              <h4>累计治愈</h4>
              <p class="info-item__num">{{ hbData.total.heal }}</p>
              <p>
                <span class="prev-day">较昨日</span>
                <span class="prev-nums">+{{ hbData.today.heal }}</span>
              </p>
            </div>
          </template>
          <p class="end-date">截止{{ lastUpdateTime }}</p>
        </div>
      </div>
    </div>
    <MapEcharts :style="cardTopHeight" :chinaData="chinaData" />
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  reactive,
  toRefs,
  ref,
  watch,
  nextTick,
  computed,
} from "vue";
import MapEcharts from "../../components/mapEcharts/index.vue";
import { InteData, initialData } from "./js";
import "./css/index.scss";

const data = reactive(new InteData());

const { chinaTotal, lastUpdateTime, tabIndex, hbData, cardHeight, chinaData } =
  toRefs(data);

const cards: any = ref(null);

onMounted(() => {
  initialData(data);
});

const cardTopHeight = computed(() => {
  const style = {
    marginTop: `calc(${data.cardHeight}px - 2rem)`,
  };
  return style;
});

watch(
  [chinaTotal, tabIndex],
  (val) => {
    nextTick(() => {
      const { offsetHeight } = cards.value;
      data.cardHeight = offsetHeight;
    });
  },
  { immediate: true }
);

const tabChange = (idx: number) => {
  data.tabIndex = idx;
};
</script>