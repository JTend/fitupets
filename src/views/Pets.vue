<template>
  <div class="frame">
    <header class="pets-bar">
      <div>
          <h3 class="t-db">All</h3>
      </div>
    </header>
    <h2 class="title t-dgb">Pets</h2>
    <table>
      <thead>
        <th class="t-dgb">ID</th> <th class="t-dgb">Name</th> <th class="t-dgb">Type</th> <th class="t-dgb">Color</th>
        <th class="t-dgb">Breed</th> <th class="t-dgb">Gender</th> <th class="t-dgb">Age</th> <th class="t-dgb">Created at</th> 
        <th></th> 
      </thead>
      <tbody>
        <tr v-for="(pet, index) of Pets" :key="index">
          <td>{{pet.id}}</td> <td>{{pet.name}}</td> <td>{{pet.kind}}</td> <td><div :style="'background-color : '+pet.color+';'"></div></td> 
          <td>{{pet.breed}}</td> <td>{{pet.gender}}</td> <td>{{pet.age}}</td> <td>{{formatDate(pet.created_at)}}</td> 
          <td>
            <router-link  :to="{ name: 'Pet', params : {id : pet.id}}"><img src="../assets/imgs/icoEdit.png" alt="Edit"></router-link>
            <router-link :to="{ name: 'Erase', params : {id : pet.id}}"><img src="../assets/imgs/icoDel.png" alt="Delete"></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Pets',
  data() {
    return {
      Pets : []
    }
  },
  computed : {
    ...mapState(['token'])
  },
  methods : {
    formatDate : date => {
      let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let d = new Date(date);
      return month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + '  ' 
             + (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) + ':' + d.getMinutes() + ' ' + (d.getHours() > 12 ? 'PM' : 'AM');
    }
  },
  created() {
    if(this.token)
    fetch("http://api-pets.fituapp.com/api/v1/pets?token=" + this.token).then(async result => result.json())
    .then(data => {
      this.Pets = Array.from(data);
      console.log(this.Pets)
    }).catch(error => console.error("Error:", error) );
  }
}
</script>