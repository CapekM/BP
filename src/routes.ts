import { getAllUsers } from './controller/user';
import { login } from './controller/login';
import { postModel, deleteModel, putModel, getModel } from './controller/model';

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
];
