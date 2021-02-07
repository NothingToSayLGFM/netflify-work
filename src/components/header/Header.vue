<template>
  <v-container class="menu-container">
    <v-toolbar-items class="hidden-sm-and-down navbar__items">
      <v-btn text class="item" to="/">Home</v-btn>
      <v-btn
        text
        class="item"
        :to="{
          name: 'FuturedCollection',
        }"
      >Featured collections</v-btn>
      <v-btn
        v-if="currentUser !== null && currentUser !== 'loaded'"
        text
        class="item"
        :to="{ name: 'MyProfile', params: { name: currentUser.username } }"
      >My Profile</v-btn>
      <v-btn v-else-if="currentUser === 'loaded'" loading text class="item"></v-btn>
      <v-btn text class="icon" @click="auth" v-if="!isRegister">
        <v-img src="../../assets/img/iconuser.svg" class="nav-icon"></v-img>
      </v-btn>
      <v-btn text class="icon" @click="logOut" to="/" v-else-if="isRegister !== null">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      <v-btn text class="icon">
        <v-img src="../../assets/img/iconuser-copy-2.svg" class="nav-icon"></v-img>
      </v-btn>
    </v-toolbar-items>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon class="hidden-md-and-up" v-on="on"></v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text class="item" to="/">Home</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text class="item" href="#">Featured collections</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text class="item" href="#">My Profile</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text class="icon">
                <v-img src="../../assets/img/iconuser.svg" class="nav-icon"></v-img>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn text class="icon">
                <v-img src="../../assets/img/iconuser-copy-2.svg" class="nav-icon"></v-img>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  name: "Header",

  methods: {
    auth() {
      this.$store.dispatch("getToken");
    },
    logOut() {
      this.$store.dispatch("logOut");
    }
  },
  mounted() {
    if (this.isRegister && !this.isRegister.error) {
      if (this.isRegister.access_token) {
        this.$store.dispatch("refreshToken", this.isRegister.access_token);
      }
    }

    if (this.$route.query.code) {
      this.$store.dispatch("authorization", this.$route.query.code);
    }
  },
  computed: {
    isRegister() {
      return this.$store.state.register.access;
    },
    currentUser() {
      return this.$store.state.register.currentUser;
    }
  }
};
</script>
