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
        <span class= "text-h4" style="color: #fff;">ACCOUNT VERIFICATION</span>
        <p class = "text-white">Thank you for using G2GBox! Please verify your number. Enter the code we sent to your mobile.</p>
      </div>

      <div class="q-pa-md inp" style="max-width: 300px;">
        <q-input
          rounded
          class="q-mb-md"
          ref="input"
          outlined
          v-model="authcode"
          mask="NNNN"
          unmasked-value
          placeholder = "****"
          bg-color="white"
          style="font-size: 40px; text-align-last:center; "
          @change = 'send()'
        />
        <!-- <p class ="text-negative">({{ attempts }}) attempt/s remaining.</p> -->
         <!-- <q-btn @click = "verify()" style="font-size: 25px;" class="full-width" color="dark" label="CONFIRM" text-color="yellow-6" /> -->
                 <p class = "text-white q-mt-lg q-mb-none" v-if = "resend_otp === true">Did not recieve the code? Request a new one! </p>
         <q-btn rounded @click = "resend()" class = " full-width text-h5" color="primary" label="RESEND CODE" text-color="white" v-if = "resend_otp === true"/>
         <q-btn rounded class = " full-width text-h5" color="info" label="CONTACT US" text-color="white" v-if = "contact_us === true"/>
      </div>
    </div>
    </div>
 </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import { QSpinnerGears } from 'quasar'
export default {
  name: 'smsverify',
  data () {
    return {
      authcode: null,
      dense: false,
      attempts: 3,
      cook: null,
      resend_otp: false,
      server_message: null,
      contact_us: false
    }
  },
  methods: {
    send () {
      if (this.authcode.length === 4) {
        this.verify()
      }
    },
    resend () {
      this.resend_otp = false
      this.load = true
      this.$axios.post('resend-otp', {
        mobile_number: this.$q.localStorage.getItem('mobile').toString()
      }
      ).then(response => {
        this.authcode = null
      })
    },
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

      }).onDismiss(() => {
        this.resend_otp = true
      })
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'green',
        backgroundColor: 'white',
        spinnerSize: 140

      })
      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = 0
      }, 1000)
    },
    verify () {
      this.showLoading()
      this.$axios.post('validate-otp', {
        otp: this.authcode,
        mobile_number: this.$q.localStorage.getItem('mobile').toString()
      }
      ).then(response => {
        console.log(response.data)
        this.$q.sessionStorage.set('token', response.data.results.token)
        this.$router.replace('/welcome')
      }
      ).catch(error => {
        this.server_message = error.response.data.message
        this.servermsg()

        if (error.response.data.statusCode === 429) {
          this.$q.sessionStorage.set('locked', 'true')
          this.$router.replace('/lock')
        }
      })
    }

  },
  created () {
  }
}
</script>

<style>
  ::-webkit-input-placeholder {
    text-align: center;
  }
  :-moz-placeholder {
    text-align: center;
  }
  .inp input:focus {
    color: transparent;
    text-shadow: 0px 0px 0px #000;
    font-size: 40px;
}
</style>
