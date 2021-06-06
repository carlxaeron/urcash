<template>
<q-layout view="lHh Lpr lFf" class="myfont " >
  <q-page-container>
 <q-page>
       <div class = "col-lg-12 col-md-12 col-sm-12 q-mt-md flex flex-center">
           <span class = "text-h4 text-bold q-my-md">Customer Support</span>
           </div>
     <center>
     <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
        <q-select outlined v-model="concern" :options="concerns" label="Select Your Concern" ref="concern"   :rules="[val => !!val || 'Required']" />
        <q-select outlined v-model="priority" :options="priorities" label="Select Your Priorities" ref="priority"   :rules="[val => !!val || 'Required']" />
        <q-input
        ref="message"   :rules="[val => !!val || 'Required']"
      v-model="message"
      filled
      type="textarea"
    />
     <q-btn
            size="20px"
            class=" q-mt-md float-right"
            color="info"
            label="Send"
              @click ="onSubmit()"
          />
      </div>
    </div>
    </center>
    </q-page>
  </q-page-container>
</q-layout>
</template>
<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      concern: null,
      concerns: [
        ' Scan QR', 'Voucher', 'Cashout', 'Pay QR', 'Verification', 'Others'
      ],
      priority: null,
      priorities: [
        'Low', 'Medium', 'High', 'Urgent'
      ],
      message: 'Write Something!',
      name: null,
      email: null,
      msg: null
    }
  },
  methods: {
    onSubmit () {
      this.$refs.concern.validate()
      this.$refs.priority.validate()
      this.$refs.message.validate()
      if (this.$refs.concern.hasError || this.$refs.priority.hasError || this.$refs.message.hasError) {
      } else {
        this.$axios.post('support_tickets/create', {
          name: this.name,
          mobile_number: this.$q.localStorage.getItem('mobile').toString(),
          email: this.email,
          issue: this.concern,
          priority: this.priority,
          description: this.message
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$q.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
        ).then(response => {
          console.log(response.data)
          this.msg = 'Message Successfully Sent!'
          this.showNotif()
        }
        ).catch(error => {
          console.log(error.response)
        })
      }
    },
    showNotif () {
      this.$q.notify({
        message: this.msg,
        color: 'info'
      })
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
        this.name = response.data.results.user.first_name + ' ' + response.data.results.user.middle_name + ' ' + response.data.results.user.last_name
        this.email = response.data.results.user.email
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
