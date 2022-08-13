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
          name: "CH Visited",
          data: [320, 119, 201],
        },
        {
          name: "Audit thành công",
          data: [154, 93, 61],
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
          categories: ["NW", "CE", "NE"],
        },
        yaxis: {
          max: 350,
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
