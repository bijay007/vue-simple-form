<template>
  <div class="form_root">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <form
      id={form}
      ref='user_form'
      @submit.prevent='submitForm'
    >
      <div class='form_wrapper'>
        <div class='form_main'>
          <div class='form_input'>
            <span>&ast; Name: </span>
            <input required v-model='name' placeholder='Your name'>
          </div>
          <div class='form_input'>
            <span>&ast; Age: </span>
            <input required v-model.number='age' placeholder='Your age' type='number'>
          </div>
          <div class='form_select'>
            <p>&ast; Job: 
              <span>
                <select required v-model='job'>
                  <option disabled value=''> Select your job</option>
                  <option>FrontEnd Development</option>
                  <option>BackEnd Development</option>
                  <option>FullStack Development</option>
                </select>
              </span>
            </p>
          </div>
          <div class='form_radio'>
            <p>Travel for work: 
              <span>
                <label for='travel_yes'> Yes</label>
                <input type='radio' id='travel_yes' value='Yes' v-model='travel'>
                <label for='travel_no'> No</label>
                <input type='radio' id='travel_no' value='No' v-model='travel'>
              </span>
            </p>
          </div>
          <div class='form_buttons'>
            <button type='submit'><span>Submit</span></button>
            <button type='button' @click='clearForm'><span>Clear</span></button>
          </div>
          <div class='form_results'>
            <div>
              <PulseLoader :loading='loading'></PulseLoader>
              <div v-if='newUser.body'>
                <div class='user_info'>
                  <h4>Last added user info:</h4>
                  <div class='user_info_field'>UserName: <span>{{newUser.title}}</span></div>
                  <div class='user_info_field'>Age: <span>{{newUser.userId}}</span></div>
                  <div class='user_info_field'>Job: <span>{{newUser.body}}</span></div>
                  <div class='user_info_field'>Remote preference: 
                    <span>{{this.travel ? this.travel : 'No preference'}}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <span>No new user added 😓</span>
              </div>
              <div class='users_list'>
                OR <router-link :to="{name: 'Users', params: { recentUser }}">Check users list</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'SimpleForm',
  props: {
    msg: String
  },
  components: {
    PulseLoader
  },
  data: function() {
    return {
      name: '',
      age: '',
      job: '',
      travel: '',
      loading: false,
      newUser: {},
      recentUser: {}
    }
  },
  methods: {
    submitForm: function() {
       let formData = {
        method: 'post',
        body: JSON.stringify({
          title: this.name,
          userId: this.age,
          body: this.job
        }),
        headers:{'Content-Type': 'application/json'}
      }
      this.loading = true;
      fetch('https://jsonplaceholder.typicode.com/posts', formData)
        .then(response => response.json())
        .then(json => {
          // Using assign so no null properties are spread over
          this.newUser = Object.assign({}, json)
          this.recentUser = Object.assign({}, json)
        })
        .then(this.startDataRefresh)
    },
    clearForm: function() {
      this.$refs.user_form.reset();
    },
    startDataRefresh: function() {
      this.loading = false;
      setTimeout(() => this.newUser = {}, 1500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form_root {
  padding: 2rem auto;
}
.form_wrapper {
  display: flex;
  justify-content: center;
}
.form_main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.form_input {
  padding: 0.5rem 0;
}
.form_buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.5rem;
}
.form_results {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
}
.user_info {
  border: 1px solid #41b883;
  border-radius: 0.5rem;
}
.user_info_field {
  text-align: left;
  padding: 0.3rem 1rem;
}
.user_info_field span {
  font-weight: bold;
}
.users_list {
  padding: 2rem 0;
}
h4 {
  text-decoration: underline;
}
input {
  padding: 0.3rem;
  border: 0.5px solid rgba(65, 184, 131, 0.8);
}
select {
  padding: 0.3rem;
}
label {
  font-weight: bold;
}
button {
  display: flex;
  align-items: center;
  height: 2rem;
  color: #34495e;
  font-weight: bold;
  text-transform: uppercase;
  background: #ffffff;
  padding: 8px;
  border: 2px solid #41b883;
  border-radius: 6px;
  display: inline-block;
}
button:hover {
  color: #494949;
  border-radius: 50px;
  border-color: #494949;
  transition: all 0.3s ease 0s;
}
button:focus {
  outline: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
