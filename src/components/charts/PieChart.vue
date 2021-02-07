<template>
  <div>
    <h3 class="text-center mt-5 mb-5">Pie Graph</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";

export default {
  name: "PieChart",
  extends: Pie,
  props: ["chartData"],
  watch: {
    chartData() {
      this.render();
    },
  },
  methods: {
    render() {
      this.renderChart({
        labels: ["Views", "Likes", "Donwloands"],
        datasets: [
          {
            label: "# of Votes",
            data: [
              this.chartData.views_count,
              this.chartData.like_count,
              this.chartData.downloads_count,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
  mounted() {
    this.render();
  },
};
</script>
