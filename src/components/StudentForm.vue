<template>
    <div class="create">

        <v-container fluid class="my-5">
            <v-alert v-show="errors.length" outlined type="warning" prominent border="left" v-html="errors"></v-alert>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="form.name" :rules="nameRules" label="Nome" maxLength="200" required></v-text-field>
                <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" maxLength="200" required></v-text-field>
                <v-text-field :readonly="isReadOnly('ra')" v-model="form.ra" v-mask="'####'" :counter="4" maxLength="4" :rules="raRules" label="RA"  required></v-text-field>
                <v-text-field :readonly="isReadOnly('cpf')" v-model="form.cpf" v-mask="'###.###.###-##'" :rules="cpfRules" label="CPF"  required></v-text-field>

                <v-btn large @click="cancel" class="mr-4"><v-icon left>mdi-undo</v-icon> Cancelar</v-btn>
                <v-btn large color="primary" @click="save(form)"><v-icon left>mdi-account-plus</v-icon> Salvar</v-btn>
            </v-form>

        </v-container>

    </div>
</template>


<script>

    import {mask} from 'vue-the-mask'


    export default {

        directives: {mask},

        props: ['id', 'ra', 'cpf', 'name', 'email', 'readonly'],

        data: () => ({

            valid: true,
            errors: '',

            form: {
                ra:    '',
                cpf:   '',
                name:  '',
                email: '',
            },

            nameRules: [
                v => !!v || 'Campo obrigatório',
                v => (v && v.length >= 10) || 'O nome deve ter pelo menos 10 caracteres',
            ],

            emailRules: [
                v => !!v || 'Campo obrigatório',
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'O campo precisa ser um e-mail válido',
            ],

            raRules: [
                v => !!v || 'Campo obrigatório',
                v => (v && v.length == 4) || 'O RA é composto por 4 algarismos',
            ],

            cpfRules: [
                v => !!v || 'Campo obrigatório',
                v => (v && v.length == 14) || 'CPF inválido',
                v => {
                    if (typeof v !== "string") return 'CPF inválido'
                    let cpf = v.replace(/[\s.-]*/igm, '')
                    if (
                        !cpf ||
                        cpf.length != 11 ||
                        cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
                        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"
                    ) {
                        return 'CPF inválido'
                    }

                    var sum = 0
                    var mod
                    var i

                    for (i = 1; i <= 9; i++)
                        sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)

                    mod = (sum * 10) % 11
                    if ((mod == 10) || (mod == 11))  mod = 0
                    if (mod != parseInt(cpf.substring(9, 10)) ) return 'CPF inválido'
                    sum = 0

                    for (i = 1; i <= 10; i++)
                        sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)

                    mod = (sum * 10) % 11
                    if ((mod == 10) || (mod == 11))  mod = 0
                    if (mod != parseInt(cpf.substring(10, 11) ) ) return 'CPF inválido'

                    return true
                },
            ],
        }),

        created() {
            this.form.ra    = this.ra
            this.form.cpf   = this.cpf
            this.form.name  = this.name
            this.form.email = this.email
        },

        methods: {

            isReadOnly(field) {
                return typeof(this.readonly) != 'undefined' && this.readonly.split(',').includes(field)
            },

            cancel() {
                this.$emit('cancel')
            },

            save(form) {
                if (!this.$refs.form.validate()) {
                    return
                }
                this.$emit('save', form)
            },
        },

    }

</script>