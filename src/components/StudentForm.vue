<template>
    <div class="create">

        <v-container fluid class="my-5">

            <v-form ref="form" v-model="valid" lazy-validation>

                <!-- Name field -->
                <v-text-field
                    required
                    label="Nome"
                    maxLength="200"
                    :rules="nameRules"
                    v-model="form.name"
                    :readonly="isReadOnly('name')"
                />

                <!-- Email field -->
                <v-text-field
                    required
                    label="E-mail"
                    maxLength="200"
                    :rules="emailRules"
                    v-model="form.email"
                    :readonly="isReadOnly('email')"
                />

                <!-- RA field -->
                <v-text-field
                    required
                    label="RA"
                    :counter="4"
                    maxLength="4"
                    v-mask="'####'"
                    :rules="raRules"
                    v-model="form.ra"
                    :readonly="isReadOnly('ra')"
                />

                <!-- CPF field -->
                <v-text-field
                    required
                    label="CPF"
                    :rules="cpfRules"
                    v-model="form.cpf"
                    v-mask="'###.###.###-##'"
                    :readonly="isReadOnly('cpf')"
                />

                <!-- Cancel button -->
                <v-btn large @click="cancel" class="mr-4">
                    <v-icon left>mdi-undo</v-icon> Cancelar
                </v-btn>

                <!-- Save button -->
                <v-btn large color="primary" @click="save(form)">
                    <v-icon left>mdi-account-plus</v-icon> Salvar
                </v-btn>

            </v-form>

        </v-container>

    </div>
</template>


<script>

    /**
     * This component is used to mask RA and CPF fields
     */
    import {mask} from 'vue-the-mask'


    export default {

        directives: {
            /**
             * This vue-the-mask component can be user from different ways
             * The most simple is using this directive
             */
            mask
        },


        props: [

            /**
             * This prop is used to 'refresh' this component
             */
            'id',


            /**
             * These are ordinay data fields
             */
            'ra',
            'cpf',
            'name',
            'email',


            /**
             * This property indicates what fields are read only
             * The field names are comma-separated
             */
            'readonly'
        ],

        data: () => ({

            /**
             * Model to control form validation
             */
            valid: true,


            /**
             * This is a local copy of data came from parent's component
             */
            form: {
                ra:    '',
                cpf:   '',
                name:  '',
                email: '',
            },


            /**
             * Name field validation rules
             */
            nameRules: [
                v => !!v || 'Campo obrigatório',
                v => (v && v.length >= 10) || 'O nome deve ter pelo menos 10 caracteres',
            ],


            /**
             * Email field validation rules
             */
            emailRules: [
                v => !!v || 'Campo obrigatório',
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'O campo precisa ser um e-mail válido',
            ],


            /**
             * RA field validation rules
             */
            raRules: [
                v => !!v || 'Campo obrigatório',
                v => (v && v.length == 4) || 'O RA é composto por 4 algarismos',
            ],


            /**
             * CPF field validation rules
             *
             * @DOLATER: Move the validation rule to a mixin to complies to DRY
             */
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

                    /**
                     * Bakery bill 😉
                     */
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

            /**
             * Copy the props to local object
             */
            this.form.ra    = this.ra
            this.form.cpf   = this.cpf
            this.form.name  = this.name
            this.form.email = this.email
        },


        methods: {

            /**
             * Check if parent setted the field as readonly
             */
            isReadOnly(field) {
                return typeof(this.readonly) != 'undefined' && this.readonly.split(',').includes(field)
            },


            /**
             * Send solely cancel to parent
             */
            cancel() {
                this.$emit('cancel')
            },


            /**
             * First, test form validation
             * If it's ok, send form content to parent
             */
            save(form) {
                if (!this.$refs.form.validate()) {
                    return
                }
                this.$emit('save', form)
            },
        },
    }

</script>