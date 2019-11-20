<template>
  <div class="login-outer">
    <div class="width">
      <div class="login-box">
        <p class="header-title">
          <span class="login"
                :class="{'active':isActive}"
                @click="loginFunc=0">
            账户登录
          </span>
          <i>|</i>
          <span @click="loginFunc=1"
                :class="{'active':!isActive}">
            免费注册
          </span>
        </p>
      </div>
      <div class="login-sesson">
        <div class="box">
          <el-form :model="ruleForm"
                   status-icon
                   :rules="rules"
                   ref="ruleForm"
                   class="demo-ruleForm">
            <el-form-item label=""
                          prop="userName">
              <el-input type="text"
                        v-model="ruleForm.userName"
                        placeholder="请输入用户名"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label=""
                          prop="passWord">
              <el-input v-model.number="ruleForm.passWord"
                        placeholder="请输入密码"
                        type="passWord"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         @click="submitForm('ruleForm')">{{btnText}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        passWord: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      loginFunc: 0
    }
  },
  computed: {
    isActive () {
      return this.loginFunc === 0
    },
    btnText () {
      let ses = ''
      ses = this.loginFunc === 0 ? '登录' : '免费注册'
      return ses
    }
  },
  mounted () {

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            userName: this.ruleForm.userName,
            passWord: this.ruleForm.passWord,
            // 是否注册 1为注册
            register: this.loginFunc
          }
          this.axios.post('/register', params).then(res => {
            if (res.errCode === 0) {
              this.$message.success(res.message)
              // 如果注册成功了就自动登录
              if (this.loginFunc === 1) {
                this.loginFunc = 0
                this.submitForm('ruleForm')
              } else {
                // 存储用户数据
                this.$store.commit('userSesFunc', this.ruleForm)
                let pathS = this.$store.state.fromPath
                this.$router.push(pathS)
              }
            } else {
              this.$message.error(res.message)
            }
          })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-outer {
  background-color: #f5f5f5;
  .login-box {
    background-color: #fff;
    .header-title {
      text-align: center;
      padding: 20px 0;
      margin-bottom: 2px;
      span {
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #34ad2a;
        }
        &.active {
          font-size: 24px;
          color: #34ad2a;
        }
      }
      i {
        color: #e0e0e0;
        margin: 0 5px;
      }
    }
  }
  .login-sesson {
    background-color: #fff;
    padding: 10px 0;
    box-sizing: border-box;
    .box {
      width: 350px;
      margin: 0 auto;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
