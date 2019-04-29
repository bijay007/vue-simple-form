<template>
  <div>
    <div class='menu'>
      <div class='menu_content'>
        <router-link :to="{name: 'Home'}"> 🏠 </router-link>
        <div style='padding: 1rem'>
          <input type="text" v-model='keyword' placeholder='🔍 Search for an applicant'
            autofocus>
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
      <div v-show='filteredLocalApplicant.length' @click.once='modifyLocalStorage({}, $event)'>
        <div class='applicant_list local_applicants' v-for='(applicant, index) in filteredLocalApplicant' :key='applicant.name+index'>
          <div>{{applicant.name}}</div>
          <div class='applicant_list_actions'> ❌ </div>
        </div>
      </div>
      <div v-if="newApplicant.name" class='applicant_list local_applicants'>
        <div style='color: #ff6666'>{{ upperCaseFirstLetter(newApplicant.name) }}</div>
        <div class='applicant_list_actions' @click.once='modifyLocalStorage(newApplicant, $event)'> 💾 </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'applicants',
  props: {
    recentApplicant: {
      type: Object,
      default: () => {}
    }
  },
  created: function() {
    this.getFromLocalStorage();
    this.getRemoteApplicants();
  },
  data() {
    return {
      keyword: '',
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
      let savedApplicants = Object.keys(localStorage).reduce((acc, prev) => {
        if (/Applicant:/.test(prev)) {
          acc.push(localStorage.getItem(prev))
        }
        return acc;
      }, []);
      this.localApplicants = savedApplicants.map(applicant => JSON.parse(applicant))
    },
    modifyLocalStorage(applicant, e) {
      if (applicant.name) {
        localStorage.setItem(`Applicant:${applicant.name}`, JSON.stringify(applicant))
        let recentSaved = JSON.parse(localStorage.getItem(`Applicant:${applicant.name}`))
        this.localApplicants.push(recentSaved);
        this.newApplicant = {}
      } else {
        // only do this (see below) if the list is supeeer big for optimization (the one below is just for testing purpose)
        // attaching event to every iterated node (similar to saving applicant) and passing the whole object is less prone to error and...
        //...easy to do operations with the target element's data than searching and parsing the targeted node's inner content
        let getFirstChildText = e.target.parentElement.firstChild.innerHTML
        localStorage.removeItem(`Applicant:${getFirstChildText}`)
        // Better to search and slice off from array if the list is big rather than calling the function to update as it can be expensive
        this.getFromLocalStorage()
      }
    },
    upperCaseFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
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
  .local_applicants {
    display: flex;
    justify-content: space-between;
  }
  .applicant_list_actions {
    cursor: pointer;
  }
</style>


