<template>
  <section class="day-photo" v-if="getFirstPhoto">
    <div class="day-photo__description">
      <div class="day-photo__description--wrap">
        <h1
          class="day-photo__title"
          v-if="
            getFirstPhoto.userName.first_name &&
              getFirstPhoto.userName.last_name
          "
        >
          Photo of the Day by
          {{
            getFirstPhoto.userName.first_name +
              " " +
              getFirstPhoto.userName.last_name
          }}
        </h1>
        <h1 class="day-photo__title" v-else>
          Photo of the Day by{{ getFirstPhoto.userName.first_name }}
        </h1>
        <p class="day-photo__subtitle">
          The internet’s source of freely usable images. Powered by creators
          everywhere.
        </p>
        <v-btn class="button-green" depressed>Explore All</v-btn>
      </div>
    </div>
    <v-img
      :src="getFirstPhoto.url"
      :lazy-src="getFirstPhoto.url"
      class="day-photo__image"
    ></v-img>
    <SearchPhoto />
  </section>
</template>

<script>
import SearchPhoto from "./SearchPhotos";

export default {
  name: "HeroSection",
  components: {
    SearchPhoto,
  },
  props: {
    getFirstPhoto: [Object, String],
  },
};
</script>
