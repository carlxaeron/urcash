<template>
<q-layout view="lHh Lpr lFf" class="myfont flex flex-center" >
  <q-page-container>
 <q-page class= "flex flex-center vg">
      <q-dialog
      v-model="reg1"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
    <div class = " flex flex-center bg_image">
    <div class = "vg" style = "max-width:500px;">
    <i class = "fas fa-arrow-left text-white q-mx-lg q-mt-lg" @click="$router.replace('/login')" style="font-size:18px;"></i>
    <div class="row justify-center q-px-xl">
        <q-img
          src="../assets/logo.png"
          style="width: 130px;"
       />
      <div class="col-12 text-center">
        <h5 style="color:white;">CREATE AN ACCOUNT</h5>
      </div>

      <div class="col-12">
         <p class = "text-white text-bold">Last Name</p>
        <q-input rounded outlined ref="lastname"  :rules="[val => !!val || 'Required']" v-model="lastname" :dense="dense" bg-color="white">
           <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">First Name</p>
        <q-input rounded ref="firstname"  :rules="[val => !!val || 'Required']" outlined v-model="firstname" :dense="dense" bg-color="white">
            <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
        <p class = "text-white text-bold">Middle Name</p>
        <q-input rounded  ref="middlename"  :rules="[val => !!val || 'Required']" outlined v-model="middlename" :dense="dense" bg-color="white">
           <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Mobile Number</p>
        <q-input rounded ref="contactno"   :rules="[val => !!val || 'Required']" outlined v-model="contactno" :dense="dense" bg-color="white" prefix="+63" mask="##########" >
           <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
        <p class = "text-white text-bold">Email</p>
        <q-input rounded ref="email"   :rules="[val => !!val || 'Required']" outlined v-model="email" :dense="dense" bg-color="white"  type = "email">
           <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
        <p class = "text-white text-bold">Birthdate</p>
        <q-input rounded ref="birthdate" :rules="[val => !!val || 'Required']" outlined v-model="birthdate" :dense="dense" :max="maxdate" bg-color="white" type ="date">
           <template v-slot:prepend>
        </template>
        </q-input>
      </div>
       <div class="col-12">
     <q-btn rounded @click = "reg1_next()" style="width:100%; font-size: 20px;" class="q-my-md" color="primary" label="NEXT" text-color="white"/>
      </div>
    </div>
    </div>
    </div>
      </q-dialog>

   <q-dialog
      v-model="reg2"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
    <div class = " flex flex-center bg_image">
    <div class = "vg" style = "max-width:500px;">
    <i class = "fas fa-arrow-left text-white q-mx-lg q-mt-lg" @click="reg1 = true; reg2 = false" style="font-size:18px;"></i>
    <div class="row justify-center q-px-xl">
        <q-img
          src="../assets/logo.png"
          style="width: 130px;"
       />
      <div class="col-12 text-center text-bold">
        <h5 style="color: #fff;">CREATE AN ACCOUNT</h5>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Street/Village</p>
        <q-input rounded outlined  ref="street" :rules="[val => !!val || 'Required']" v-model="street" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Barangay</p>
        <q-input rounded  ref="brgy" :rules="[val => !!val || 'Required']" outlined v-model="brgy" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">City</p>
        <q-input rounded ref="city" :rules="[val => !!val || 'Required']" outlined v-model="city" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Province</p>
        <q-input rounded ref="province" :rules="[val => !!val || 'Required']" outlined v-model="province" :dense="dense" bg-color="white">
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
     <q-btn rounded @click = "reg2_next()" style="width:100%; font-size: 20px;" class="q-my-md" color="primary" label="NEXT" text-color="white"/>
      </div>
    </div>
    </div>
    </div>
   </q-dialog>

       <q-dialog
      v-model="regpass"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
    <div class = " flex flex-center bg_image">
    <div class = "vg" style = "max-width:500px;">
    <i class = "fas fa-arrow-left text-white q-mx-lg q-mt-lg" @click="reg2 = true; regpass = false" style="font-size:18px;"></i>
    <div class="row justify-center q-px-xl">
        <q-img
          src="../assets/logo.png"
          style="width: 130px;"
       />
      <div class="col-12 text-center text-bold">
        <h5 style="color: #fff;">CREATE PIN</h5>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Create PIN</p>
        <q-input rounded outlined  type="password" ref="pin" :rules="[val => !!val || 'Required']" v-model="pin" :dense="dense" bg-color="white" mask = "####" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Confirm PIN</p>
        <q-input rounded  type="password"  ref="cpin" :rules="[val => !!val || 'Required']" outlined v-model="cpin" :dense="dense" bg-color="white" mask = "####" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
     <q-btn rounded @click = "regpass_next()" style="width:100%; font-size: 20px;" class="q-my-md" color="primary" label="NEXT" text-color="white"/>
      </div>
    </div>
    </div>
    </div>
       </q-dialog>

   <q-dialog
      v-model="reg4"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
    <div class = " flex flex-center bg_image">
    <div class = "vg" style = "max-width:500px;">
    <i class = "fas fa-arrow-left text-white q-mx-lg q-mt-lg" @click="regpass = true; reg4 = false" style="font-size:18px;"></i>
    <div class="row justify-center q-px-xl">
        <q-img
          src="../assets/logo.png"
          style="width: 130px;"
       />
      <div class="col-12 text-center text-bold">
        <h5 style="color: #fff;">CREATE AN ACCOUNT STORE DETAILS</h5>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Registered Business Name</p>
        <q-input rounded outlined  ref="rbn" :rules="[val => !!val || 'Required']" v-model="rbn" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Business Address</p>
        <q-input rounded  ref="baddress" :rules="[val => !!val || 'Required']" outlined v-model="baddress" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Business - City</p>
        <q-input rounded ref="bcity" :rules="[val => !!val || 'Required']" outlined v-model="bcity" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Business - Province</p>
        <q-input rounded ref="bprovince" :rules="[val => !!val || 'Required']" outlined v-model="bprovince" :dense="dense" bg-color="white">
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
     <q-btn rounded @click = "reg4_next()" style="width:100%; font-size: 20px;" class="q-my-md" color="primary" label="NEXT" text-color="white"/>
      </div>
    </div>
    </div>
    </div>
   </q-dialog>
     <q-dialog
      v-model="reg3"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-right"
      transition-hide="slide-left"
    >
    <div class = " flex flex-center bg_image">
    <div class = "vg" style = "max-width:500px;">
    <i class = "fas fa-arrow-left text-white q-mx-lg q-mt-lg" @click="reg4 = true; reg3 = false" style="font-size:18px;"></i>
    <div class="row justify-center q-px-xl">
        <q-img
          src="../assets/logo.png"
          style="width: 130px;"
       />
      <div class="col-12 text-center">
        <h5 style="color: #fff;" class = "q-pb-none">PLEASE PROVIDE ANY OF  THE FOLLOWING</h5>

      </div>

      <div class="col-12">
        <p class = "text-white text-bold">DTI Registration No.</p>
        <q-input rounded outlined  v-model="dti" :dense="dense" bg-color="white"   >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">BIR Certificate of Registration</p>
        <q-input rounded   outlined v-model="bc" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>

      <div class="col-12">
        <p class = "text-white text-bold">Mayor's Business Permit No.</p>
        <q-input rounded outlined v-model="mp" :dense="dense" bg-color="white" >
          <template v-slot:prepend>
        </template>
        </q-input>
      </div>
      <div class="col-12">
         <q-toggle v-model="accept" class="text-bold" label="I have read UrCash Wallet's Terms and Condition" style="color:white" />
        </div>
         <div class="col-12">
         <q-toggle v-model="accept1" class="text-bold" label="I have read UrCash Wallet's Privacy Statement" style="color:white" />
        </div>
      <div class="col-12">
     <q-btn rounded v-if ="accept === true && accept1 === true  " @click = "reg3_sub()" style="width:100%; font-size: 20px;" class="q-my-md" color="primary" label="REGISTER" text-color="white"/>
      </div>
    </div>
    </div>
    </div>
     </q-dialog>

 </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import { QSpinnerGears } from 'quasar'
export default {
  name: 'Registration1',
  data () {
    return {
      disable: false,
      maxdate: new Date(new Date() - 567648000000).toJSON().slice(0, 10).replace(/-/g, '-'),
      lastname: null,
      firstname: null,
      middlename: null,
      contactno: null,
      email: null,
      birthdate: null,
      street: null,
      brgy: null,
      city: null,
      province: null,
      dense: false,
      maximizedToggle: true,
      reg1: true,
      reg2: false,
      reg3: false,
      accept: false,
      server_message: null,
      accept1: false,
      dti: null,
      bc: null,
      mp: null,
      reg4: false,
      rbn: null,
      baddress: null,
      bcity: null,
      bprovince: null,
      regpass: false,
      pin: null,
      cpin: null
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
    regpass_next () {
      this.$refs.pin.validate()
      this.$refs.cpin.validate()
      if (this.$refs.pin.hasError || this.$refs.cpin.hasError) {
      } else {
        if (this.pin !== this.cpin) {
          this.server_message = 'Please check your pin!'
          this.servermsg()
        } else {
          this.regpass = false
          this.reg4 = true
        }
      }
    },
    reg1_next () {
      this.$refs.lastname.validate()
      this.$refs.firstname.validate()
      this.$refs.contactno.validate()
      this.$refs.birthdate.validate()
      this.$refs.middlename.validate()
      this.$refs.email.validate()
      if (this.$refs.email.hasError || this.$refs.lastname.hasError || this.$refs.firstname.hasError || this.$refs.contactno.hasError || this.$refs.birthdate.hasError || this.$refs.middlename.hasError) {

      } else {
        this.reg1 = false
        this.reg2 = true
      }
    },
    reg2_next () {
      this.$refs.street.validate()
      this.$refs.brgy.validate()
      this.$refs.city.validate()
      this.$refs.province.validate()

      if (this.$refs.street.hasError || this.$refs.brgy.hasError || this.$refs.city.hasError || this.$refs.province.hasError) {
      } else {
        this.reg2 = false
        this.regpass = true
        // this.reg4 = true
      }
    },
    reg4_next () {
      this.$refs.baddress.validate()
      this.$refs.bprovince.validate()
      this.$refs.rbn.validate()
      this.$refs.bcity.validate()

      if (this.$refs.baddress.hasError || this.$refs.bprovince.hasError || this.$refs.bcity.hasError || this.$refs.rbn.hasError) {
      } else {
        this.reg4 = false
        this.reg3 = true
      }
    },
    reg3_sub () {
      // this.$router.replace('/verify')
      this.showLoading()
      // var d = this.birthdate.slice(0, 10).split('-')
      // var fd = d[1] + '/' + d[2] + '/' + d[0]
      this.$axios.post('register-user', {
        first_name: this.firstname,
        middle_name: this.middlename,
        last_name: this.lastname,
        birthdate: this.birthdate,
        mobile_number: '63' + this.contactno,
        email: this.email,
        street1: this.street,
        barangay: this.brgy,
        city: this.city,
        province: this.province,
        dti: this.dti,
        bir_reg_cert: this.bc,
        mayors_permit: this.mp,
        reg_bus_name: this.rbn,
        bus_address: this.baddress,
        bus_city: this.bcity,
        bus_province: this.province,
        password: this.pin
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        this.$q.localStorage.set('mobile', '63' + this.contactno)
        this.$router.replace('/verify')
      }
      ).catch(error => {
        if (error.reponse !== null || error.response !== undefined) {
          this.server_message = error.response.data.message
          this.servermsg()
        }
      })
    }
  },
  created () {
    window.open('https://terms.urcash.digital/urcashprivacy.pdf', '_blank')
    window.open('https://terms.urcash.digital/urcashtnc.pdf', '_blank')
  }
}
</script>

<style>
  p {
      font-size: 16px;
      color:#595959;
  }

</style>
