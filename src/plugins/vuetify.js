import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import pt from 'vuetify/src/locale/pt.ts'
import en from 'vuetify/src/locale/en.ts'

export default new Vuetify({
    lang: {
        locales: { pt, en },
        current: 'pt',
    },
});
