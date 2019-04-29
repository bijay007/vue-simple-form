<template>
  <div>
    <input type="text" placeholder="Search for a user" autofocus>
    <h2>Remote users</h2>
    <div v-if='remoteUsers.length' class='users'>
      <div class='user_list' v-for="(user, index) in remoteUsers" v-bind:key="index+user.email">
        <div>{{user.name}}</div>
      </div>
    </div>
    <h2 v-if='newUser.title || localUsers.length'>New users</h2>
    <div class='users'>
      <div v-if='localUsers.length'>
        <div class='user_list local_users' v-for='(user, index) in localUsers' v-bind:key='user.title+index'>
          <div>{{user.title}}</div>
          <div class='user_list_actions' @click='deleteFromLocalStorage(user)'>❌</div>
        </div>
      </div>
      <div v-if="newUser.title" class='user_list local_users'>
        <div style='color: #ff6666'>{{getUpperCase(newUser.title)}}</div>
        <div class='user_list_actions' @click='saveToLocalStorage(newUser)'>💾</div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'users',
  props: {
    recentUser: {
      type: Object,
      default: () => {}
    }
  },
  created: function() {
    this.getFromLocalStorage();
    this.getRemoteUsers();
  },
  data() {
    return {
      newUser: {...this.recentUser} || {},
      remoteUsers: [],
      localUsers: []
    }
  },
  methods: {
    getUpperCase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    async getRemoteUsers() {
      let json = await fetch('https://jsonplaceholder.typicode.com/users')
      let result = await json.json();
      this.remoteUsers = result;
    },
    saveToLocalStorage(user) {
      localStorage.setItem(`User:${user.title}`, JSON.stringify(user))
      let recentSaved = JSON.parse(localStorage.getItem(`User:${user.title}`))
      this.localUsers.push(recentSaved);
      this.newUser = {}
    },
    getFromLocalStorage() {
      let savedUsers = Object.keys(localStorage).reduce((acc, prev) => {
        if (/User:/.test(prev)) {
          acc.push(localStorage.getItem(prev))
        }
        return acc;
      }, []);
      this.localUsers = savedUsers.map(user => JSON.parse(user))
    },
    deleteFromLocalStorage(user) {
      localStorage.removeItem(`User:${user.title}`)
      // Better to search and slice off from array if the list is big 
      this.getFromLocalStorage()
    }
  }
}
</script>
<style scoped>
  .x {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  span {
    font-weight: bold;
  }
  h2 {
    padding: 1rem 0;
    text-shadow: 1px 0.5px 1px grey;
  }
  input {
    text-align: center;
    height: 1.5rem;
    width: 12rem;
    padding: 0.25rem;
  }
  .users {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .user_list {
    display: flex;
    justify-content: flex-start;
    width: 30vw;
    padding: 0.25rem;
    font-weight: bold;
  }
  .local_users {
    display: flex;
    justify-content: space-between;
  }
  .user_list_actions {
    cursor: pointer;
  }
</style>


