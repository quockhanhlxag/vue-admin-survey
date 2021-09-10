<template>
  <div id="pie-chart" class="d-flex justify-center">
    <VueApexCharts
      type="radialBar"
      height="190"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  data() {
    return {
      chartOptions: {
        chart: {
          height: 190,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            offsetX: -70,
            hollow: {
              size: "68%",
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                fontSize: "25px",
                offsetY: 10,
                color: "black",
                show: true,
                formatter: function (val) {
                  return val + " điểm";
                },
              },
            },
          },
        },
        fill: {
          colors: this.color,
        },
        stroke: {
          lineCap: "round",
        },
      },
    };
  },
  props: {
    series: {
      type: Array,
    },
    color: {
      type: String,
    },
  },
  components: {
    VueApexCharts,
  },
};
</script>

<style></style>
