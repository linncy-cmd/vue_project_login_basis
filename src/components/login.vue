<template>
  <div class="container">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  create() {},
  methods: {
    // 重置表单数据
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return false
        }
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        window.sessionStorage.setItem('token', res.data.token)
        // console.log('登录成功')
        // 通过编程式导航跳转到后台界面，路由地址为/home
        this.$router.push('/home')
        this.$message.success(res.meta.msg)
      })
    }
  }
}
</script>
<style lang='less' scoped>
.container {
  position: relative;
  height: 100%;
  background-color: yellow;
}
.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450 / 50rem;
  height: 300 / 50rem;
  min-width: 9rem;
  background-color: #fff;
  .logo {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130 / 50rem;
    height: 130 / 50rem;
    overflow: hidden;
    padding: 10 / 50rem;
    box-shadow: 0 0 10 / 50rem #ddd;
    border: 1 / 50rem solid #eee;
    border-radius: 50%;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 10 / 50rem;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
