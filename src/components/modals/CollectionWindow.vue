<template>
  <v-dialog :value="isOpen" @click:outside="closeModal" max-width="1104">
    <v-card class="modal-window">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon class="modal-window__close" @click="closeModal">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card-actions>
      <div class="mb-5">
        <h3 class="text-center mb-4">Chose collection</h3>
        <div v-if="collections !== null && collections.length > 0">
          <v-btn
            class="mt-3 mb-3"
            v-for="(collection, index) in collections"
            :key="index"
            block
            @click="addPhotoToCollection(collection.id)"
          >{{collection.title}}</v-btn>
        </div>
        <h4 v-else class="text-center">Nothing Found</h4>
      </div>

      <div>
        <hr />
        <h3 class="text-center mt-2">Create Collection</h3>
        <v-form @submit.prevent="submitCollection">
          <v-text-field label="Title" v-model="title" :rules="titleRules" required></v-text-field>
          <v-textarea v-model="desc" name="input-7-4" label="Description" hint="Optional"></v-textarea>
          <v-btn class="mr-4" type="submit">create</v-btn>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CollectionModal",
  data: () => ({
    title: "",
    desc: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 35) || "Name must be less than 35 characters"
    ]
  }),
  mounted() {
    console.log(this.collections, this.currentPhotoId);
  },
  computed: {
    isOpen() {
      return this.$store.state.register.collectionModalOpen;
    },
    collections() {
      return this.$store.state.register.currentUserCollections;
    },
    currentPhotoId() {
      return this.$store.state.register.currentAddingPhoto;
    }
  },
  methods: {
    async addPhotoToCollection(id) {
      let photo = this.currentPhotoId;
      await this.$store.dispatch("addPhotoToCollection", {
        collId: id,
        photoId: photo
      });
    },
    closeModal() {
      this.$store.dispatch("closeCollectionModal");
    },
    async submitCollection() {
      if (this.title !== "" && this.desc !== "") {
        let titleCollection = this.title;
        let descCollection = this.desc;
        await this.$store.dispatch("createCollection", {
          title: titleCollection,
          desc: descCollection
        });
      } else {
        if (this.title !== "" && this.desc === "") {
          let titleCollection = this.title;
          await this.$store.dispatch("createCollection", {
            title: titleCollection
          });
        }
      }
    }
  }
};
</script>
