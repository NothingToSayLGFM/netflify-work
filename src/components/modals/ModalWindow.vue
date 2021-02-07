<template>
  <v-dialog :value="isOpen" @click:outside="closeModal" max-width="1104">
    <v-card class="modal-window">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon class="modal-window__close" @click="closeModal">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-img v-if="data.url" :lazy-src="data.url" :src="data.url"></v-img>
      <div class="modal-window__content">
        <v-btn
          text
          :to="{
            name: 'UserTemplate',
            params: { name: data.userName.username },
          }"
        >
          <v-img
            class="avatar"
            v-if="data.userName.profile_image"
            :src="data.userName.profile_image.medium"
            :lazy-src="data.userName.profile_image.medium"
          ></v-img>
        </v-btn>
        <div class="avatar-text">
          <v-btn
            text
            :to="{
              name: 'UserTemplate',
              params: { name: data.userName.username },
            }"
          >
            <p class="avatar-name" v-if="data.userName.last_name">
              {{ data.userName.first_name + " " + data.userName.last_name }}
            </p>
            <p class="avatar-name" v-else>{{ data.userName.first_name }}</p>
          </v-btn>
          <p class="avatar-social" v-if="data.userName.instagram_username">
            <a
              target="_blank"
              :href="
                'https://www.instagram.com/' +
                  data.userName.instagram_username +
                  '/'
              "
              >@{{ data.userName.instagram_username }}</a
            >
          </p>

          <p class="avatar-social" v-else>No instagram</p>
        </div>
      </div>
      <div class="mt-5">
        <p>
          Location:
          {{ data.userName.location ? data.userName.location : "No location" }}
        </p>
        <p>
          Portfolio:
          <a :href="data.userName.portfolio_url" target="_blank">{{
            data.userName.portfolio_url
          }}</a>
        </p>
        <p>Counts Photos: {{ data.userName.total_photos }}</p>
        <p v-if="data.likes">Total likes: {{ data.likes }}</p>
        <p v-else-if="chartData.like_count">
          Total likes: {{ chartData.like_count }}
        </p>
        <p v-if="data.tags">
          Tags:
          <span
            class="modal-window__tag"
            v-for="(tag, index) in data.tags"
            :key="index"
            >{{ tag.title }}</span
          >
        </p>
        <p v-if="data.description">{{ data.description }}</p>
        <p v-else-if="data.alt_description">{{ data.alt_description }}</p>
        <p v-else>No description</p>
      </div>
      <div>
        <v-row>
          <v-col lg="6" xl="6" md="12">
            <PieChart v-if="chartData" :chartData="chartData" />
            <ChartLoader v-else />
          </v-col>
          <v-col lg="6" xl="6" md="12">
            <LineChart v-if="chartData" :chartData="chartData" />
            <ChartLoader v-else />
          </v-col>
        </v-row>
      </div>
      <hr />
      <h3 class="text-center mt-10">
        Similar photos
      </h3>
      <div v-if="images.length > 0">
        <div class="modal-window__gallery">
          <v-img
            class="gallry-image small-image"
            v-for="(image, index) in images"
            :key="index"
            :src="image.url"
            :lazy-src="image.url"
            @click="openAnotherImage(image)"
          ></v-img>
          <div ref="modalIfinity" id="scroll-trigger"></div>
        </div>
        <div class="d-flex justify-center">
          <ChartLoader v-if="showLoader" />
        </div>
      </div>

      <div class="modal-window__gallery" v-else>
        <h3 class="text-center">Nothing found!</h3>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";
import ChartLoader from "../charts/ChartLoader";

export default {
  name: "ModalWindow",
  components: { PieChart, LineChart, ChartLoader },
  data: () => ({
    showLoader: false,
    currentPage: 1,
  }),
  computed: {
    data() {
      return this.$store.state.modalWindow.dataModal;
    },
    isOpen() {
      return this.$store.state.modalWindow.isPhotosModalOpen;
    },
    images() {
      return this.$store.state.modalWindow.modalImages;
    },
    chartData() {
      return this.$store.state.modalWindow.chartsData;
    },
  },
  async mounted() {
    await this.$store.dispatch("getChartsData", this.data.id);
    this.scrollModal();
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal");
    },
    async openAnotherImage(image) {
      this.$store.dispatch("openPhotosModal", image);
      await this.$store.dispatch("openPhotosModal", image);
      await this.$store.dispatch("getChartsData", image.id);
    },
    scrollModal() {
      if (this.images.length > 0) {
        const newObserver = new IntersectionObserver((etries) => {
          etries.forEach(async (entry) => {
            if (entry.intersectionRatio > 0) {
              this.showLoader = true;
              let category = this.data.tags[1].title;
              let currentPage = (this.currentPage += 1);
              await this.$store.dispatch("getScrollPhotos", {
                page: currentPage,
                cat: category,
              });
              this.showLoader = false;
            }
          });
        });
        newObserver.observe(this.$refs.modalIfinity);
      }
    },
  },
};
</script>
