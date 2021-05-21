<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Editar aluno</h1>

        <!-- Feedback message (errors editing record) -->
        <v-alert
            outlined
            prominent
            border="left"
            type="warning"
            v-html="errors"
            v-show="errors.length"
        />

        <!-- Student default form custom component -->
        <student-form
            :ra="form.ra"
            :cpf="form.cpf"
            :key="editingId"
            @save="trySubmit"
            :name="form.name"
            :email="form.email"
            @cancel="gotoIndex"
            :readonly="'ra,cpf'"
        />

        <!-- Message dialog custom component -->
        <msg-dialog
            :show="showDialog"
            :confirm="confirm"
            :title="modal.title"
            :description="modal.text"
        />

    </div>

</template>

<script>

    import Axios from 'axios'
    import MsgDialog from '../components/MsgDialog'
    import StudentForm from '../components/StudentForm'


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
             * Simple message message
             */
            MsgDialog,


            /**
             * Default student form
             */
            StudentForm
        },


        data: () => ({

            /**
             * The record being edited.
             */

            editingId: null,


            /**
             * The error list came from API.
             */
            errors: '',


            /**
             * The modal controls for show and content.
             */
            showDialog: false,
            modal: {
                title: 'Concluído',
                text:  'O cadastrado foi alterado com sucesso.',
            },


            /**
             * A local copy of data came from original record
             */

            form: {
                ra: '',
                cpf: '',
                name: '',
                email: '',
            },
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

        methods: {

            /**
             * Get user to being edited from API
             */
            init() {
                async.get('users/' + this.$route.params.id)

                    .then(response => {
                        switch (response.status) {
                            case 200:
                                this.form.ra    = ('0000' + response.data.ra).substr(-4)
                                this.form.cpf   = response.data.cpf
                                this.form.name  = response.data.name
                                this.form.email = response.data.email
                                this.editingId  = this.$route.params.id
                            break
                        }
                    })
            },


            /**
             * Proceed to updating register
             */
            confirm() {
                this.showDialog = false
                this.$router.push('/');
            },


            /**
             * Go to index
             */
            gotoIndex() {
                this.$router.push('/')
            },


            /**
             * Try to submit the updates
             */
            trySubmit(form) {
                let data = {
                    ra:    form.ra,
                    cpf:   form.cpf.replace(/[^0-9]/g,''),
                    name:  form.name,
                    email: form.email,
                }

                async.put('users/' + this.editingId, data)
                    .then(response => {
                        switch (response.status) {
                            case 200:
                                this.showDialog = true
                            break

                            default:
                            break
                        }
                    })

                    .catch(e => {
                        if (e.response) {
                            switch(e.response.status) {
                                case 422:
                                    //Errors
                                    this.errors = '<ul>'
                                    for (let i in e.response.data) {
                                        this.errors += '<li>' + e.response.data[i] + '</li>'
                                    }
                                    this.errors += '</ul>'
                                break
                            }
                        }
                    })
            }
        },
    }

</script>
