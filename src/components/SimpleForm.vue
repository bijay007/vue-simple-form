<template>
  <div class="simple_form">
    <h1>{{ msg }}</h1>
    <form
      id={form}
      ref='user_form'
      @submit.prevent='submitForm'
    >
      <div class='form_wrapper'>
        <div class='form_main'>
          <div class='form_input'>
            <span>Name: </span>
            <input required v-model='name' placeholder='Your name'>
          </div>
          <div class='form_input'>
            <span>Age: </span>
            <input v-model.number='age' placeholder='Your age' type='number'>
          </div>
          <div class='form_select'>
            <p>Job: 
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
            <div v-if='lastAddedUser.body'>
              <div class='user_info'>
                <h4>Last added user info:</h4>
                <div class='user_info_field'>UserName: <span>{{lastAddedUser.title}}</span></div>
                <div class='user_info_field'>Age: <span>{{lastAddedUser.userId}}</span></div>
                <div class='user_info_field'>Job: <span>{{lastAddedUser.body}}</span></div>
                <div class='user_info_field'>Remote preference: 
                  <span>{{this.travel ? this.travel : 'No preference'}}</span>
                </div>
              </div>
            </div>
            <div v-else>
              No new user added.
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'SimpleForm',
  props: {
    msg: String
  },
  data: function() {
    return {
      name: '',
      age: '',
      job: '',
      travel: '',
      lastAddedUser: {}
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
      fetch('https://jsonplaceholder.typicode.com/posts', formData)
        .then(response => response.json())
        .then(json => this.lastAddedUser = Object.assign({}, json))
        .then(this.startDataRefresh)
    },
    clearForm: function() {
      this.$refs.user_form.reset();
    },
    startDataRefresh: function() {
      setTimeout(() => this.lastAddedUser = {}, 3000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
.user_info {
  border: 1px solid red;
  border-radius: 0.5rem;
}
.user_info_field {
  text-align: left;
  padding: 0.3rem 1rem;
}
.user_info_field span {
  font-weight: bold;
}
h4 {
  text-decoration: underline;
}
input {
  padding: 0.2rem;
  border: 0.5px solid rgba(65, 184, 131, 0.8);
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
