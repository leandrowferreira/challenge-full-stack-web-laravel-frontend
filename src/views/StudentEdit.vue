<template>
    <div class="create">
        <h1 class="subtitle-1 grey--text">Editar aluno</h1>

            <student-form
                :ra="form.ra"
                :cpf="form.cpf"
                :name="form.name"
                :email="form.email"
                @cancel="gotoIndex"
                @save="trySubmit"
            />

        <div class="student-edit">

        </div>
    </div>

</template>

<script>

    import StudentForm from '../components/StudentForm'

    export default {

        components: {StudentForm},

        data: () => ({

            form: {
                ra: '',
                cpf: '',
                name: '',
                email: '',
            },
        }),


        mounted() {
            console.log(this.$route.params.id)


        },



        methods: {

            gotoIndex() {
                this.$router.push('/')
            },

            trySubmit(form) {
                console.log(form)
            }

        },
    }

</script>
