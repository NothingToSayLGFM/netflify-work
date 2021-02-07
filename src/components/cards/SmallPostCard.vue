<template>
  <v-card class="small-card">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn @click="donwloadPhoto" :href="data.link" class="download-btn">
          <v-icon>mdi-download-outline</v-icon>
        </v-btn>
        <v-img
          v-bind="attrs"
          v-on="on"
          @click="openModal"
          class="white--text align-end small-card__image"
          :src="data.url"
          :lazy-src="data.url"
        ></v-img>
      </template>
      <span v-if="data.description">{{ data.description }}</span>
      <span v-else-if="data.alt_description">{{ data.alt_description }}</span>
      <span v-else>{{ "No description" }}</span>
    </v-tooltip>
    <div class="small-card__text-wrap">
      <v-card-text class="small-card__text">
        <p class="small-card__title mb0">
          <v-btn
            text
            :to="{
              name: 'UserTemplate',
              params: { name: data.userName.username },
            }"
          >{{ data.userName.first_name }}</v-btn>
        </p>
        <p
          class="small-card__subtitle"
        >{{ data.userName.location ? data.userName.location : "No location" }}</p>
        <p class="small-card__description" v-if="data.description">{{ data.description }}</p>
        <p
          class="small-card__description"
          v-else-if="data.alt_description"
        >{{ data.alt_description }}</p>
        <p class="small-card__description" v-else>No description</p>
      </v-card-text>
    </div>
    <div class="small-card__bg-icons">
      <v-card-actions>
        <v-btn :disabled="toggleLike()" icon class="bg-icon" @click="openAddToCollectionModal">
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!data.liked_by_user"
          :disabled="toggleLike()"
          icon
          class="small-card__icon bg-icon"
          @click="like"
        >
          <v-icon>mdi-heart-outline</v-icon>
          {{ data.likes }}
        </v-btn>
        <v-btn
          v-if="data.liked_by_user"
          :disabled="toggleLike()"
          icon
          class="small-card__icon bg-icon"
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
  name: "SmallPostCard",
  props: {
    data: Object
  },
  mounted() {
    console.log(this.data);
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
    donwloadPhoto() {
      this.$store.dispatch("downloadPhoto", this.data.id);
    },
    toggleLike() {
      if (this.currentUser) {
        return false;
      }
      return true;
    },
    async like() {
      await this.$store.dispatch("like", this.data.id);
      // this.data.liked_by_user = true;
      // this.data.likes += 1;
    },
    async unlike() {
      await this.$store.dispatch("unlike", this.data.id);
      // this.data.liked_by_user = false;
      // this.data.likes -= 1;
    },

    openAddToCollectionModal() {
      this.$store.dispatch("openCollectionModal", this.data.id);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.register.currentUser;
    }
  }
};
</script>
