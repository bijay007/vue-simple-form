import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Applicants from './components/Applicants.vue'
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
        name: 'Home',
        component: SimpleForm
      }
    ]
  },
  {
    path: '/applicants',
    name: 'Applicants',
    component: Applicants,
    props: true
  }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  render: createElem => createElem(App)
}).$mount('#app')
