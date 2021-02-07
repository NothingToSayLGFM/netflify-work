<template>
  <v-card class="big-card">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="download-btn" @click="downloadPhoto" :href="data.link">
          <v-icon>mdi-download-outline</v-icon>
        </v-btn>
        <v-img
          class="white--text align-end big-card__image"
          v-bind="attrs"
          v-on="on"
          @click="openModal"
          :src="data.url"
          :lazy-src="data.url"
        ></v-img>
      </template>
      <span v-if="data.description">{{ data.description }}</span>
      <span v-else-if="data.alt_description">{{ data.alt_description }}</span>
      <span v-else>{{ "No description" }}</span>
    </v-tooltip>
    <div class="big-card__text-wrap">
      <v-card-text class="big-card__text">
        <p class="big-card__title">
          <v-btn
            text
            :to="{
              name: 'UserTemplate',
              params: { name: data.userName.username },
            }"
          >{{ data.userName.first_name }}</v-btn>
        </p>
        <p
          class="big-card__subtitle"
        >{{ data.userName.location ? data.userName.location : "No location" }}</p>
        <p class="big-card__description" v-if="data.description">{{ data.description }}</p>
        <p class="big-card__description" v-else-if="data.alt_description">{{ data.alt_description }}</p>
        <p class="big-card__description" v-else>No description</p>
      </v-card-text>
      <div class="slick-wrap">
        <p>{{ data.alt_description }}</p>
      </div>
      <v-card-actions class="big-card__bg-icons">
        <v-btn :disabled="toggleLike()" icon @click="openAddToCollectionModal">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!data.liked_by_user"
          :disabled="toggleLike()"
          icon
          class="big-card__icon"
          @click="like"
        >
          <v-icon>mdi-heart-outline</v-icon>
          {{ data.likes }}
        </v-btn>
        <v-btn
          v-if="data.liked_by_user"
          :disabled="toggleLike()"
          icon
          class="big-card__icon"
          @click="unlike"
        >
          <v-icon>mdi-heart</v-icon>
          {{ data.likes }}
        </v-btn>
        <v-btn disabled icon>
          <v-icon>mdi-comment-outline</v-icon>512
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "BigPostCard",
  props: {
    data: Object
  },
  methods: {
    async openModal() {
      try {
        await this.$store.dispatch("getModalPhotos", this.data.tags[0].title);
      } catch (err) {
        console.log("modal error");
      }
      this.$store.dispatch("openPhotosModal", this.data);
    },
    downloadPhoto() {
      this.$store.dispatch("downloadPhoto", this.data.id);
      console.log(this.data);
    },
    toggleLike() {
      if (this.currentUser) {
        return false;
      }
      return true;
    },
    async like() {
      await this.$store.dispatch("like", this.data.id);
      this.data.liked_by_user = true;
      this.data.likes += 1;
    },
    async unlike() {
      await this.$store.dispatch("unlike", this.data.id);
      this.data.liked_by_user = false;
      this.data.likes -= 1;
    },

    openAddToCollectionModal() {
      this.$store.dispatch("openCollectionModal", this.data.id);
    }
  },
  computed: {
    isRegister() {
      return this.$store.state.register.access;
    },
    currentUser() {
      return this.$store.state.register.currentUser;
    }
  },
  mounted() {
    // console.log(this.data);
  }
};
</script>
