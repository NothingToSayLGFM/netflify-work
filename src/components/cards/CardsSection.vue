<template>
  <section class="cards-section">
    <v-container>
      <v-row>
        <v-col
          v-for="(card, index) in getRandomPhotos"
          :key="index"
          :xl="lgXlToggle('xl', index)"
          :lg="lgXlToggle('lg', index)"
          class="cards-col"
        >
          <BigPostCard v-if="index === 2 || index === 3" :data="card" />
          <SmallPostCard v-else-if="index !== 2 || index !== 3" :data="card" />
        </v-col>
        <div ref="infinityScroll" id="scroll-trigger"></div>
      </v-row>
      <div class="d-flex justify-center">
        <ChartLoader v-if="showLoader" />
      </div>
    </v-container>
  </section>
</template>

<script>
import SmallPostCard from "./SmallPostCard";
import BigPostCard from "./BigPostCard";
import ChartLoader from "../charts/ChartLoader";

export default {
  name: "CardsSection",
  props: {
    getRandomPhotos: [Object, Array]
  },
  components: {
    BigPostCard,
    SmallPostCard,
    ChartLoader
  },
  computed: {
    searchPhotos() {
      return this.$store.state.searchImage;
    }
  },

  data: () => ({
    currentPage: 1,
    showLoader: false
  }),

  methods: {
    scrollPage() {
      const observer = new IntersectionObserver(etries => {
        etries.forEach(async entry => {
          if (entry.intersectionRatio > 0) {
            this.showLoader = true;
            let currentPage = (this.currentPage += 1);
            if (this.searchPhotos) {
              let image = this.searchPhotos;
              await this.$store.dispatch("getRandomPhotos", {
                page: currentPage,
                count: 20,
                photo: image
              });
            } else {
              await this.$store.dispatch("getRandomPhotos", {
                page: currentPage,
                count: 20
              });
            }
            this.showLoader = false;
          }
        });
      });
      observer.observe(this.$refs.infinityScroll);
    },
    lgXlToggle(type, index) {
      if (type === "lg") {
        return index === 2 || index === 3 ? 12 : 6;
      } else if (type === "xl") {
        return index === 2 || index === 3 ? 6 : 3;
      }
    }
  },
  mounted() {
    this.scrollPage();
  }
};
</script>
