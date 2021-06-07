<template >
<q-layout view="lHh Lpr lFf" class="myfont flex flex-center">
  <q-page-container class="bg_image">
 <q-page class= "vg">
   <div class= "row col-md-12 col-lg-12 flex flex-center q-pa-lg">
    <q-img
          src="../assets/logo.png"
          style="width: 40%;"
       />
   </div>
<span class="text-h4 text-bold text-white flex flex-center q-px-xl">CONGRATULATIONS!</span>
    <span class="text-h5 text-white flex flex-center">WELCOME TO G2GBox!</span>

          <div   class = "flex flex-center q-mx-lg q-mt-xl">
           <q-list>
        <q-item clickable>
          <q-item-section avatar>
           <q-img
      alt=""
      src="../assets/cart.png"
      style = "width:80px;"
    />
          </q-item-section>

          <q-item-section>
            <span class = "text-white text-h4">SELL</span>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
             <q-img
      alt=""
      src="../assets/wallet.png"
      style = "width:80px;"
    />
          </q-item-section>

          <q-item-section>
            <span class = "text-white text-h4">EARN</span>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
           <q-img
      alt=""
      src="../assets/peso.png"
      style = "width:80px;"
    />
          </q-item-section>

          <q-item-section>
           <span class = "text-white text-h4">CASHOUT</span>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn rounded style="width:80%; font-size: 20px;" to = "/" class="q-my-xl" color="primary" label="Proceed to app" text-color="white"/>

    </div>

    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>

// import { QSpinnerIos } from 'quasar'
export default {
  name: 'welcome',
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
