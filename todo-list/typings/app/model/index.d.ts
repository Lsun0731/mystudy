// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportTodos = require('../../../app/model/todos');
import ExportUsers = require('../../../app/model/users');

declare module 'egg' {
  interface IModel {
    Todos: ReturnType<typeof ExportTodos>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
