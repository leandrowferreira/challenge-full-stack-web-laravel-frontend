<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Consulta de alunos</h1>

        <v-container fluid class="my-5">

            <!-- Feedback message (deleted record) -->
            <v-alert
                outlined
                prominent
                v-html="msg"
                border="left"
                type="warning"
                v-show="msg.length"
            />

            <!-- The glorious and unbeatable Vuetify Data Table -->
            <v-data-table
                dense
                item-key="id"
                :search="search"
                :items="students"
                :headers="headers"
                class="elevation-1"
            >

                <!-- Table top: search field and 'create' button -->
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

                <!-- RA cell: leading zeroes to four-digit length -->
                <template v-slot:[`item.ra`]="{ value }">
                    <span>{{ ('0000' + value).substr(-4) }}</span>
                </template>

                <!-- -CPF cell: add formatting -->
                <template v-slot:[`item.cpf`]="{ value }">
                    <span>{{ value.substr(0,3) + '.' + value.substr(3,3) + '.' + value.substr(6,3) + '-' + value.substr(9,2) }}</span>
                </template>

                <!-- Actions cell: add buttons based upon record id -->
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

        <!-- Confirmation dialog custom component -->
        <confirm-dialog
            :show="showDialog"
            :cancel="cancel"
            :confirm="confirm"
            :title="modal.title"
            :description="modal.text"
        />

    </div>
</template>

<script>

    import Axios from 'axios'
    import ConfirmDialog from '../components/ConfirmDialog'


    /**
     * Local instance of AXIOS
     * @DOLATER: implements via Vuex
     */
    const async = Axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:8000/api/v1/',
        headers: {'Accept': 'application/json'},
    })

    export default {

        components: {

            /**
             * Confirmation dialog (to confirm deletion)
             */
            ConfirmDialog
        },


        data: () => ({

            /**
             * The search filter
             */
            search: '',


            /**
             * Student's array
             *
             * For sake of simplicity, the API does not implement
             * pagination. So, all records are present in frontend
             * at same time, an approach not so good for real life
             */
            students: [],


            /**
             * Modal controls for excluding records
             */
            showDialog: false,
            excludingId: null,
            modal:{
                title: 'Hic sunt dracones',
                text:  'Tem certeza de que quer excluir este aluno?',
            },


            /**
             * The alert message: a list of errors came from API
             */
            msg: '',
        }),


        mounted() {

            /**
             * Do login
             *
             * The authentication stories were not covered by this challenge.
             * So, login is here for demonstration purpouses only, to show
             * that the API access is protected via Bearer token, almost
             * often obtained using an authentication form
             *
             * @DOLATER: remove from here and implement via Vuex State Management
             */
            async.post('auth/login', {
                email:    this.$userName,
                password: this.$password
            })
                .then(response => {
                    switch (response.status) {
                        case 200:
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

            /**
             * The Datatable header. We didn't implement i8n yet, but it's
             * a good idea to prepare apps to round the world
             */
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

            /**
             * Get user list from API
             * Notice that the query param is present to filter
             * users and return only students to this front
             */
            init() {

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


            /**
             * Show modal to confirm deleting
             */
            userDelete(id) {
                this.excludingId = id
                this.showDialog = true
            },


            /**
             * Not for now... Just hide modal and hasta la vista 😎
             */
            cancel() {
                this.showDialog = false
                this.excludingId = null
            },


            /**
             * Proceed to removing register
             */
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


            /**
             * Remove item from local list, so we don't need
             * to reload all the user's list
             *
             * @DOLATER: implement socket to keep sync
             */
            removeItemById(id) {
                this.students = this.students.filter((item) => {
                    return item.id != id
                })
            },
        },
    }
</script>