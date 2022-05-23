<template>
  <div class="map-wrap">
    <div id="map1" class="map-item"></div>
    <div id="map2"></div>
  </div>
</template>

<script lang="ts">
import { watch, onMounted, reactive } from "vue";
import echarts from "echarts";
import chinaJson from "../../assets/js/china.json";
import "./css/index.scss";

const mapOption = {
  trigger: "item",
  formatter: "现有确诊病例<br/>{b}:{c}",
  visualMap: {
    show: false,
  },
};

interface Idata {
  map1Item: any;
}

export default {
  props: ["chinaData"],
  setup(props: any) {
    type EChartOption = echarts.EChartOption;

    const data = reactive<Idata>({
      map1Item: {},
    });

    onMounted(() => {
      initialMap();
    });

    watch(
      props,
      (val) => {
        if (Object.keys(data.map1Item).length) {
          const mapData = props.chinaData.children.map((c: any) => ({
            name: c.name,
            value: c.total.confirm - c.total.dead - c.total.heal || 0,
          }));
          data.map1Item.hideLoading();
          const option = {
            ...mapOption,
            series: {
              type: "map",
              map: "china",
              data: mapData,
              colorBy: "series",
              zoom: 1.3,
              top: 80,
              label: {
                show: true,
                color: "#333",
                fontSize: 10,
              },
            },
          };
          data.map1Item.setOption(option);
        }
      },
      { immediate: true }
    );

    const initialMap = () => {
      const map1: HTMLElement | null = document.getElementById("map1");
      const myMap = echarts.init(map1 as HTMLCanvasElement);
      myMap.showLoading();
      data.map1Item = myMap;
      echarts.registerMap("china", chinaJson as any);
    };
  },
};
</script>
