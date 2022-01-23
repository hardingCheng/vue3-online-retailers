<template>
  <Dialog
    :title="(formData.id ? '编辑' : '添加') + '收货地址'"
    v-model:visible="dialogVisible"
  >
    <div class="address-edit">
      <div class="form">
        <div class="form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">地区：</div>
          <div class="field">
            <City
              placeholder="请选择所在地区"
              :fullLocation="form.fullLocation"
              @change="changeCty"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <Button
        type="gray"
        @click="dialogVisible = false"
        style="margin-right: 20px"
        >取消</Button
      >
      <Button type="primary" @click="submit">确认</Button>
    </template>
  </Dialog>
</template>
<script>
import { ref, reactive } from 'vue'
import { editAddress, addAddress } from '@/api/order'
import Message from '@/components/library/Message'
export default {
  name: 'AddressEdit',
  emits: ['on-success'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    // 表单数据
    const formData = reactive({
      id: '',
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      fullLocation: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0
    })
    // 选择地区
    const changeCty = (data) => {
      formData.provinceCode = data.provinceCode
      formData.cityCode = data.cityCode
      formData.countyCode = data.countyCode
      formData.fullLocation = data.fullLocation
    }
    // 提交操作
    const submit = () => {
      if (formData.id) {
        editAddress(formData).then((data) => {
          // 修改成功
          Message({ text: '修改收货地址成功', type: 'success' })
          dialogVisible.value = false
          emit('on-success', formData)
        })
      } else {
        addAddress(formData).then((data) => {
          // 添加成功
          Message({ text: '添加收货地址成功', type: 'success' })
          formData.id = data.result.id
          dialogVisible.value = false
          emit('on-success', formData)
        })
      }
    }

    // 打开对话框函数
    const open = (address) => {
      // 先填充数据 - 编辑
      if (address.id) {
        for (const key in formData) {
          formData[key] = address[key]
        }
      } else {
        // 先清空数据 - 添加
        for (const key in formData) {
          if (key !== 'isDefault') {
            formData[key] = ''
          }
        }
      }
      dialogVisible.value = true
    }
    return { dialogVisible, open, formData, changeCty, submit }
  }
}
</script>
<style scoped lang="scss">
.dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.address-edit {
  .form {
    padding: 0;
    input {
      outline: none;
      &::placeholder {
        color: #ccc;
      }
    }
  }
  .city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
</style>
