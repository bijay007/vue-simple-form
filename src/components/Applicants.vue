<template>
  <div>
    <div class='menu'>
      <div class='menu_content'>
        <router-link :to="{name: 'Home'}"> 🏠 </router-link>
        <div style='padding: 1rem'>
          <input v-focus type="text" v-model='keyword' placeholder='🔍 Search for an applicant'>
        </div>
      </div>
    </div>
    <h2>Applicants found 👇</h2>
    <div v-show='filteredRemoteApplicant.length' class='applicants'>
      <div class='applicant_list' v-for='(applicant, index) in filteredRemoteApplicant' v-bind:key='index+applicant.email'>
        <div>{{applicant.name}}</div>
      </div>
    </div>
    <h2 v-show='newApplicant.name || filteredLocalApplicant.length'>New applicants</h2>
    <div class='applicants'>
      <div v-show='filteredLocalApplicant.length' @click='modifyLocalStorage({}, $event)'>
        <div class='applicant_list local_applicants' v-for='(applicant, index) in filteredLocalApplicant' :key='applicant.name+index'>
          <div>{{applicant.name}}</div>
          <div class='applicant_list_actions'> ❌ </div>
        </div>
      </div>
      <div v-if="newApplicant.name" class='applicant_list local_applicants'>
        <div style='color: #ff6666'>{{newApplicant.name}}</div>
        <div class='applicant_list_actions' @click='modifyLocalStorage(newApplicant, $event)'>
          <div v-if='this.saving'>
            <PulseLoader :loading='saving'></PulseLoader>
          </div>
          <div v-else>
            <span>💾</span>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import autofocus from '../directives/autofocus';
import { getApplicantsFromLocalStorage } from '../common/helpers';

export default {
  name: 'applicants',
  props: {
    recentApplicant: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    PulseLoader
  },
  directives: {
    focus: autofocus
  },
  created: function() {
    this.getRemoteApplicants();
    this.getFromLocalStorage();
  },
  data() {
    return {
      keyword: '',
      saving: false,
      newApplicant: {...this.recentApplicant} || {},
      remoteApplicants: [],
      localApplicants: []
    }
  },
  computed: {
    filteredRemoteApplicant() {
      return [...this.remoteApplicants].filter(applicant => applicant.name.toLowerCase().includes(this.keyword.toLowerCase()))
    },
    filteredLocalApplicant() {
      return [...this.localApplicants].filter(applicant => applicant.name.toLowerCase().includes(this.keyword.toLowerCase()))
    }
  },
  methods: {
    async getRemoteApplicants() {
      let json = await fetch('https://jsonplaceholder.typicode.com/users')
      let result = await json.json();
      this.remoteApplicants = result;
    },
    getFromLocalStorage() {
      this.localApplicants = Array.from(getApplicantsFromLocalStorage());
    },
    modifyLocalStorage(applicant, e) {
      if (applicant.name) {
        this.saving = true;
        setTimeout(() => {
          localStorage.setItem(`Applicant:${applicant.name}`, JSON.stringify(applicant))
          let recentSaved = JSON.parse(localStorage.getItem(`Applicant:${applicant.name}`))
          this.localApplicants.push(recentSaved);
          this.saving = false
          this.newApplicant = {}
        }, 1000);
      } else {
        // only do this (see below) if the list is supeeer big for optimization (the one below is just for testing purpose)
        // attaching event to every iterated node (similar to saving applicant) and passing the whole object is less prone to error and...
        //...easy to do operations with the target element's data than searching and parsing the targeted node's inner content
        let getFirstChildText = e.target.parentElement.firstChild.innerHTML
        localStorage.removeItem(`Applicant:${getFirstChildText}`)
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
    width: 15rem;
    padding: 0.4rem;
    font-size: 0.9rem;
    border-radius: 1rem;
    border-style: solid;
    border-color: #ccf;
  }
  input:focus {
    outline: none;
  }
  .applicants {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .applicant_list {
    display: flex;
    justify-content: flex-start;
    width: 30vw;
    padding: 0.25rem;
    font-weight: bold;
  }
  .applicant_list_actions {
    cursor: pointer;
  }
  .local_applicants {
    display: flex;
    justify-content: space-between;
  }
</style>


