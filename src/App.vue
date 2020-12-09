<template>
    <div id="App">
      <aside>
        <div class="logo"><img src="./assets/imgs/brandlogo.png" alt="Logo"></div>
        <nav>
          <router-link class="pets" to="/">Pets</router-link>
          <router-link class="npet" :to="{ name: 'Pet', params : {id : 0}}">Add pet</router-link>
        </nav>
      </aside>
      <section>
        <header class="adm-bar">
          <div class="f-right">
            <h3 class="t-dgb">Admin</h3>
            <button class="z-sm b-lgb">Fitu Pets</button>
          </div>
        </header>
        <router-view/>
      </section>
    </div>
</template>