<template>
  <div class="capital">
    <div class="header">
      <el-form :inline="true" ref="addData" :model="time">
        <!-- 筛选 -->
        <el-form-item label="按照时间筛选">
          <el-date-picker
            v-model="time.startTime"
            type="date"
            placeholder="选择开始时间"
          />
          <span>---</span>
          <el-date-picker
            v-model="time.endTime"
            type="date"
            placeholder="选择结束时间"
          />
        </el-form-item>
        <el-form-item class="btnLeft">
          <el-button type="primary" :icon="Search" @click="handleSearch">筛选</el-button>
        </el-form-item>
        <!-- 添加 -->
        <el-form-item class="btnRight">
          <el-button 
            type="primary" 
            :icon="View" 
            @click="handleAdd" 
            v-if="useStore.userInfo?.identity === '管理员'"
          >
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottomTable">
      <el-table :data="tableList" style="width: 100%" border>
        <el-table-column label="序号" width="70" type="index" align="center"></el-table-column>
        <el-table-column label="创建时间" width="220" prop="date" align="center">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="100" prop="type" align="center"></el-table-column>
        <el-table-column label="收支描述" width="100" prop="describe" align="center"></el-table-column>
        <el-table-column label="收入" width="120" prop="income" align="center">
          <template #default="scope">
            <span style="color: #00d053;">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="120" prop="expend" align="center">
          <template #default="scope">
            <span style="color: #f56767;">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户现金" width="150" prop="cash" align="center">
          <template #default="scope">
            <span style="color: #4db3ff;">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="150" prop="remark" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button 
              :icon="Edit" 
              type="warning" 
              size="small"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button 
              size="small" 
              :icon="Delete" 
              type="danger" 
              @click="handleDelete(scope.row)" 
              v-if="useStore.userInfo?.identity === '管理员'"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handlePage"
        @size-change="handleSize"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :page-sizes="[3, 5, 7, 9, 10]"
        :total="total"
      />
    </div>
    <el-dialog 
      :title="formData.id ? '修改资金信息' : '添加资金信息'"
      v-model="showDialog"
      :close-on-click-model="false"
      :close-on-press-escape="false"
      :model-append-to-body="false"
    >
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px" style="margin: 10px; width: auto;">
        <el-form-item label="收支类型:">
          <el-select v-model="formData.type" placeholder="请选择收支类型">
            <el-option v-for="(item, index) in format" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述:" prop="describe">
          <el-input type="describe" v-model="formData.describe"></el-input>
        </el-form-item>
        <el-form-item label="收入:" prop="income">
          <el-input type="income" v-model="formData.income"></el-input>
        </el-form-item>
        <el-form-item label="支出:" prop="expend">
          <el-input type="expend" v-model="formData.expend"></el-input>
        </el-form-item>
        <el-form-item label="账户现金:" prop="cash">
          <el-input type="cash" v-model="formData.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="onSumbit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getAllProfile, addOrEditProfile, deleteProfile } from '@/api/profile'
import { Timer, Edit, Delete, View, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/user'

// 定义打开对话框的变量
let showDialog = ref<boolean>(false)
// 对话框表单类型数据
const format = ref(['提现', '提现手续费', '充值', '优惠卷', '充值礼卷', '转账' ])
// 对话框表单所需数据
const formData = reactive({
  type: '',
  id: '',
  describe: '',
  income: '',
  expend: '',
  cash: '',
  remark: ''
})
// 获取表单实例
let formRef = ref()
// 分页器
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
// 开始和结束时间
const time = reactive({
  startTime: '',
  endTime: '',
})
const useStore = useUserStore()

const handlePage = (pager: number) => {
  getAllProfileData(pager)
}
const handleSize = (size: number) => {
  pageSize.value = size
  getAllProfileData(pageNo.value, size)
}

// 获取表格列表数据
let tableList = ref<any[]>([])
const getAllProfileData = async (pager = 1, size = 3) => {
  pageNo.value = pager
  pageSize.value = size
  const startIndex = (pager - 1) * size
  const endIndex = startIndex + size
  const res = await getAllProfile()
  const profiles = res.profiles.slice(startIndex, endIndex)
  profiles.forEach((item: any) => {
    const originalDate = item.date;
    const formattedDate = originalDate.replace('T', ' ').replace('.000Z', '');
    item.date = formattedDate;
  })
  tableList.value = profiles
  total.value = res.profiles.length
}
// 筛选按钮回调
const handleSearch = () => {
  if (!time.startTime || !time.endTime) {
    ElMessage({
      type: 'error',
      message: '请选择时间区间'
    })
    getAllProfileData()
    return
  }
  const sTime = new Date(time.startTime).toISOString().slice(0, 10) as unknown as number
  const eTime = new Date(time.endTime).toISOString().slice(0, 10) as unknown as number
  const allTableData = tableList.value.filter((item: any) => {
    let date = new Date(item.date).toISOString().slice(0, 10) as unknown as number
    return date >= sTime && date <= eTime
  })
  tableList.value = allTableData
}

// 初始化调用
onMounted(() => {
  getAllProfileData()
})
// 弹框校验规则
const rules = {
  type: [{ required: true, message: '不能为空！', trigger: ['blur'] }],
  describe: [{ required: true, message: '不能为空！', trigger: ['blur'] }],
  income: [{ required: true, message: '不能为空！', trigger: ['blur'] }],
  expend: [{ required: true, message: '不能为空！', trigger: ['blur'] }],
  cash: [{ required: true, message: '不能为空！', trigger: ['blur'] }],
}
// 添加信息
const handleAdd = () => {
  showDialog.value = true
  Object.assign(formData, {
    type: '',
    id: '',
    describe: '',
    income: '',
    expend: '',
    cash: '',
    remark: ''
  })
  formRef.value.clearValidate()
}
// 弹框取消按钮
const cancel = () => {
  showDialog.value = false
}
// 弹框提交按钮
const onSumbit = async () => {
  // 在发起请求前对整个表单进行校验
  formRef.value.validate()
  const res = await addOrEditProfile(formData)
  if (res._id) {
    showDialog.value = false
    ElMessage({
      type: 'success',
      message: formData.id ? '修改数据成功' : '添加数据成功'
    })
    getAllProfileData()
  } else {
    ElMessage({
      type: 'error',
      message: formData.id ? '修改数据失败' : '添加数据失败'
    })
  }
}
// 编辑表格
const handleEdit = async (row: any) => {
  // 对话框显示
  showDialog.value = true
  Object.assign(formData, row, { id: row._id })
}
// 删除表格
const handleDelete = async (row: any) => {
  const res = await deleteProfile(row._id)
  if (res._id) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getAllProfileData()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
</script>

<style lang="scss" scoped>
.capital {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>