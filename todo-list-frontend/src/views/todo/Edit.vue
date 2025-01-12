<template>
  <div class="todo-edit">
    <h2>编辑待办事项</h2>
    <todo-form
      v-if="todo"
      :initial-data="todo"
      @submit="handleSubmit"
      submit-text="保存"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTodoStore } from '../../stores/todo';
import { getTodoDetail } from '../../api/todo';
import TodoForm from '../../components/TodoForm.vue';

const router = useRouter();
const route = useRoute();
const todoStore = useTodoStore();
const todo = ref(null);

onMounted(async () => {
  try {
    todo.value = await getTodoDetail(route.params.id);
  } catch (error) {
    router.push('/');
  }
});

const handleSubmit = async (formData) => {
  const success = await todoStore.updateTodoItem(route.params.id, formData);
  if (success) {
    router.push('/');
  }
};
</script>

<style scoped lang="scss">
.todo-edit {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style> 