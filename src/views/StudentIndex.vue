<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Consulta de alunos</h1>

        <v-container fluid class="my-5">

            <v-alert v-show="msg.length" outlined type="warning" prominent border="left" v-html="msg"></v-alert>

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

    import Axios from 'axios'
    import ConfirmDialog from '../components/ConfirmDialog'

    // Create global Axios instance using the fixed params
    // @TODO: Store these params using Vuex
    const async = Axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:8000/api/v1/'
    })

    export default {

        components: {ConfirmDialog},

        data: () => ({

            //The search filter
            search: '',

            //Student's array
            //For sake of simplicity, the API does not implement
            //pagination. So, all records are present in frontend
            //at same time, an approach not so good for real life
            students: [],

            //Modal control for excluding records
            showDialog: false,
            excludingId: null,
            modal:{
                title: 'Hic sunt dracones',
                text:  'Tem certeza de que quer excluir este aluno?',
            },

            //The alert message
            msg: '',
        }),

        mounted() {

            // Do login
            async.post('auth/login', {
                email:    'admin@edtech.tmp.br',
                password: 'password'
            })
                .then(response => {
                    switch (response.status) {
                        case 200:
                            async.defaults.headers.common['Accept'] = 'application/json'
                            async.defaults.headers.common['Authorization'] = response.data.token_type + ' ' + response.data.access_token

                            this.init()
                        break

                        default:
                            this.$router.push('login');
                        break
                    }
                })
                .catch(e => {
                    if (e.response) {
                        switch (e.response.status) {
                            case 401:
                                self.$router.push('login');
                            break
                        }
                    }
                })
        },

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

            init() {

                //Get user's list from API
                //Notice that the query param is present to filter
                //users and return only students to this front
                async.get('users?role=students')

                    .then(response => {
                        switch (response.status) {

                            //No errors, data incoming 😀
                            case 200:
                                this.students = response.data.data
                            break

                            //Nonsense, given we know our own API
                            default:
                                this.$router.push('login');
                            break;
                        }
                    })

                    .catch(e => {
                        if (e.response) {
                            switch(e.response.status) {
                                case 401:
                                    this.$router.push('login');
                                break

                                default:
                                    this.msg = 'Erro HTTP ' + e.response.status
                                break
                            }
                        }
                    })
            },

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

                async.delete('users/' + this.excludingId)

                    .then(response => {
                        switch(response.status) {
                            case 204:
                                this.msg = 'Registro excluído'
                                this.search = ''
                                this.removeItemById(this.excludingId)
                            break

                            default:
                            break
                        }
                    })

                    .catch(e => {
                        if (e.response) {
                            switch(e.response.status) {
                                case 404:
                                    this.msg = 'Registro não encontrado'
                                break

                                case 401:
                                    this.msg = 'Registro não encontrado'
                                    this.$router.push('login');
                                break

                                default:
                                    this.msg = 'Erro HTTP ' + e.response.status
                                break
                            }
                        }
                    })

            },

            removeItemById(id) {
                this.students = this.students.filter((item) => {
                    return item.id != id
                })
            },
        },
    }
</script>