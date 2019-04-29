<template>
  <div>
    <div class='menu'>
      <div class='menu_content'>
        <router-link :to="{name: 'Home'}"> 🏠 </router-link>
        <div style='padding: 1rem 0'>
          <input type="text" placeholder="Search for a user" autofocus>
        </div>
      </div>
    </div>
    <h2>Remote users</h2>
    <div v-if='remoteUsers.length' class='users'>
      <div class='user_list' v-for="(user, index) in remoteUsers" v-bind:key="index+user.email">
        <div>{{user.name}}</div>
      </div>
    </div>
    <h2 v-if='newUser.title || localUsers.length'>New users</h2>
    <div class='users'>
      <div v-if='localUsers.length' @click.once='modifyLocalStorage({}, $event)'>
        <div class='user_list local_users' v-for='(user, index) in localUsers' :key='user.title+index' :hellofromtheothersidee='user.title'>
          <div>{{user.title}}</div>
          <div class='user_list_actions'>❌</div>
        </div>
      </div>
      <div v-if="newUser.title" class='user_list local_users'>
        <div style='color: #ff6666'>{{getUpperCase(newUser.title)}}</div>
        <div class='user_list_actions' @click.once='modifyLocalStorage(newUser, $event)'>💾</div>
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
    modifyLocalStorage(data, e) {
      if (data.title) {
        this.saveToLocalStorage(data)
      } else {
        // only do this (see below) if the list is supeeer big for optimization (the one below is just for testing purpose)
        // attaching event to every iterated node (similar to saving user) and passing the whole object is less prone to error and...
        //...easy to do operations with the target element's data than searching and parsing the targeted node's inner content
        let getFirstChildText = e.target.parentElement.firstChild.innerHTML
        localStorage.removeItem(`User:${getFirstChildText}`)
        // Better to search and slice off from array if the list is big rather than calling the function to update as it can be expensive
        this.getFromLocalStorage()
      }
    }
  }
}
</script>
<style scoped>
  .menu {
    display: flex;
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


