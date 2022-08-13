<template>
  <div id="column-chart">
    <VueApexCharts
      type="bar"
      height="450"
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
      series: [
        {
          name: "NW",
          data: [124, 12, 14, 16],
        },
        {
          name: "CE",
          data: [15, 5, 2, 4],
        },
        {
          name: "NE",
          data: [109, 7, 12, 12],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 450,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Đóng cửa",
            "Không tìm thấy",
            "Từ chối",
            "Ngừng kinh doanh",
          ],
        },
        yaxis: {
          max: 140,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
  components: {
    VueApexCharts,
  },
};
</script>

<style></style>
