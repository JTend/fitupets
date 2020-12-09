<template>
  <div class="frame2">
    <h2 class="title t-dgb">Please confirm to delete this pet ( {{id}} )</h2>
    <form class="b-white">
      <h2 class="t-dgb">Name : {{Pet.name}}</h2>
      <h2 class="t-dgb">Type : {{Pet.kind}}</h2>
      <h2 class="t-dgb">Breed : {{Pet.breed}}</h2>
      <h2 class="t-dgb" >Breed : {{Pet.gender}}</h2>
      <h2 class="t-dgb" >Age : {{Pet.age}}</h2>
      <button class="control b-tomato z-md t-white" type="button" v-on:click="handleClick">Delete</button>
    </form>
  </div>
</template>

<script>
//######################        SCRIPTS         ######################
import { mapState } from 'vuex';
import router from '../router/index';
export default {
  name : 'Erase', 
  props : { id : Number, default : 0 },
  data() {
      return {
        Pet : { name : '', kind : 'dog', breed : '', age : 0, gender : 'male', color : '#000000' },
      }
  },
  computed : {
    ...mapState(['token'])
  },
  methods : {
    handleClick() { this.deletePet(this.id, this.token) },
    deletePet : (id, key) => {
      const setup = {
        method: 'DELETE'
      };
      fetch(`http://api-pets.fituapp.com/api/v1/pets/${id}?token=` + key, setup).then(result => result.json())
      .then(data => {
        console.log('Deleted: ', data);
      }).catch(error => {
        console.error('Error:', error);
        router.push({ name: 'Pets'});
      });
    }
  },
  //##############       GET RECORD TO BE DELETED       ##############
  created() {
    if (this.id) fetch("http://api-pets.fituapp.com/api/v1/pets/" + this.id + '?token=' + this.token)
    .then(result => result.json()).then(data => {
      for(let key in this.Pet) this.Pet[key] = data[key];
    }).catch(error => {
      console.error("Error:", error);
      router.push({ name: 'Pets'});
    });
  } //End of created() component event
}
</script>