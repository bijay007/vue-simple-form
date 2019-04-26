<template>
  <div>
    <h3>Users added:</h3>
    <div v-for="(user, index) in getUserList" v-bind:key="index+user.userId">
      {{index+1}}. <span>{{getUpperCase(user.title)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'users',
  props: {
    usersList: {
      type: Array,
      required: true
    }
  },
  computed: {
    getUserList: function() {
      return this.usersList
    }
  },
  methods: {
    getUpperCase: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>
<style scoped>
  span {
    font-weight: bold;
  }
</style>


