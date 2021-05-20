<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Editar aluno</h1>

            <v-alert
                v-show="errors.length"
                outlined
                type="warning"
                prominent border="left"
                v-html="errors"
            />

            <student-form
                :key="editingId"
                :ra="form.ra"
                :cpf="form.cpf"
                :name="form.name"
                :email="form.email"
                :readonly="'ra,cpf'"
                @cancel="gotoIndex"
                @save="trySubmit"
            />

            <msg-dialog
                :show="showDialog"
                :confirm="confirm"
                :title="modal.title"
                :description="modal.text"
            />

        <div class="student-edit">

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

            editingId: null,

            errors: '',

            showDialog: false,
            modal: {
                title: 'Concluído',
                text:  'O cadastrado foi alterado com sucesso.',
            },

            form: {
                ra: '',
                cpf: '',
                name: '',
                email: '',
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
