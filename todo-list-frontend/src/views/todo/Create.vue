<template>
  <div class="todo-create">
    <h2>新建待办事项</h2>
    <todo-form @submit="handleSubmit" submit-text="创建" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useTodoStore } from '../../stores/todo';
import TodoForm from '../../components/TodoForm.vue';

const router = useRouter();
const todoStore = useTodoStore();

const handleSubmit = async (formData) => {
  const success = await todoStore.addTodo(formData);
  if (success) {
    router.push('/');
  }
};
</script>

<style scoped lang="scss">
.todo-create {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style> 