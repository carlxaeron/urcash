<template>
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container>
 <q-page>
   <div class = "row bg-secondary flex flex-center">
   <q-card flat class="bg-secondary">
      <q-card-section>
         <q-avatar size="150px" class="bg-black">
        <img :src="imUrl" alt="Profile Picture" />
         </q-avatar>
           <q-file class="q-px-xs q-pt-none" v-model ="picture" label="Update photo" @input="onSubmit()"  accept="image/*" input-class="text-white" label-color="white" borderless color = "white">
               <template v-slot:append>
          <q-icon name="camera" color="white" />
        </template>
               </q-file>
      </q-card-section >
    </q-card>
    </div>
     <div class="fit column wrap justify-center content-center q-px-xl">
      <div class="fit column wrap justify-center content-center">
          <span class = "text-h6 text-bold">Personal Information</span>
        <p class="fit c-lock"></p>
        <q-input
          clearable
          input-class="text-negative"
           @change="updpr()"
          clear-icon="close"
          v-model="fname"
          label="First Name"
        />
      </div>
       <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
          clearable
           input-class="text-negative"
          clear-icon="close"
           @change="updpr()"
          v-model="mname"
          label="Middle Name"
        />
      </div>
       <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
         @change="updpr()"
          clearable
          clear-icon="close"
          v-model="lname"
          label="Last Name"
        />
      </div>
      <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
          clear-icon="close"
          v-model="mobile"
          label="Phone Number"
        />
      </div>
      <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
          clear-icon="close"
          v-model="email"
          label="Email Address"
        />
      </div>
      <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
         @change="updpr()"
        type="date"
          clear-icon="close"
          v-model="birthdate"
          :max="maxdate"
        />
      </div>
      <div class="fit column wrap justify-center content-center">
           <span class = "text-h6 text-bold q-mt-lg">Address</span>
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
          clearable
           @change="updpr()"
          clear-icon="close"
          v-model="street"
          label="Street"
        />
      </div>
       <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
          clearable
           @change="updpr()"
          clear-icon="close"
          v-model="brgy"
          label="Brgy."
        />
      </div>
        <div class="fit column wrap justify-center content-center">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
          clearable
           @change="updpr()"
          clear-icon="close"
          v-model="city"
          label="City/Municipality"
        />
      </div>
        <div class="fit column wrap justify-center content-center q-mb-md">
        <p class="fit c-lock"></p>
        <q-input
         input-class="text-negative"
          clearable
           @change="updpr()"
          clear-icon="close"
          v-model="province"
          label="Province"
        />
      </div>
    </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>
<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      maxdate: new Date(new Date() - 567648000000).toJSON().slice(0, 10).replace(/-/g, '-'),
      balance: null,
      fname: null,
      lname: null,
      mname: null,
      birthdate: '',
      email: null,
      mobile: null,
      brgy: null,
      city: null,
      province: null,
      street: null,
      picture: null,
      id: null,
      msg: null,
      imUrl: 'https://cdn.quasar.dev/img/boy-avatar.png'
    }
  },
  methods: {
    updpr () {
      this.$axios.post('update-user/' + this.id, {
        first_name: this.fname,
        middle_name: this.mname,
        last_name: this.lname,
        birthdate: this.birthdate,
        street: this.street,
        barangay: this.brgy,
        city: this.city,
        province: this.province
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        console.log(response.data)
        this.msg = 'Update successful!'
        this.showNotif()
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    showNotif () {
      this.$q.notify({
        message: this.msg,
        color: 'info'
      })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('select_file', this.picture)
      this.$axios.post('update/user/' + this.id + '/profile/picture', formData,
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(response => {
        console.log(response.data)
        this.msg = 'Profile picture updated successfully!'
        this.showNotif()
        location.reload()
      }
      ).catch(error => {
        console.log(error.response)
      })
    },
    formatPrice (value) {
      const val = (value / 1).toFixed(2).replace(',', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getUser () {
      this.$axios.post('user', {
        mobile_number: this.$q.localStorage.getItem('mobile').toString()
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        this.fname = response.data.results.user.first_name
        this.id = response.data.results.user.id
        this.imUrl = 'https://api.markturtlehouse.dev/' + response.data.results.user.profile_picture
        this.lname = response.data.results.user.last_name
        this.mname = response.data.results.user.middle_name
        this.birthdate = response.data.results.birthdate
        this.email = response.data.results.user.email
        this.mobile = response.data.results.user.mobile_number
        this.brgy = response.data.results.address.barangay
        this.city = response.data.results.address.city
        this.province = response.data.results.address.province
        this.street = response.data.results.address.street
        this.balance = parseInt(response.data.results.voucher_account.voucher_balanace)
      }
      ).catch(error => {
        console.log(error.response)
      })
    }
  },
  created () {
    this.getUser()
  }

}
</script>
