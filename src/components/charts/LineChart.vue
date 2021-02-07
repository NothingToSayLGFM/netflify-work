<template>
  <div>
    <h3 class="text-center mt-5 mb-5">Line Graph</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: ["chartData"],
  watch: {
    chartData() {
      this.renderChart({
        labels: [
          ...this.chartData.likes_history.values.map((value) => value.date),
        ],
        datasets: [
          {
            label: "likes",
            data: [
              ...this.chartData.likes_history.values.map(
                (value) => value.value
              ),
            ],
            fill: false,
            borderColor: "#d81f1f",
            backgroundColor: "#d81f1f",
            borderWidth: 1,
          },
          {
            label: "views",
            data: [
              ...this.chartData.views_history.values.map(
                (value) => value.value
              ),
            ],
            fill: false,
            borderColor: "#aa1fd8",
            backgroundColor: "#aa1fd8",
            borderWidth: 1,
          },
        ],
      });
    },
  },
  methods: {
    render() {
      this.renderChart({
        labels: [
          ...this.chartData.likes_history.values.map((value) => value.date),
        ],
        datasets: [
          {
            label: "likes",
            data: [
              ...this.chartData.likes_history.values.map(
                (value) => value.value
              ),
            ],
            fill: false,
            borderColor: "#d81f1f",
            backgroundColor: "#d81f1f",
            borderWidth: 1,
          },
          {
            label: "views",
            data: [
              ...this.chartData.views_history.values.map(
                (value) => value.value
              ),
            ],
            fill: false,
            borderColor: "#aa1fd8",
            backgroundColor: "#aa1fd8",
            borderWidth: 1,
          },
        ],
      });
    },
  },
  mounted() {
    this.render();
  },
};
</script>
