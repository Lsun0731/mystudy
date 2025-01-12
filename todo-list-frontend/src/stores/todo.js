import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTodoList, createTodo, updateTodo, deleteTodo } from '../api/todo';
import { ElMessage } from 'element-plus';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([]);
  const loading = ref(false);

  // 获取待办事项列表
  const fetchTodos = async (params) => {
    loading.value = true;
    try {
      todos.value = await getTodoList(params);
    } catch (error) {
      ElMessage.error('获取待办事项失败');
    } finally {
      loading.value = false;
    }
  };

  // 添加待办事项
  const addTodo = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      todos.value.unshift(newTodo);
      ElMessage.success('添加成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 更新待办事项
  const updateTodoItem = async (id, todo) => {
    try {
      const updatedTodo = await updateTodo(id, todo);
      const index = todos.value.findIndex(item => item.id === id);
      if (index !== -1) {
        todos.value[index] = updatedTodo;
      }
      ElMessage.success('更新成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  // 删除待办事项
  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      const index = todos.value.findIndex(item => item.id === id);
      if (index !== -1) {
        todos.value.splice(index, 1);
      }
      ElMessage.success('删除成功');
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    updateTodoItem,
    removeTodo,
  };
}); 