import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Users from './components/Users.vue'
import SimpleForm from './components/SimpleForm'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/',
        component: SimpleForm
      }
    ]
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    props: true
  }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: createElem => createElem(App)
}).$mount('#app')
