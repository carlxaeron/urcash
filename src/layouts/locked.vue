<template>
<q-layout view="lHh Lpr lFf" class="myfont flex flex-center" >
  <q-page-container class = "bg_image"  style="max-width:500px;" >
 <q-page class= "flex flex-center vg">
    <div class="row flex flex-center">
        <q-img class = "q-my-md"
          src="../assets/logo.png"
          style="width: 30%;"
       />
    <div class="row justify-center">
      <div class="col-8 text-center">
         <span class="text-h5 text-white flex flex-center">WELCOME TO URCASH!</span>
           <q-btn  class = "q-my-lg text-h5" color="primary" label="Account Locked!" text-color="white"/>
        <p class = "text-white text-bold">Sorry. You have entered 3 wrong PINS. Your account is locked. Please contact customer support to retrieve your account.</p>
      </div>

      <div class="q-pa-md inp" style="max-width: 300px;">
       <q-btn rounded class = " full-width text-h5" color="info" label="CONTACT US" text-color="white"/>
      </div>
    </div>
    </div>
 </q-page>
  </q-page-container>
</q-layout>
</template>

<script>

// import { QSpinnerIos } from 'quasar'
export default {
  name: 'lock',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  }
}
</script>
