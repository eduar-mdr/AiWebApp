<template>
<v-container :fluid=true>
    <h1 class="text-grey-darken-1">Clientes</h1>
    <h2 class="text-grey-lighten-1">Contenido</h2>
    <v-table density="compact" v-show="data">
    <thead>
      <tr>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Correo
        </th>
        <th class="text-left">
          Intereses
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in data"
        :key="item?.id"
      >
        <td>{{ item?.content?.name }} {{ item?.content?.last_name }}</td>
        <td>{{ item?.content?.email }} </td>
        <td >
            <v-chip variant="flat"  size="small" v-for="interest in item?.content?.interests" :key="interest"  class="text-center">
            {{ interest }}
            </v-chip>
        </td>
      </tr>
    </tbody>
  </v-table>
</v-container>
</template>

<script>

export default {
    name: 'ClientsView',
    data(){
        return{
            data:null
        }
    },
    methods: {
        getClients(){
            this.data = this.$store.getters.getContextClients
            console.log(this.data);
        }
    },

    mounted(){
        setTimeout(() => {
           this.getClients()
        }, 2000)
    }
}
</script>