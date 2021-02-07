<template>
  <div>
    <v-container v-if="collections">
      <h1>Featured Collections</h1>
      <ul v-if="collections" class="featured-list">
        <v-row>
          <v-col
            xl="4"
            lg="4"
            md="8"
            sm="12"
            v-for="(collection, index) in collections"
            :key="index"
          >
            <router-link
              :to="{
            name: 'SinglCollection',
            params: { id: collection.id },
          }"
            >
              <li class="featured-img">
                <v-img
                  width="100%"
                  height="300px"
                  :lazy-src="collection.cover_photo.urls.regular"
                  :src="collection.cover_photo.urls.regular"
                ></v-img>
                <div class="featured-title">
                  <p>{{collection.title}}</p>
                </div>
              </li>
            </router-link>
          </v-col>
          <div ref="newInfinity" id="scroll-trigger"></div>
        </v-row>
        <div class="d-flex justify-center">
          <ChartLoader v-if="showLoader" />
        </div>
      </ul>
    </v-container>
    <div v-else class="d-flex justify-center">
      <ChartLoader v-if="showLoader" />
    </div>
  </div>
</template>


<script>
import ChartLoader from "../components/charts/ChartLoader";

export default {
  name: "FuturedCollection",
  components: {
    ChartLoader
  },
  data: () => ({
    showLoader: false,
    currentPage: 1
  }),
  computed: {
    collections() {
      return this.$store.state.collections.collections[0];
    }
  },
  methods: {
    scrollPageFutured() {
      const newObserver = new IntersectionObserver(etries => {
        etries.forEach(async entry => {
          if (entry.intersectionRatio > 0) {
            this.showLoader = true;
            let currentPage = (this.currentPage += 1);
            await this.$store.dispatch("getCollections", {
              count: 10,
              page: currentPage
            });
            this.showLoader = false;
          }
        });
      });
      newObserver.observe(this.$refs.newInfinity);
    }
  },

  async mounted() {
    await this.$store.dispatch("getCollections", {});
    this.scrollPageFutured();
  }
};
</script>