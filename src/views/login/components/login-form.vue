<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="simpleSchema"
      v-slot="{ errors }"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
          <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="password"
              placeholder="请输入验证码"
            />
            <span @click="send()" class="code">
              {{ time === 0 ? '发送验证码' : `${time}秒后发送` }}
            </span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="Checkbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a @click="submit()" href="javascript:;" class="btn">登 录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch, onUnmounted } from 'vue'
import { Form, Field } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import {
  userAccountLogin,
  userMobileLoginMsg,
  userMobileLogin
} from '@/api/user'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup() {
    // 控制短信登录切换的
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    // vee-validate校验基本步骤
    // 1.导入Form Filed组件将 form 和 input 进行替换，需要加上name用来指定将来的校验规则函数的
    // 2.Field 需要进行数据绑定,字段名称最好和后台接口保持一致
    // 3.定义Filed的name属性指定的校验规则函数，Form的validate-schema接受定义好的校验规则是对象
    // 校验规则对象
    const simpleSchema = reactive({
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree
    })
    // 切换表单元素，还原数据和清除校验效果
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 补充校验效果清除，Form组件提供resetForm()
      formCom.value.resetForm()
    })

    // 使用store
    const store = useStore()
    // 使用router
    const router = useRouter()
    // 使用route
    const route = useRoute()
    // 登录提交
    const submit = async () => {
      // 整体校验
      const valid = await formCom.value.validate()
      if (valid) {
        // 发送请求
        let data = null
        try {
          if (!isMsgLogin.value) {
            // 帐号登录
            data = await userAccountLogin(form)
          } else {
            // 短信登录
            // 1. 定义两个API  短信登录，获取短信验证码
            // 2. 实现发送短信验证码发送功能
            // 3. 完成手机号短信验证码登录逻辑
            data = await userMobileLogin(form)
          }
        } catch (e) {
          Message({
            type: 'error',
            text: e.response.data.message || '登录失败'
          })
        }
        // 成功
        // 1. 存储信息
        const { id, account, nickname, avatar, token, mobile } = data.result
        store.commit('user/setUser', {
          id,
          account,
          nickname,
          avatar,
          token,
          mobile
        })
        // 合并购物车操作
        store.dispatch('cart/mergeLocalCart').then(() => {
          // 2. 提示
          Message({ type: 'success', text: '登录成功' })
          // 3. 跳转
          router.push(route.query.redirectUrl || '/')
        })
      }
    }
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const time = ref(1)
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--
        if (time.value <= 0) {
          pause()
        }
      },
      1000,
      true
    )
    onUnmounted(() => {
      pause()
    })

    // 发送短信
    const send = async () => {
      const valid = simpleSchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    return { isMsgLogin, form, simpleSchema, submit, formCom, send, time }
  }
}
</script>

<style lang="scss" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: $mainColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: $priceColor;
          }
          &.active,
          &:focus {
            border-color: $mainColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $mainColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
