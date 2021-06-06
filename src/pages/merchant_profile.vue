<template>
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container>
 <q-page>
      <div class="flex flex-center q-mt-md">
     <q-card class="my-card">
      <q-img  src="../assets/store_icon.png" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; left: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            {{ address }}
          </div>
        </div>
      <div class="col text-h6 ellipsis">
            {{ store_name }}
          </div>
        <q-rating v-model="stars" :max="5" size="32px" />
      </q-card-section>

      <q-card-section class="q-pt-none"  v-if="dti !== null">
        <div class="text-subtitle1">
          {{ dti }}
        </div>
        <div class="text-caption text-grey"  v-if="dti !== null">
         Registered DTI Number
        </div>
        <div class ="text-subtitle1"  v-if="mayors_permit !== null">
          {{ mayors_permit }}
        </div>
        <div class="text-caption text-grey"  v-if="mayors_permit !== null">
        Mayor's Permit
        </div>
        <div class="text-subtitle1" v-if="bir !== null">
          {{ bir }}
        </div>
        <div class="text-caption text-grey"  v-if="bir !== null">
         BIR Registered Certificate
        </div>
      </q-card-section>
    </q-card>
      </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>
<script>
export default {
  name: 'merchantProfile',
  data () {
    return {
      id: null,
      msg: null,
      store_name: null,
      address: null,
      mayors_permit: null,
      dti: null,
      bir: null,
      stars: 5
    }
  },
  methods: {
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
        this.store_name = response.data.results.shop.reg_bus_name
        this.address = response.data.results.shop_address.complete_address + ' ' + response.data.results.shop_address.city + ' ' + response.data.results.shop_address.province
        this.mayors_permit = response.data.results.shop.mayors_permit
        this.dti = response.data.results.shop.dti
        this.bir = response.data.results.shop.bir_reg_cert
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
