<template>
    <nav>
        <!-- Very very basic topbar -->
        <v-app-bar app clipped-left >

            <v-toolbar-title>
                <span class="font-weight-black">Ed</span>Tech
            </v-toolbar-title>

        </v-app-bar>

        <!-- Fixed nav drawer on the left portion -->
        <v-navigation-drawer
            app
            permanent
            class="mt-16"
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
            color="primary"
        >
            <!-- The "functionality" lists. Only the first one is implemented -->
            <v-list nav>
                <v-list-item  router to="/">
                    <v-list-item-icon><v-icon>mdi-account-multiple</v-icon></v-list-item-icon>
                    <v-list-item-title>Cadastro de alunos</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-account-multiple</v-icon></v-list-item-icon>
                    <v-list-item-title>Lorem ipsum</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-account-multiple</v-icon></v-list-item-icon>
                    <v-list-item-title>Dolor sit</v-list-item-title>
                </v-list-item>

            </v-list>

        </v-navigation-drawer>

    </nav>
</template>
