import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentIndex from '../views/StudentIndex.vue'
import StudentCreate from '../views/StudentCreate.vue'
import StudentEdit from '../views/StudentEdit.vue'


Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'StudentIndex',
        component: StudentIndex
    },
    {
        path: '/create',
        name: 'StudentCreate',
        component: StudentCreate
    },
    {
        path: '/:id/edit',
        name: 'StudentEdit',
        component: StudentEdit
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
