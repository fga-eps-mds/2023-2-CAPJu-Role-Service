import models from '../models/_index.js';
import RoleService from './role.js';
import UserService from './user.js';
import UserAccessLogService from './userAccessLog.js';

const roleService = new RoleService(models.Role);
const userService = new UserService();
const userAccessLogService = new UserAccessLogService();

const services = {
  roleService,
  userService,
  userAccessLogService,
};

export default services;
