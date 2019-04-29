<template>
  <div>
    <input type="text" placeholder="Search for a user" autofocus>
    <h2>Default users:</h2>
    <div v-if='remoteUsers.length' class='users'>
      <div class='users_list' v-for="(user, index) in remoteUsers" v-bind:key="index+user.email">
        <div>{{user.name}}</div>
      </div>
    </div>
    <h2 v-if='usersList.length || localUsers.length'>New users:</h2>
    <div>
      <div v-if='localUsers.length' class='users'>
        <div class='users_list' v-for='user in localUsers' :key='user.name+user.userId'>
          {{user.name}}
        </div>
      </div>
      <div class='users' v-for="(user, index) in usersList" v-bind:key="index+user.userId">
        <div class='users_list new_users'>
          <div class="new_users_info">{{getUpperCase(user.title)}}</div>
          <span class='new_users_save' @click='saveToLocalStorage(user)'>💾</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'users',
  props: {
    usersList: {
      type: Array,
      default: () => []
    }
  },
  created: function() {
    this.getFromLocalStorage();
    this.getRemoteUsers();
  },
  data() {
    return {
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
    },
    getFromLocalStorage() {
      let data = Object.keys(localStorage).reduce((acc, prev) => {
        if (/User:/.test(prev)) {
          acc.push({ name: prev.replace('User:', '' )})
        }
        return acc;
      }, []);
      this.localUsers = data.map(user => {
        user.name = this.getUpperCase(user.name)
        return user;
      });
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
  }
  .users_list {
    padding: 0.2rem;
    font-weight: bold;
  }
  .new_users {
    display: flex;
  }
  .new_users_info {
    padding-right: 2rem;
    color: #ff6666;
  }
  .new_users_save {
    cursor: pointer;
  }
</style>


