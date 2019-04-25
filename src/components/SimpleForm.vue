<template>
  <div class="simple_form">
    <h1>{{ msg }}</h1>
    <form
      id={form}
      @submit="validateForm"
      action='https://reqres.in/api/users'
      method='post'
    >
      <div class='form_wrapper'>
        <div class='form_main'>
          <div class='form_input'>
            <span>Name: </span>
            <input v-model='name' placeholder='Your name'>
          </div>
          <div class='form_input'>
            <span>Age: </span>
            <input v-mode='age' placeholder='Your age' type='number'>
          </div>
          <div class='form_select'>
            <p>Interest: 
              <span>
                <select v-model='interest'>
                  <option disabled value=''> Select your interest</option>
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
            <button type='button'><span>Clear</span></button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SimpleForm',
  props: {
    msg: String
  },
  data: function() {
    return {
      name: '',
      age: '',
      interest: '',
      travel: '',
      validateForm: () => 2
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
