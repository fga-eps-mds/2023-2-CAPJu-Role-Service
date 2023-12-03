import models from '../models/_index.js';
import RoleService from './role.js';
import UserService from "./user.js";

const roleService = new RoleService(models.Role);
const userService = new UserService();

const services = {
  roleService,
  userService,
};

export default services;
