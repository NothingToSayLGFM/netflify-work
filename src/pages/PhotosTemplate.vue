<template>
  <div>
    <HeroSection :getFirstPhoto="getFirstPhoto" />
    <v-container>
      <v-row class="text-center">
        <v-col xl="4">
          <v-btn
            class="filter-button"
            @click="filterOrientetion('landscape')"
            depressed
            x-large
            rounded
          >landscape</v-btn>
        </v-col>
        <v-col xl="4">
          <v-btn
            class="filter-button"
            @click="filterOrientetion('portrait')"
            depressed
            x-large
            rounded
          >portrait</v-btn>
        </v-col>
        <v-col xl="4">
          <v-btn
            class="filter-button"
            @click="filterOrientetion('squarish')"
            depressed
            x-large
            rounded
          >squarish</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <CardsSection :getRandomPhotos="getRandomPhotos" />
    <ModalWindow v-if="renderModalWindow" />
    <ErrorModal />
    <CollectionWindow v-if="renderCollectionWindow" />
  </div>
</template>

<script>
import HeroSection from "../components/header/HeroSection";
import CardsSection from "../components/cards/CardsSection";
import ModalWindow from "../components/modals/ModalWindow";
import ErrorModal from "../components/modals/ErrorModal";
import CollectionWindow from "../components/modals/CollectionWindow";

export default {
  name: "PhotosTemplate",
  components: {
    HeroSection,
    CardsSection,
    ModalWindow,
    ErrorModal,
    CollectionWindow
  },
  async mounted() {
    if (this.$store.state.currentOrientetion) {
      let buttons = document.querySelectorAll(".filter-button");
      buttons.forEach(item => {
        if (item.innerText === this.currentOrientetion) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
    await this.$store.dispatch("getRandomPhotos", {});
    console.log(this.getRandomPhotos);
  },
  computed: {
    getRandomPhotos() {
      return this.$store.state.randomPhotos[0];
    },
    getFirstPhoto() {
      if (this.$store.state.randomPhotos) {
        if (this.$store.state.randomPhotos[0]) {
          if (this.$store.state.randomPhotos[0][0]) {
            const firstPhoto = this.$store.state.randomPhotos[0][0];
            return firstPhoto ? firstPhoto : "";
          }
        }
      }
      return "";
    },
    renderModalWindow() {
      return this.$store.state.modalWindow.isPhotosModalOpen;
    },
    searchImage() {
      return this.$store.state.searchImage;
    },
    currentOrientetion() {
      return this.$store.state.currentOrientetion;
    },
    renderCollectionWindow() {
      return this.$store.state.register.collectionModalOpen;
    }
  },
  // watch: {
  //   getRandomPhotos() {
  //     console.log(this.$store.state.randomPhotos[0]);
  //   }
  // },
  methods: {
    async filterOrientetion(ori) {
      this.$store.commit("setOrientetion", ori);
      let buttons = document.querySelectorAll(".filter-button");
      let current =
        this.currentOrientetion[0].toUpperCase() +
        this.currentOrientetion.slice(1);
      buttons.forEach(item => {
        if (item.innerText === current) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
      await this.$store.dispatch("getOrientation", {
        orientation: ori
      });
    }
  }
};
</script>
