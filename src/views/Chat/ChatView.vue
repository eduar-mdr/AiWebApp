<template>
  <v-container :fluid=true>
      <h1 class="text-grey-darken-1">Chat con Ai</h1>

      <v-divider> </v-divider>
      <br>
      <v-row>
        <v-col cols="12">
          <v-card
            class="mx-auto"
            color="surface-light"
            max-width="100%"
          >
          <v-card-text>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="Escribe tu pregunta aquí..."
              variant="solo"
              hide-details
              single-line
              @click:append-inner="onClick"
              v-model="UserText"
              clearable
            ></v-text-field>
          </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <br>
      <v-divider> </v-divider>

      <h2 class="text-grey-lighten-1">Contenido</h2>

  </v-container>
</template>

<script>

/* Google AI imports */
/* End Google AI imports */


export default {
  name: 'ChatView',
  data(){
    return{
      //Search bar
      loaded: false,
      loading: false,
      UserText: ""
      //End Search bar
    }
  },
  methods: {
      onClick () {
        if (this.UserText != "" && this.UserText != null) {
          
          this.loading = true
          console.log(this.UserText);
          setTimeout(() => {
            this.loading = false
            this.loaded = true
          }, 2000)

        }
      },
    },
}
</script>