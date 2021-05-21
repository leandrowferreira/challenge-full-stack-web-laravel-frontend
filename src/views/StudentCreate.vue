<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Novo aluno</h1>

        <!-- Feedback message (errors creating record) -->
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
            @save="trySubmit"
            @cancel="gotoIndex"
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
             * The error list came from API.
             */
            errors: '',


            /**
             * The modal controls for show and content.
             */
            showDialog: false,
            modal: {
                title: 'Concluído',
                text:  'O aluno foi cadastrado com sucesso.',
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
                                this.$router.push('login');
                            break
                        }
                    }
                })
        },


        methods: {

            /**
             * Single "ok" button action
             */
            confirm() {
                this.showDialog = false
                this.gotoIndex()
            },


            /**
             * Go to index
             */
            gotoIndex() {
                this.$router.push('/')
            },


            /**
             * Try to submit new student
             */
            trySubmit(form) {

                let data = {
                    ra:    form.ra,
                    cpf:   form.cpf.replace(/[^0-9]/g,''),
                    name:  form.name,
                    email: form.email,
                }

                async.post('users', data)
                    .then(response => {
                        switch (response.status) {
                            case 201:
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
            },
        }
    }
</script>