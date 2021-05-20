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

                <template v-slot:top>
                    <v-layout wrap justify-space-between>
                        <v-flex xs12 md10>
                            <v-text-field v-model="search" label="Pesquisar" class="mx-4"></v-text-field>
                        </v-flex>

                        <v-flex xs12 md2 class="text-right">

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mx-4 my-4" to="/create" color="primary" fab large dark v-bind="attrs" v-on="on">
                                        <v-icon>mdi-account-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cadastrar aluno</span>
                            </v-tooltip>

                        </v-flex>

                    </v-layout>
                </template>

                <template v-slot:[`item.ra`]="{ value }">
                    <span>{{ ('0000' + value).substr(-4) }}</span>
                </template>

                <template v-slot:[`item.cpf`]="{ value }">
                    <span>{{ value.substr(0,3) + '.' + value.substr(3,3) + '.' + value.substr(6,3) + '-' + value.substr(9,2) }}</span>
                </template>

                <template v-slot:[`item.id`]="{ value }">
                    <v-btn class="mt-2 mr-4 grey--text text--darken-1" small text :to="'/' + value + '/edit'">
                        <v-icon left>mdi-account-edit</v-icon> Editar
                    </v-btn>

                    <v-btn class="mb-2 grey--text text--darken-1" small text @click="userDelete(value)">
                        <v-icon left>mdi-account-cancel</v-icon> Excluir
                    </v-btn>
                </template>

            </v-data-table>
        </v-container>

        <confirm-dialog :show="showDialog" :cancel="cancel" :confirm="confirm" :title="modal.title" :description="modal.text" />

    </div>
</template>

<script>

    import ConfirmDialog from '../components/ConfirmDialog'

    export default {

        components: {ConfirmDialog},

        data: () => ({



            //The search filter
            search: '',

            //Student's array
            students: [
                {id: 1,ra: '998',  name: 'Lorem ipsum dolor',     cpf: '12345678910'},
                {id: 2,ra: '999',  name: 'Ut arcu purus maximus', cpf: '12445779011'},
                {id: 3,ra: '1000', name: 'Mauris commodo nibh',   cpf: '12545879112'},
                {id: 4,ra: '1001', name: 'Aenean vitae justo',    cpf: '12645979213'},
                {id: 5,ra: '1002', name: 'Maecenas porta turpis', cpf: '12746079314'},
            ],

            //Modal control for excluding records
            showDialog: false,
            excludingId: null,
            modal:{
                title: 'Hic sunt dracones',
                text:  'Tem certeza de que quer excluir este aluno?',
            },

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

        methods: {

            //Show modal to confirm deleting
            userDelete(id) {
                this.excludingId = id
                this.showDialog = true
            },

            //Not for now... Just hide modal
            cancel() {
                this.showDialog = false
                this.excludingId = null
            },

            //Proceed to removing register
            confirm() {
                this.showDialog = false

                console.log('excluding ' + this.excludingId)
            }

        },
    }
</script>