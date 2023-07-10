<script setup lang="ts">
import { useCategoryStore } from '@/store/categoryStore'
import { nextTick, ref } from 'vue'
import type { Attr, AttrValue } from '@/api/product/attr/type'
import { addorUpdateAttrApi } from '@/api/product/attr/index'
import { ElMessage } from 'element-plus'
import type { InputInstance } from 'element-plus'

defineOptions({
  name: 'Attr'
})

const categoryStore = useCategoryStore()

const scene = ref(0) // 控制属性展示与属性修改页面显隐 0属性展示 1属性修改

const reqData = ref<Attr>({
  attrName: '',
  categoryId: 0,
  categoryLevel: 3,
  attrValueList: []
})

// 添加属性按钮的回调
function addAttr() {
  // 清除上次数据
  Object.assign(reqData.value, {
    attrName: '',
    categoryId: 0,
    categoryLevel: 3,
    attrValueList: []
  })
  scene.value = 1
  // 获取当前三级分类 id
  reqData.value.categoryId = categoryStore.cate3Id as number
}

// 取消添加属性的回调
function cancel() {
  scene.value = 0
}

// 添加属性值按钮的回调
function addAttrValue() {
  reqData.value.attrValueList.push({
    valueName: '',
    flag: true // true展示input false展示div
  })
  nextTick(() => inputRefArr.value[reqData.value.attrValueList.length - 1]!.focus())
}

// 保存属性按钮的回调
async function save() {
  // valueName 是否有空值判断
  if (!reqData.value.attrValueList.every(item => item.valueName)) {
    ElMessage.error('属性值不得为空')
    return
  }
  // valueName 是否重复判断
  const valArr = reqData.value.attrValueList.map(item => item.valueName)
  if (valArr.length !== new Set(valArr).size) {
    ElMessage.error('属性值不得重复')
    return
  }

  const res = await addorUpdateAttrApi(reqData.value)
  if (res.code === 200) {
    ElMessage.success(reqData.value.id ? '属性修改成功' : '属性添加成功')
    scene.value = 0
    // 重新请求最新属性列表
    categoryStore.getAttrList()
  } else {
    ElMessage.error(reqData.value.id ? '属性修改失败' : '属性添加失败')
  }
}

const inputRefArr = ref<(InputInstance | null)[]>([]) // 属性值输入框元素引用数据
// 属性值输入框失去焦点/点击属性值的回调
function changeMode(row: AttrValue, $index?: number) {
  // 未输入内容时不切换
  if (!row.valueName) return

  row.flag = !row.flag
  // 点击属性值时
  if (row.flag) {
    // 聚焦 input
    nextTick(() => inputRefArr.value[$index as number]!.focus())
  }
}
</script>

<template>
  <div class="attr">
    <!-- 分类 -->
    <Category :scene="scene" />

    <el-card style="margin: 20px 0">
      <!-- 属性展示表格 -->
      <div v-show="!scene">
        <el-button @click="addAttr" type="primary" icon="Plus" :disabled="categoryStore.cate3Id ? false : true"
          >添加平台属性</el-button
        >
        <el-table :data="categoryStore.attrList" border>
          <el-table-column label="序号" type="index" width="80" align="center" />
          <el-table-column label="属性名" prop="attrName" width="200" />
          <el-table-column label="属性值名称" prop="attrValueList">
            <template #default="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default>
              <el-button icon="Edit" type="primary" size="small">编辑</el-button>
              <el-button icon="Delete" type="danger" size="small"> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 属性添加/修改表格 -->
      <div v-show="scene">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input v-model.trim="reqData.attrName" placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="reqData.attrName ? false : true" type="primary" icon="Plus" @click="addAttrValue">
          添加属性值
        </el-button>
        <el-table :data="reqData.attrValueList" border>
          <el-table-column label="序号" type="index" width="100" align="center" />
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <!-- 显示文本框 -->
              <!-- :ref 绑定的函数每次模板变化都会执行一次 故不能用 push 方法 -->
              <el-input
                size="small"
                placeholder="请输入属性值"
                class="value-input"
                v-if="row.flag"
                v-model.trim="row.valueName"
                @blur="changeMode(row)"
                :ref="(el: InputInstance) => inputRefArr[$index] = el"
              ></el-input>
              <!-- 展示输入的属性值 -->
              <div @click="changeMode(row, $index)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="500">
            <template #default="{ $index }">
              <el-button @click="reqData.attrValueList.splice($index, 1)" icon="Delete" type="danger" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save" :disabled="reqData.attrValueList.length > 0 ? false : true">
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-table {
  margin: 20px 0;

  .el-tag {
    margin: 5px;
  }
}
</style>
