<template>
  <v-form @submit.prevent="getSearchPhotos">
    <v-card outlined class="search-photo site-container">
      <v-text-field
        placeholder="Search for hight-resolution photos"
        class="search-photo__input"
        filled
        light
        hide-details
        required
        :rules="photoRules"
        v-model="searchPhoto"
      >
        <template v-slot:prepend>
          <v-img src="../../assets/img/iconuser-copy-2.svg" class="search-image"></v-img>
        </template>
      </v-text-field>
      <v-card-actions class="search-list-buttons">
        <v-btn
          v-for="button in buttons"
          :key="button"
          depressed
          outlined
          rounded
          @click="getButtonPhotos(button)"
          class="search-button"
        >{{ button }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "SearchPhotos",
  data: () => ({
    buttons: [
      "Space",
      "Nature",
      "Travel",
      "Animals",
      "Food",
      "Health",
      "Technology",
      "Events"
    ],
    photoRules: [v => !!v || "Input is required"],
    searchPhoto: ""
  }),
  computed: {
    currentCategory() {
      return this.$store.state.currentCategory;
    }
  },
  methods: {
    async getSearchPhotos() {
      try {
        if (this.searchPhoto === "") {
          return;
        }
        if (this.searchPhoto !== "") {
          let searchPhoto = this.searchPhoto;
          this.$store.commit("setSearchScroll", searchPhoto);
          await this.$store.dispatch("getRandomPhotos", { photo: searchPhoto });
          this.searchPhoto = "";
        }
      } catch (err) {
        console.log("search error");
      }
    },
    async getButtonPhotos(button) {
      this.$store.commit("setCategory", button);
      try {
        if (button) {
          this.$store.commit("setSearchScroll", button);
          await this.$store.dispatch("getRandomPhotos", { photo: button });
          let buttons = document.querySelectorAll(".search-button");
          buttons.forEach(item => {
            if (item.innerText === this.currentCategory) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      } catch (err) {
        return;
      }
    }
  },
  mounted() {
    if (this.currentCategory) {
      let buttons = document.querySelectorAll(".search-button");
      buttons.forEach(item => {
        if (item.innerText === this.currentCategory) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
  }
};
</script>
