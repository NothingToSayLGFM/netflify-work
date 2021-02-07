<template>
  <v-dialog :value="!isOpen" @click:outside="closeModal" max-width="500">
    <v-card class="modal-window">
      <v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon class="modal-window__close" @click="closeModal">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-card-actions>
        <h2 class="text-center mb-10">Nothing found, please try again</h2>
      </v-container>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
  name: "ErrorModal",
  computed: {
    isOpen() {
      return this.$store.state.hasFound;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeHasFound");
    }
  }
};
</script>