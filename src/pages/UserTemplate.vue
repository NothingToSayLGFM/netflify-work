<template>
  <div>
    <v-container class="user">
      <v-row v-if="userData">
        <v-col xl="12" lg="12">
          <v-card class="mx-auto user__card" max-width="100%" outlined>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1 user-title">{{
                  userData.username
                }}</v-list-item-title>
                <p class="mt-3">
                  BIO:
                  {{ userData.bio }}
                </p>
                <p class="mt-3">Followers: {{ userData.followers_count }}</p>
                <p class="mt-3">Followings: {{ userData.following_count }}</p>
                <p class="mt-3">Location: {{ userData.location }}</p>
                <p class="mt-3">Total likes: {{ userData.total_likes }}</p>
                <p class="mt-3">Total Photos: {{ userData.total_photos }}</p>
                <p class="mt-3">Total downloads: {{ userData.downloads }}</p>
              </v-list-item-content>
              <div>
                <v-avatar width="200" height="200">
                  <v-img
                    v-if="userData.profile_image.large"
                    :src="userData.profile_image.large"
                    :lazy-src="userData.profile_image.large"
                    alt="image"
                  />
                </v-avatar>
                <p class="text-center mb-0 mt-3">{{ userData.name }}</p>
                <p
                  class="text-center mb-0 mt-2 user-icon"
                  v-if="userData.instagram_username"
                >
                  <v-icon>mdi-instagram</v-icon>
                  <a
                    target="_blank"
                    :href="
                      'https://www.instagram.com/' +
                        userData.instagram_username +
                        '/'
                    "
                    >@{{ userData.instagram_username }}</a
                  >
                </p>
                <p
                  v-if="userData.twitter_username"
                  class="text-center mb-0 user-icon"
                >
                  <a
                    target="_blank"
                    :href="'https://twitter.com/' + userData.instagram_username"
                  >
                    <v-icon>mdi-twitter</v-icon>
                    tw.{{ userData.instagram_username }}
                  </a>
                </p>
                <p v-if="userData.location" class="text-center mt-0 user-icon">
                  <v-icon>mdi-earth</v-icon>
                  {{ userData.location }}
                </p>
              </div>
            </v-list-item>
            <h4 class="text-center">Photos</h4>
            <v-row v-if="userData.photos.length > 0">
              <v-col
                lg="6"
                xl="6"
                v-for="image in userData.photos"
                :key="image.id"
              >
                <UserCard :image="image.urls.regular" :data="image" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-tabs v-model="tab" background-color="#767676" dark>
          <v-tab>
            Photo Likes
          </v-tab>
          <v-tab>
            Collections
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-if="likesPhotos">
            <v-card flat v-if="likesPhotos.length > 0">
              <v-row>
                <v-col
                  xl="3"
                  lg="3"
                  md="3"
                  sm="12"
                  v-for="(photo, index) in likesPhotos"
                  :key="index"
                >
                  <v-img
                    height="185px"
                    v-if="photo && photo.urls"
                    :src="photo.urls.regular"
                    :lazy-src="photo.urls.regular"
                    class="tab-image-user"
                    @click="openModal(photo.urls.regular)"
                  ></v-img
                ></v-col>
              </v-row>
            </v-card>
            <h3 v-else class="text-center">Nothing found</h3>
          </v-tab-item>
          <v-tab-item v-if="userCollections">
            <v-card flat v-if="userCollections.length > 0">
              <v-row>
                <v-col
                  xl="3"
                  lg="3"
                  md="3"
                  sm="12"
                  v-for="(photo, index) in userCollections"
                  :key="index"
                >
                  <router-link
                    :to="{
                      name: 'SinglCollection',
                      params: { id: photo.id },
                    }"
                  >
                    <v-img
                      height="185px"
                      v-if="
                        photo && photo.cover_photo && photo.cover_photo.urls
                      "
                      :src="photo.cover_photo.urls.regular"
                      class="tab-image-user"
                    ></v-img>
                  </router-link>
                </v-col>
              </v-row>
            </v-card>
            <h3 v-else class="text-center">Nothing found</h3>
          </v-tab-item>
        </v-tabs-items>
      </v-row>

      <div class="d-flex justify-center align-items-center" v-else>
        <ChartLoader />
      </div>
    </v-container>
    <UserModalWindow v-if="renderModalWindow" />
  </div>
</template>

<script>
import ChartLoader from "../components/charts/ChartLoader";
import UserModalWindow from "../components/modals/UserModalWindow";
import UserCard from "../components/cards/UserCard";

export default {
  name: "UserTemplate",
  components: {
    ChartLoader,
    UserModalWindow,
    UserCard,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    userData() {
      return this.$store.state.user.userData;
    },
    modal() {
      return this.$store.state.modalWindow.isPhotosModalOpen;
    },
    renderModalWindow() {
      return this.$store.state.user.userModalOpen;
    },
    likesPhotos() {
      return this.$store.state.user.likesPhotos;
    },
    userCollections() {
      return this.$store.state.user.userColl;
    },
  },
  async mounted() {
    await this.$store.dispatch("getUserData", this.$route.params.name);
    await this.$store.dispatch("getUserLikesPhotos", this.$route.params.name);
    await this.$store.dispatch("getUserColls", this.$route.params.name);
    if (this.modal) {
      this.$store.dispatch("closeModal");
    }
  },
  methods: {
    async openModal(image) {
      this.$store.dispatch("openUserPhotosModal", image);
    },
  },
};
</script>
