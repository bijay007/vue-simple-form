<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <SimpleForm msg="Basic form in vue.js"/>
  </div>
</template>

<script>
import SimpleForm from './components/SimpleForm.vue'

export default {
  name: 'app',
  components: {
    SimpleForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
