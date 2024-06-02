<template>
  <!-- Shows a application bar -->
  <v-app-bar 
  color="teal-accent-4"
  scroll-behavior="inverted fade-image"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title>Reto AI</v-app-bar-title>
    <!-- Button to navigate to home route / -->
    <v-btn icon="mdi-home" to="/"></v-btn>
    <!-- Button to add a menu options -->
    <v-btn icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
};
</script>
