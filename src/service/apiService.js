
import { /* computed, */ ref } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../js/Firebase.js';

export const useApiService = (
    
      'apiService', () => {

      //Clients
      const clients = ref([]);
      const getClients = async () => {

          clients.value.length = 0
          const querySnapshot = await getDocs(collection(db, 'test_clients'));
          
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data()
            };
            clients.value.push(note);
          });

      };

      //Clients purchases
      const clientPurchases = ref([]);
      const getClientsPurchases = async () => {

          clientPurchases.value.length = 0
          const querySnapshot = await getDocs(collection(db, 'test_client_purchases'));
          
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data()
            };
            clientPurchases.value.push(note);
          });

      };

      //Books
      const books = ref([]);
      const getBooks = async () => {

          books.value.length = 0
          const querySnapshot = await getDocs(collection(db, 'test_books'));
          
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data()
            };
            books.value.push(note);
          });

      };

      //Clients purchases
      const bookCategories = ref([]);
      const getBookCategories = async () => {

          bookCategories.value.length = 0
          const querySnapshot = await getDocs(collection(db, 'test_book_categories'));
          
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              content: doc.data()
            };
            bookCategories.value.push(note);
          });

      };



      return {
          clients,
          getClients,

          clientPurchases,
          getClientsPurchases,

          books,
          getBooks,

          bookCategories,
          getBookCategories
      };

    });