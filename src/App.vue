<template>
    <v-app>

        <nav-bar></nav-bar>

        <v-main class="mx-4 my-4">
            <router-view/>
        </v-main>

    </v-app>
</template>

<script>

    import NavBar from './components/NavBar'

    export default {
        name: 'App',
        components: {NavBar},

        data: () => ({
            //
        }),
    };
</script>
