<template>
  <v-app>

    <!-- Menú lateral -->
    <v-navigation-drawer class="bg-grey-lighten-1" theme="dark" expand-on-hover  >

      <v-list-item title="Reto AI" subtitle=""></v-list-item>
      <v-divider> </v-divider>

      <v-list-item link to="/" title="Inicio" prepend-icon="mdi-home"></v-list-item>

      <v-list-item title="App" subtitle=""></v-list-item>
      <v-divider> </v-divider>
      <v-list-item link to="/aiapp/chat" title="Chat" prepend-icon="mdi-widgets"></v-list-item>
      <v-list-item link to="/aiapp/clients" title="Clientes" prepend-icon="mdi-clock-time-eight"></v-list-item>
      <v-list-item link to="/aiapp/products" title="Productos" prepend-icon="mdi-food"></v-list-item>
      
      <template v-slot:append>
          <div class="pa-2">
            <v-btn block class="bg-grey-lighten-4" >
              Salir
            </v-btn>
          </div>
        </template>

    </v-navigation-drawer>
<!-- Carga de componentes -->

    <v-main>
      <AppBar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from './components/AppBar.vue'

export default {
  name: 'App',
  components: {
    AppBar
  },

  data: () => ({
    //
  }),
}
</script>
