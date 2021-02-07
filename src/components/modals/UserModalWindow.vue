<template>
  <v-dialog :value="isOpen" @click:outside="closeModal" max-width="1104">
    <v-card class="modal-window">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon class="modal-window__close" @click="closeModal">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-img :lazy-src="data" :src="data"></v-img>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UserModalWindow",
  computed: {
    data() {
      return this.$store.state.user.dataUserModal;
    },
    isOpen() {
      return this.$store.state.user.userModalOpen;
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeUserModal");
    }
  }
};
</script>
