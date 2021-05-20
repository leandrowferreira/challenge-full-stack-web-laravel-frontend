<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Novo aluno</h1>

        <div class="student-form">

            <v-alert
                v-show="errors.length"
                outlined
                type="warning"
                prominent border="left"
                v-html="errors"
            />

            <student-form
                @cancel="gotoIndex"
                @save="trySubmit"
            />

            <msg-dialog
                :show="showDialog"
                :confirm="confirm"
                :title="modal.title"
                :description="modal.text"
            />

        </div>

    </div>
</template>

<script>

    import Axios from 'axios'
    import MsgDialog from '../components/MsgDialog'
    import StudentForm from '../components/StudentForm'

    const async = Axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:8000/api/v1/'
    })


    export default {

        components: {MsgDialog, StudentForm},

        data: () => ({

            errors: '',

            showDialog: false,
            modal: {
                title: 'Concluído',
                text:  'O aluno foi cadastrado com sucesso.',
            },

        }),


        mounted() {

            // Do login

            // The authentication stories where not covered by this challenge.
            // So, login is here for demonstration purpouses only, to show
            // that the API access is protected via Bearer token, almost
            // often obtained using an authentication form
            // @TODO: remove from here and implement via Vuex State Management)

            async.post('auth/login', {
                email:    'admin@edtech.tmp.br',
                password: 'password'
            })
                .then(response => {
                    switch (response.status) {
                        case 200:
                            async.defaults.headers.common['Accept'] = 'application/json'
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

            confirm() {
                this.showDialog = false
                this.$router.push('/');
            },

            gotoIndex() {
                this.$router.push('/')
            },

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