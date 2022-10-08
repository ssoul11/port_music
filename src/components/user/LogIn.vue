<template>
  <div class="login_div">
    <van-form @submit="onSubmit">
      <div class="main_icon">
        <img src="../../../public/main_icon.png" alt="" />
      </div>
      <van-cell-group inset>
        <van-field
          v-model.number="username"
          name="number"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="pass"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          color="#333"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import store from '@/store'
import { mapState } from 'vuex'
export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const onSubmit = (values) => {
      console.log('submit', values)
      Login()
    }
    function Login() {
      store.dispatch('getloginToken', { username, password })
      //   location.reload()
    }
    return {
      username,
      password,
      onSubmit
    }
  },
  computed: {
    ...mapState(['hasToken'])
  },
  mounted() {
    // console.log(this.hasToken, store.state.hasToken)
  },
  watch: {
    // hasToken(newV) {
    //   if (newV === true) {
    //     location.reload()
    //   }
    // }
  }
}
</script>
<style scoped>
.login_div {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main_icon {
  width: 40%;
  /* height: 10%; */
  margin: 0 auto;
  background-color: #333;
  border-radius: 1rem;
}
.main_icon img {
  width: 100%;
}
</style>
