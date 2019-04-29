<template>
  <div class="form_root">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <form
      id={form}
      ref='applicant_form'
      @submit.prevent='submitForm'
    >
      <div class='form_wrapper'>
        <div class='form_main'>
          <div class='form_input'>
            <span>&ast; Name: </span>
            <input required v-model='name' placeholder='Applicant name'>
          </div>
          <div class='form_input'>
            <span>&ast; Age: </span>
            <input required v-model.number='age' placeholder='Applicant age' type='number'>
          </div>
          <div class='form_select'>
            <p>&ast; Job: 
              <span>
                <select required v-model='job'>
                  <option disabled value=''> Select applicant job</option>
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
              <div v-if='newApplicant.body'>
                <div class='applicant_info'>
                  <h4>Last added applicant info:</h4>
                  <div class='applicant_info_field'>ApplicantName: <span>{{newApplicant.name}}</span></div>
                  <div class='applicant_info_field'>Age: <span>{{newApplicant.applicantId}}</span></div>
                  <div class='applicant_info_field'>Job: <span>{{newApplicant.body}}</span></div>
                  <div class='applicant_info_field'>Remote preference: 
                    <span>{{this.travel ? this.travel : 'No preference'}}</span>
                  </div>
                </div>
              </div>
              <div v-else>
                <span>No new applicant added 😓</span>
              </div>
              <div class='applicants_list'>
                <router-link :to="{name: 'Applicants', params: { recentApplicant }}">
                  <span style='color: #000'>OR: </span>
                  <span class='applicant_list_link'> Check recent added applicants list</span>
                </router-link>
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
      newApplicant: {},
      recentApplicant: {}
    }
  },
  methods: {
    submitForm: function() {
       let formData = {
        method: 'post',
        body: JSON.stringify({
          name: this.name,
          applicantId: this.age,
          body: this.job
        }),
        headers:{'Content-Type': 'application/json'}
      }
      this.loading = true;
      fetch('https://jsonplaceholder.typicode.com/posts', formData)
        .then(response => response.json())
        .then(json => {
          // Using assign so no null properties are spread over
          this.newApplicant = Object.assign({}, json)
          this.recentApplicant = Object.assign({}, json)
        })
        .then(this.startDataRefresh)
    },
    clearForm: function() {
      this.$refs.applicant_form.reset();
    },
    startDataRefresh: function() {
      this.loading = false;
      setTimeout(() => this.newApplicant = {}, 3000)
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
.applicant_info {
  border: 1px solid #41b883;
  border-radius: 0.5rem;
}
.applicant_info_field {
  text-align: left;
  padding: 0.3rem 1rem;
}
.applicant_info_field span {
  font-weight: bold;
}
.applicants_list {
  padding: 2rem 0;
}
.applicant_list_link {
  text-decoration: underline;
  color: #42b983;
}
img {
  height: 20vh;
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
  margin: 0 0.5rem;
}
a {
  text-decoration: none;
}
</style>
