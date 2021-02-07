<template>
  <div id="app">
    <v-app id="inspire">
      <v-toolbar height="100px" class="navbar" flat>
        <Header />
      </v-toolbar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import Header from "./components/header/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
