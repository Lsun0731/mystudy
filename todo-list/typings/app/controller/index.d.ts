// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportTodo = require('../../../app/controller/todo');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    todo: ExportTodo;
    user: ExportUser;
  }
}
