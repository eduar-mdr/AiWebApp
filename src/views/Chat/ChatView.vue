<template>
  <v-container class="container">
      <h1 class="text-grey-darken-1">Chat con Ai</h1>
      <v-divider></v-divider>

      <br><br>
        <!-- <h2 class="text-grey-lighten-1">Contenido</h2> -->
        <div class="messages pa-2">

          <div class="">
            <!-- Messages history -->
            <v-card class="mx-auto" max-width="mx-auto">
              <!-- <v-img
                color="surface-variant"
                height="200"
                src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
                cover
              >
                  <v-toolbar-title color="transparent">
                    <template v-slot:prepend>
                      <v-btn icon="$menu"></v-btn>
                    </template>
    
                  <v-toolbar-title class="text-h6" text="Messages"></v-toolbar-title>
    
                  <template v-slot:append>
                    <v-btn icon="mdi-dots-vertical"></v-btn>
                  </template>
                </v-toolbar>
              </v-img> -->
              <v-card-text>
                <div class="font-weight-bold ms-1 mb-2">Haz preguntas relacionadas a nuestro sistema.</div>
    
                <v-timeline align="start" density="compact">
                  <v-timeline-item
                    v-for="message in messages"
                    :key="message.id"
                    :dot-color="message.color"
                    size="x-small"
                  >
                    <div class="mb-4">
                      <div class="font-weight-normal">
                        <strong>{{ message.sender }}</strong> @{{ message.sender }}
                      </div>
    
                      <div>{{ message.text }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
    
              </v-card-text>
            </v-card>
            <!-- End messages history  -->
          </div>

        </div>
          
        <div class="searchbar pa-2">

          <div block class="">
              <!-- Search bar -->
            <v-card class="mx-auto" color="surface-light" max-width="100%" >
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
            <!-- End Search bar -->
          </div>
      
        </div>

  </v-container>
</template>

<script>

import  model  from '../../service/aiService';

export default {
  name: 'ChatView',
  data() {
    return {
      // Search bar
      loaded: false,
      loading: false,
      UserText: "",
      // End Search bar

      // Chat
      messages: [],

      contextData : null,
      contextClients: null,
      contextClientPurchases: null,
      contextBooks: null,
      contextBookCategories: null,

      apiDataResponse: null
      // End Chat
    }
  },
  methods: {
    /* Get data from Firebase as context */
    async getContextData(){

      //Get context data fro store
      try {
        this.contextClients =  await this.$store.getters.getContextClients       
        this.contextClientPurchases = await this.$store.getters.getContextClientPurchases   
        this.contextBooks = await this.$store.getters.getContextBooks
        this.contextBookCategories = await this.$store.getters.getContextBookCategories 

        if (this.contextBookCategories.length > 0 && this.contextBooks.length > 0 && this.contextClients.length > 0 && this.contextClientPurchases.length > 0) {
          this.contextData = [
            this.contextBookCategories,
            this.contextBooks,
            this.contextClients,
            this.contextClientPurchases
          ];
          console.log('Context data created:');
        } else {
          throw new Error('Error setting context data.');
        }
        //console.log(this.contextData);
      } catch (error) {
        console.log('Something went wrong: '.error);
        setTimeout(() => {
            this.getContextData()
        }, 2000)
      }
      
    },
    /* Send a question from chat bar */
    async onClick() {
      if (this.UserText !== "" && this.UserText !== null && this.contextData != null) {
        
        console.log(this.UserText);
        this.loading = true;

        // Handle message data here
        const botMessage = { id: Date.now() + 1, text: this.UserText, sender: 'Usuario', color: 'text-grey-darken-1' };
        this.messages.push(botMessage);

        setTimeout(() => {
          this.fetchData();
        }, 1000);
      } else {
                // Handle response data 
        const botMessage = { id: Date.now() + 1, text: 'Chat no disponible por el momento...', sender: 'Asistente IA', color: 'teal-accent-4' };
        this.messages.push(botMessage)
      }
    },
    /* Set timeout to a promise */
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    /* Make requests with backoff time rules */
    async makeRequestWithBackoff(apiCall, retries = 5, delay = 1000) {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await apiCall();
          return response;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.log(`Rate limit hit, retrying in ${delay} ms...`);
            await this.sleep(delay);
            delay *= 2; // Exponential backoff
          } else {
            throw error;
          }
        }
      }
      throw new Error('Max retries exceeded');
    },
    /* Run prompt on Gemini Ai GenerativeModel */
    async fetchData() {

      const prompt = this.UserText;
      
      try {
        console.log('In try...');

        const apiCall = () =>  model.generateContent([prompt.concat(' Basado en la siguiente información: ').concat(JSON.stringify(this.contextData))]);
        const result = await this.makeRequestWithBackoff(apiCall);
        const response = await result.response;
        this.apiDataResponse = response.text();
        
        // Handle response data 
        const botMessage = { id: Date.now() + 1, text: this.apiDataResponse, sender: 'Asistente IA', color: 'teal-accent-4' };
        this.messages.push(botMessage)

        this.UserText = ''
        this.loading = false;
        this.loaded = true;

        console.log('End try...');
      } catch (error) {
        console.error(error);

        this.UserText = ''
        this.loading = false;
        this.loaded = true;

      }
    }

  },

  mounted(){
    setTimeout(() => {
        this.getContextData()
    }, 2000)
  }
}
</script>

<style>

.searchbar {
  position: sticky;
  bottom: 0;
  width: 100%;
}

</style>