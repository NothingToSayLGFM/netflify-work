<template>
  <v-card class="small-card">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-img
          v-bind="attrs"
          v-on="on"
          class="white--text align-end small-card__image"
          :src="image"
          :lazy-src="image"
          @click="openModal(data.urls.raw)"
        ></v-img>
      </template>
      <span>{{ createdAt + " - " + updatedAt }}</span>
    </v-tooltip>
    <div class="small-card__text-wrap">
      <v-card-text class="small-card__text">
        <p>Created: {{ createdAt }}</p>
        <p>Id: {{ data.id }}</p>
        <p>Updated {{ updatedAt }}</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import * as moment from "moment/moment";

export default {
  name: "SmallPostCard",
  props: ["image", "data"],
  computed: {
    createdAt() {
      return moment(this.data.created_at).format("dddd, DD MMMM YYYY");
    },
    updatedAt() {
      return moment(this.data.updated_at).format("dddd, DD MMMM YYYY");
    },
  },
  methods: {
    async openModal(image) {
      this.$store.dispatch("openUserPhotosModal", image);
    },
  },
};
</script>
