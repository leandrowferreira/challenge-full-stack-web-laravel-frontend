<template>

    <v-row justify="center">

        <v-dialog v-model="show" persistent max-width="350">

            <v-card>

                <v-card-title class="headline" v-text="title"></v-card-title>
                <v-card-text v-text="description"></v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary darken-1" text @click="cancel">
                        Cancelar
                    </v-btn>

                    <v-btn color="primary darken-1" text @click="confirm">
                        Confirmar
                    </v-btn>

                </v-card-actions>

            </v-card>

        </v-dialog>

    </v-row>

</template>

<script>
export default {
    props: ['show', 'title', 'description', 'cancel', 'confirm']
}
</script>
