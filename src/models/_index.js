import RoleModel from './role.js';
import UserModel from './user.js';
import UnitModel from './unit.js';
import UserAccessLogModel from './userAccesLog.js';

const Role = RoleModel;
const User = UserModel;
const Unit = UnitModel;
const UserAccessLog = UserAccessLogModel;

const models = {
  Role,
  User,
  Unit,
  UserAccessLog,
};
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

export default models;
