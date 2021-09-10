<template>
  <div id="pie-chart" class="d-flex justify-center">
    <VueApexCharts
      type="pie"
      width="420"
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
        labels: ["Đã khảo sát", "Chưa khảo sát"],
        legend: {
          position: "bottom",
        },
      },
    };
  },
  props: {
    series: {
      type: Array,
    },
  },
  components: {
    VueApexCharts,
  },
};
</script>

<style></style>
