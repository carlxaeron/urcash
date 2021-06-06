<template >
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container class="bg_image">
 <q-page class= "flex flex-center">
    <div class="q-pa-md vg" style = "width:100%; max-width:500px;">
      <div class = "row flex flex-center">
        <q-img
          src="../assets/logo.png"
          alt="AEX Mobile Logo"
          style="width: 30%"
          class = "align-center"
       />
        </div>
      <h4 class = "text-white text-center">Welcome to URCASH!</h4>
  <div class = "row">
      <p style="font-size: 18px;" class="float-left text-white">Mobile Number</p>
  </div>
      <q-input rounded ref = "mobile" :rules="[val => !!val || 'Required']" class="q-mb-lg" outlined v-model="mobile" :dense="dense" bg-color="white" prefix="+63" mask="##########"/>
      <q-btn rounded style="width:100%; font-size: 20px;" @click = "dologin()" :disable="disable" class="q-my-md" color="info" label="LOGIN" text-color="white"/>
       <div class = "row">
      <p style="font-size: 18px;" class="float-left text-white">No Account Yet?</p>
  </div>
      <q-btn rounded style="width:100%; font-size: 20px;" @click = "signup()" class="q-my-md" color="primary" label="SIGN UP" text-color="white"/>

      </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>

import { QSpinnerGears } from 'quasar'
export default {
  name: 'login',
  data () {
    return {
      disable: false,
      mobile: null,
      password: null,
      dense: false,
      server_message: ''
    }
  },
  methods: {
    servermsg () {
      this.$q.dialog({
        title: 'Something went wrong.',
        message: this.server_message,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'info',
        backgroundColor: 'white',
        spinnerSize: 140

      })
      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = 0
      }, 1000)
    },
    signup () {
      this.$router.replace('/register')
    },
    check () {
    },
    dologin () {
      this.disable = true
      this.$refs.mobile.validate()
      if (this.$refs.mobile.hasError) {
        this.disable = false
      } else {
        this.showLoading()
        this.$axios.post('login', {
          mobile_number: '63' + this.mobile,
          PS: 'Amping!'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          if (response.data.results === false) {
            this.$q.sessionStorage.set('locked', 'true')
            this.$router.replace('/lock')
          } else {
            this.$q.localStorage.set('mobile', '63' + this.mobile)
            this.$router.replace('/verify')
          }
        }
        ).catch(error => {
          this.server_message = error.response.data.message
          this.disable = false
          this.servermsg()
          console.log(error.response)
        })
      }
    }
  },
  created () {
    // if (localStorage.getItem('mobile') === null || localStorage.getItem('mobile') === undefined) {
    // } else {
    //   this.$router.replace('mpin')
    // }
  }
}
</script>

<style>
  .bg{
    background-color: rgba(0, 0, 0, 0.7);
    }
</style>
