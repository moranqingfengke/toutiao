<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="userProfile.photo" @click="$refs.fileRef.click()" />
          <input type="file" accept="image/*" @change="onFileChange" v-show="false" ref="fileRef" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="userProfile.name" @click="onNameCellClick" />
      <van-cell title="生日" is-link :value="userProfile.birthday" @click="onBirthCellClick" />
    </van-cell-group>
    <!-- 修改用户名称的对话框 -->
    <van-dialog v-model="showNameDialog" title="修改名称" show-cancel-button :before-close="beforeClose">
      <van-field v-model.trim="name" placeholder="请输入用户名" input-align="center" maxlength="7" ref="nameRef" />
    </van-dialog>
    <!-- 修改生日的动作面板 -->
    <van-action-sheet v-model="showBirthSheet">
      <van-datetime-picker v-model="currentDate" type="date" title="选择出生日期" :min-date="minDate" :max-date="maxDate" @cancel="showBirthSheet = false" @confirm="updateBirthday" />
    </van-action-sheet>
  </div>
</template>

<script>

// 按需导入辅助函数
import { mapActions, mapState } from 'vuex'
// 导入修改信息的接口，修改头像接口
import { updateUserProfileAPI, updateUserAvatarAPI } from '@/api/userAPI.js'
// 导入dayjs
import dayjs from 'dayjs'

export default {
  name: 'UserEdit',
  data () {
    return {
      // 是否展示修改姓名的对话框
      showNameDialog: false,
      // 用户填写的姓名
      name: '',
      // 是否展示修改生日对话框
      showBirthSheet: false,
      // 最小可选日期（0 表示 1月份）
      minDate: new Date(1900, 0, 1),
      // 最大可选日期（11 表示 12月份）
      maxDate: new Date(2050, 11, 31),
      // 当前日期
      currentDate: new Date()
    }
  },
  methods: {
    ...mapActions(['initUserProfile']),
    ...mapState(['userProfile']),
    // 点击了修改名称的 cell
    onNameCellClick () {
      this.showNameDialog = true
      this.name = this.userProfile.name
      this.$nextTick(() => {
        this.$refs.nameRef.focus()
      })
    },
    // 更新用户简介
    async updateName (done) {
      try {
        const { data: res } = await updateUserProfileAPI({ name: this.name })
        if (res.message === 'OK') {
          done()
          this.initUserProfile()
          this.$notify({ type: 'success', message: '名称更新成功！', duration: 2000 })
        }
      } catch (e) {
        if (e.response.status === 409) {
          this.$notify({ type: 'warning', message: '名称被占用，请更换后重试！', duration: 2000 })
          done(false)
          this.$refs.nameRef.focus()
        } else {
          done()
          this.$notify({ type: 'danger', message: '名称更新失败！', duration: 2000 })
        }
      }
    },
    // 修改生日
    onBirthCellClick () {
      this.showBirthSheet = true
      this.currentDate = this.userProfile.birthday ? new Date(this.userProfile.birthday) : new Date()
    },
    // 更新生日
    async updateBirthday (value) {
      this.showBirthSheet = false
      const dateStr = dayjs(value).format('YYYY-MM-DD')
      const { data: res } = await updateUserProfileAPI({ birthday: dateStr })
      if (res.message === 'OK') {
        this.initUserProfile()
        this.$notify({ type: 'success', message: '生日修改成功！', duration: 2000 })
      }
    },
    // 关闭前处理函数
    beforeClose (action, done) {
      if (action === 'cancel') return done()
      if (this.name === '' || this.name.length > 7) {
        this.$notify({ type: 'warning', message: '名称的长度为1-7个字符', duration: 2000 })
        this.$refs.nameRef.focus()
        return done(false)
      }
      this.updateName(done)
    },
    // 选中文件变化
    async onFileChange (e) {
      const files = e.currentTarget.files
      if (files.length === 0) return
      const fd = new FormData()
      fd.append('photo', files[0])
      const { data: res } = await updateUserAvatarAPI(fd)
      if (res.message === 'OK') {
        this.initUserProfile()
        this.$notify({ type: 'success', message: '更新头像成功！', duration: 2000 })
      }
    }
  },
  created () {
    this.initUserProfile()
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
}

.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
