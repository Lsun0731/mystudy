<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" type="textarea" rows="3" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio :label="0">待完成</el-radio>
        <el-radio :label="1">已完成</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="优先级" prop="priority">
      <el-radio-group v-model="form.priority">
        <el-radio :label="1">低</el-radio>
        <el-radio :label="2">中</el-radio>
        <el-radio :label="3">高</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <el-input v-model="form.category" />
    </el-form-item>
    <el-form-item label="截止日期" prop="due_date">
      <el-date-picker
        v-model="form.due_date"
        type="datetime"
        placeholder="选择日期时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">{{ submitText }}</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      status: 0,
      priority: 1,
      category: '',
      due_date: null,
    }),
  },
  submitText: {
    type: String,
    default: '提交',
  },
});

const emit = defineEmits(['submit']);

const formRef = ref(null);
const form = ref({ ...props.initialData });

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  priority: [{ required: true, message: '请选择优先级', trigger: 'change' }],
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      emit('submit', { ...form.value });
    }
  });
};

defineExpose({
  form,
  formRef,
});
</script> 