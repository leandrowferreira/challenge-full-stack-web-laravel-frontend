<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Consulta de alunos</h1>

        <v-container fluid class="my-5">

            <v-data-table
                dense
                item-key="id"
                :headers="headers"
                :items="students"
                :search="search"
                class="elevation-1"
            >

            </v-data-table>
        </v-container>



    </div>
</template>

<script>
    export default {
        data: () => ({

            students: [
                {id: 1,ra: '9876', name: 'Lorem ipsum dolor',     cpf: '123.456.789-10'},
                {id: 2,ra: '9877', name: 'Ut arcu purus maximus', cpf: '124.457.790-11'},
                {id: 3,ra: '9878', name: 'Mauris commodo nibh',   cpf: '125.458.791-12'},
                {id: 4,ra: '9879', name: 'Aenean vitae justo',    cpf: '126.459.792-13'},
                {id: 5,ra: '9880', name: 'Maecenas porta turpis', cpf: '127.460.793-14'},
            ],
        }),

        computed: {

            //The Datatable header. We didn't implement i8n yet, but it's
            //a good idea to prepare apps to round the world
            headers () {
                return [
                    { text: 'RA',    value: 'ra',   width:'10%', },
                    { text: 'Nome',  value: 'name', width:'50%', },
                    { text: 'CPF',   value: 'cpf',  width:'20%', },
                    { text: 'Ações', value: 'id',   width:'10%', sortable: false },
                ]
            },

        },
    }
</script>