<template>
  <div>
    <v-container v-if="singlCollection.length > 0">
      <h1 v-if="userData && userData.title">{{userData.title}}</h1>
      <v-row>
        <v-col xl="12" class="text-center" v-if="userData && userData.user">
          <v-avatar width="200" height="200">
            <v-img
              :src="userData.user.profile_image.large"
              :lazy-src="userData.user.profile_image.large"
              alt="image"
            />
          </v-avatar>
          <div class="collection-avatar" v-if="userData && userData.user">
            <p>{{userData.user.name}}</p>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="singlCollection">
        <v-col xl="4" md="6" sm="12" v-for="(photo, index) in singlCollection" :key="index">
          <v-img class="sinlg-image" :lazy-src="photo.urls.regular" :src="photo.urls.regular"></v-img>
        </v-col>
        <div ref="singrlInfinity" id="singl-scroll-trigger"></div>
      </v-row>
      <div class="d-flex justify-center">
        <ChartLoader v-if="showLoader" />
      </div>
    </v-container>
    <div class="d-flex justify-center" v-else>
      <ChartLoader />
    </div>
  </div>
</template>

<script>
import ChartLoader from "../components/charts/ChartLoader";
export default {
  name: "SinglCollection",
  components: {
    ChartLoader
  },
  data: () => ({
    showLoader: false,
    currentPage: 1
  }),
  computed: {
    singlCollection() {
      return this.$store.state.collections.singlCollection;
    },
    userData() {
      return this.$store.state.collections.singlUserData;
    }
  },
  methods: {
    scrollPageSingl() {
      const newObserver = new IntersectionObserver(etries => {
        etries.forEach(async entry => {
          if (entry.intersectionRatio > 0) {
            this.showLoader = true;
            let idx = this.$route.params.id;
            let currentPage = (this.currentPage += 1);
            await this.$store.dispatch("getSinglCollectionScroll", {
              id: idx,
              page: currentPage,
              count: 10
            });
            this.showLoader = false;
          }
        });
      });

      newObserver.observe(this.$refs.singrlInfinity);
    }
  },
  async mounted() {
    await this.$store.dispatch("getSinglCollection", this.$route.params.id);
    await this.$store.dispatch("getUserData", this.$route.params.id);
    this.scrollPageSingl();
  }
};
</script>