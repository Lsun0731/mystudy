<template>
  <div class="todo-list">
    <div class="todo-header">
      <el-button type="primary" @click="$router.push('/todo/new')">新建待办事项</el-button>
      <div class="filters">
        <el-select v-model="filters.status" placeholder="状态" clearable>
          <el-option label="待完成" :value="0" />
          <el-option label="已完成" :value="1" />
        </el-select>
        <el-select v-model="filters.priority" placeholder="优先级" clearable>
          <el-option label="低" :value="1" />
          <el-option label="中" :value="2" />
          <el-option label="高" :value="3" />
        </el-select>
        <el-input
          v-model="filters.category"
          placeholder="分类"
          clearable
          style="width: 200px"
        />
      </div>
    </div>

    <el-table v-loading="todoStore.loading" :data="todoStore.todos">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 0 ? 'warning' : 'success'">
            {{ row.status === 0 ? '待完成' : '已完成' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级" width="100">
        <template #default="{ row }">
          <el-tag :type="priorityType(row.priority)">
            {{ priorityLabel(row.priority) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="due_date" label="截止日期" width="180">
        <template #default="{ row }">
          {{ formatDate(row.due_date) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              type="primary"
              :icon="Edit"
              @click="$router.push(`/todo/${row.id}`)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              :icon="Delete"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import { useTodoStore } from '../../stores/todo';
import dayjs from 'dayjs';

const todoStore = useTodoStore();

const filters = ref({
  status: undefined,
  priority: undefined,
  category: '',
});

const priorityType = (priority) => {
  const types = {
    1: 'info',
    2: 'warning',
    3: 'danger',
  };
  return types[priority] || 'info';
};

const priorityLabel = (priority) => {
  const labels = {
    1: '低',
    2: '中',
    3: '高',
  };
  return labels[priority] || '低';
};

const formatDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-';
};

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这个待办事项吗？', '提示', {
      type: 'warning',
    });
    await todoStore.removeTodo(row.id);
  } catch (error) {
    // 用户取消删除
  }
};

watch(
  filters,
  () => {
    todoStore.fetchTodos(filters.value);
  },
  { deep: true }
);

onMounted(() => {
  todoStore.fetchTodos();
});
</script>

<style scoped lang="scss">
.todo-list {
  padding: 20px;
}

.todo-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters {
  display: flex;
  gap: 10px;
}
</style> 