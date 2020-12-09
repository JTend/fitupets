<template>
  <div class="frame2">
    <h2 class="title t-dgb">{{id ? (`Edit pet information (${id})` ) : 'Create new pet'}}</h2>
    <form class="b-white" action="">

      <label class="t-dgb z-md" for="name">Name</label>
      <input class="control" :class="Errors.name ? 'invalid' : ''" type="text" id="name" v-model="Pet.name" placeholder="Enter name of pet"><br>
      
      <label class="t-dgb z-md" for="kind">Type</label>
      <select class="control" id="kind"  v-model="Pet.kind">
        <option v-for="(type, index) of petTypes" :key="index">{{type}}</option>
      </select><br>
      
      <label class="t-dgb z-md" for="breed">Breed</label>
      <input class="control" :class="Errors.breed ? 'invalid' : ''" type="text" id="breed" placeholder="Enter its breed" v-model="Pet.breed"><br>
      
      <label class="t-dgb z-md" for="age">Age</label>
      <input class="control"  type="number" id="age" placeholder="Enter its age" v-model="Pet.age"><br>
      
      <label class="t-dgb z-md" for="gender">Gender</label>
      <select class="control" id="gender" v-model="Pet.gender">
        <option v-for="(gender, index) of petGends" :key="index">{{gender}}</option>
      </select><br>
      
      <label class="t-dgb z-md" for="color">Color</label>
      <input class="control" type="color" id="color" v-model="Pet.color"><br>
      
      <button class="control b-lgb z-md t-white" type="button" v-on:click="handleClick">Save</button>
    </form>
  </div>
</template>

<script>
//######################        SCRIPTS         ######################
  import { mapState } from 'vuex';
  import router from '../router/index'
  export default {
    Name : 'Pet', 
    props : { id : Number, default : 0 },
    data() {
      return {
        Pet : { name : '', kind : 'dog', breed : '', age : 0, gender : 'male', color : '#000000' },
        Errors : { name : false, breed : false },
        petTypes : ['cat', 'dog', 'hamster', 'bird', 'fish', 'turtle', 'rabbit'],
        petGends : ['male', 'female'],
      }
    },
    computed : {
      ...mapState(['token'])
    },
    methods : {
      nonErrors() {
        let mark = true;
        if(this.Pet.name.trim().length <= 1) {this.Errors.name = true; mark = false;}
        else this.Errors.name = false;
        if(this.Pet.breed.trim().length <= 1) { this.Errors.breed = true; mark = false;}
        else this.Errors.breed = false;
        return mark;
      },
      handleClick() {
        if(this.nonErrors()) {
        if(this.id) this.putPet(this.id, this.Pet, this.token);
        else this.postPet(this.Pet, this.token); }
      },
      //##############            CREATE NEW PET            ##############
      postPet : (pet, key) => {
        const setup = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pet)
        };
        fetch('http://api-pets.fituapp.com/api/v1/pets?token=' + key, setup).then(async result => {
          const data = await result.json();
          if (!result.ok) {
            const error = (data && data.message) || result.status;
            return Promise.reject(error);
          }
          router.push({ name: 'Pet', params: { id : data.id } });
        }).catch(error => {
          console.error('Error:', error);
          router.push({ name: 'Pets'});
        });
      }, //End of postPet
      //##############          UPDATE EXISTING PET          ##############
      putPet : (id, pet, key) => {
        const setup = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pet)
        };
        fetch(`http://api-pets.fituapp.com/api/v1/pets/${id}/?token=` + key, setup).then(async result => {
          const data = await result.json();
          if (!result.ok) {
            const error = (data && data.message) || result.status;
            return Promise.reject(error);
          }
          router.push({ name: 'Pets'});
        }).catch(error => {
          console.error('Error:', error);
          router.push({ name: 'Pets'});
        });
      }
    },
    //##############       GET RECORD TO BE EDITED       ##############
    created() {
      if (this.id) fetch("http://api-pets.fituapp.com/api/v1/pets/" + this.id + '?token=' + this.token)
      .then(async result => {
        const data = await result.json();
        if (!result.ok) {
          const error = (data && data.message) || result.statusText;
          return Promise.reject(error);
        }
        for(let key in this.Pet) this.Pet[key] = data[key];
      })
      .catch(error => {
        console.error("Error:", error);
        router.push({ name: 'Pets'});
      });
    } //End of created() component event
  }
</script>