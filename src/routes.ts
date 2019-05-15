import { getAllUsers } from './controller/user';
import { login } from './controller/login';
import { postModel, deleteModel, putModel, getModel } from './controller/model';
import { putProject, postProject, getProject, deleteProject } from './controller/project';
import { putField, getField, postField, deleteField } from './controller/filed';

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: '/login',
    method: 'post',
    action: login,
  },
  {
    path: '/users',
    method: 'get',
    action: getAllUsers,
  },
  {
    path: '/model/:modelID',
    method: 'delete',
    action: deleteModel,
  },
  {
    path: '/model',
    method: 'put',
    action: putModel,
  },
  {
    path: '/model/:modelID',
    method: 'post',
    action: postModel,
  },
  {
    path: '/model/:modelID',
    method: 'get',
    action: getModel,
  },
  {
    path: '/project',
    method: 'put',
    action: putProject,
  },
  {
    path: '/project/:ProjectID',
    method: 'post',
    action: postProject,
  },
  {
    path: '/project/:ProjectID',
    method: 'get',
    action: getProject,
  },
  {
    path: '/project/:ProjectID',
    method: 'delete',
    action: deleteProject,
  },
  {
    path: '/field',
    method: 'put',
    action: putField,
  },
  {
    path: '/field/:FieldID',
    method: 'post',
    action: postField,
  },
  {
    path: '/field/:FieldID',
    method: 'get',
    action: getField,
  },
  {
    path: '/field/:FieldID',
    method: 'delete',
    action: deleteField,
  },
];
