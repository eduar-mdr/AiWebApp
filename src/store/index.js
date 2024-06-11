import { createStore } from 'vuex'

import { useApiService } from '../service/apiService';
const apiService = useApiService();

export default createStore({
  state: {
    globalVar : '',
    GEMINI_API_KEY: '',

    contextData : null,
    contextClients: null ,
    contextClientPurchases: null,
    contextBooks: null,
    contextBookCategories: null,
  },
  getters: {
    getGlobalVar(state){
      return state.globalVar
    },
    getGeminiAiApiKey(state){
      return state.GEMINI_API_KEY
    },
    
    getContextClients(state){

      apiService.getClients();
      state.contextClients = apiService.clients;

      return state.contextClients
    },

    getContextClientPurchases(state){

      apiService.getClientsPurchases();
      state.contextClientPurchases = apiService.clientPurchases;

      return state.contextClientPurchases
    },

    getContextBooks(state){

      apiService.getBooks();
      state.contextBooks = apiService.books;

      return state.contextBooks
    },

    getContextBookCategories(state){
     
      apiService.getBookCategories();
      state.contextBookCategories = apiService.bookCategories;

      return state.contextBookCategories
    }
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
