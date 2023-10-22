import { RoleController } from '../../src/controllers/role.js';
import RoleService from '../../src/services/role.js';

jest.mock('axios');
jest.mock('../../src/services/role.js')

const reqMock = {};

const resMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('role endpoints', () => {
  let roleController;

  beforeEach(() => {
    roleController = new RoleController();
    roleController.roleService = new RoleService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('index - list all roles (200)', async () => {
    const mockRoles = [
      {
        idRole: 2,
        name: "Servidor",
        accessLevel: 3,
        allowedActions: [],
      },
      {
        idRole: 3,
        name: "Juiz",
        accessLevel: 2,
        allowedActions: [],
      },
    ];

    const findAllSpy = jest.spyOn(RoleService.prototype, 'findAll').mockReturnValueOnce(mockRoles);
    
    reqMock.params = {}

    await roleController.index(reqMock, resMock);
    
    expect(findAllSpy).toBeCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(mockRoles);
    expect(resMock.status).toHaveBeenCalledWith(200);

    findAllSpy.mockRestore();
  });

  test('index - return message (204)', async () => {
    roleController.roleService.findAll = jest.fn().mockResolvedValue([]);

    await roleController.index(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledWith({ message: 'Não Existe cargo' });
    expect(resMock.status).toHaveBeenCalledWith(204);
  });

  test('index - internal server error (500)', async () => {
    const error = new Error('Internal Server Error');

    const findAllSpy = jest.spyOn(RoleService.prototype, 'findAll').mockRejectedValue(error);

    await roleController.index(reqMock, resMock);

    expect(findAllSpy).toBeCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(error);
    expect(resMock.status).toHaveBeenCalledWith(500);
    findAllSpy.mockRestore();
  });

  test('getById - return message (204)', async () => {
    const findOneByIdSpy = jest.spyOn(RoleService.prototype, 'findOneById').mockResolvedValue(false);

    reqMock.params = { id: 1 };
    await roleController.getById(reqMock, resMock);

    expect(findOneByIdSpy).toBeCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith([]);
    expect(resMock.status).toHaveBeenCalledWith(204);

    findOneByIdSpy.mockRestore();
  });

  test('getById - return message (200)', async () => {
    const role = {
      idRole: 1,
      name: 'juiz',
      accessLevel: 1,
      allowedActions: [],
    };

    reqMock.params = { id: role.idRole };

    const findOneByIdSpy = jest.spyOn(RoleService.prototype, 'findOneById').mockResolvedValue(role);

    await roleController.getById(reqMock, resMock);

    expect(findOneByIdSpy).toBeCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith(role);
    expect(resMock.status).toHaveBeenCalledWith(200);
    findOneByIdSpy.mockRestore();
  });

  test('getById - internal server error (500)', async () => {
    const error = new Error('Internal Server Error');

    reqMock.params = { id: 1 };
    const findOneByIdSpy = jest.spyOn(RoleService.prototype, 'findOneById').mockRejectedValue(error);

    await roleController.getById(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledWith(error);
    expect(resMock.status).toHaveBeenCalledWith(500);

    findOneByIdSpy.mockRestore();
  });

  test('updateRoleName - return empty role (204)', async () => {
    reqMock.body = {
      idRole: 1,
      name: 'juiz',
    };

    const findOneByIdSpy = jest.spyOn(RoleService.prototype, 'findOneById').mockResolvedValue(false);
    const updateRoleNameSpy = jest.spyOn(RoleService.prototype, 'updateRole').mockResolvedValue();

    await roleController.updateRole(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledWith([]);
    expect(resMock.status).toHaveBeenCalledWith(204);

    findOneByIdSpy.mockRestore();
    updateRoleNameSpy.mockRestore();
  });

  test('updateRoleName - return updated role (200)', async () => {
    const role = {
      idRole: 1,
      name: 'juiz',
      accessLevel: 1,
      allowedActions: [],
      set: jest.fn(),
      save: jest.fn(),
    };

    reqMock.body = {
      idRole: role.idRole,
      name: role.name,
    };

    const findOneByIdSpy = jest.spyOn(RoleService.prototype, 'findOneById').mockResolvedValue(role);
    const updateRoleNameSpy = jest.spyOn(RoleService.prototype, 'updateRole').mockResolvedValue(role);

    await roleController.updateRole(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledWith(role);
    expect(resMock.status).toHaveBeenCalledWith(200);

    findOneByIdSpy.mockRestore();
    updateRoleNameSpy.mockRestore();
  });

  test('updateRole - internal server error (500)', async () => {
    const role = {
      idRole: 1,
      name: 'juiz',
      accessLevel: 1,
      allowedActions: [],
      set: jest.fn(),
      save: jest.fn(),
    };

    const error = new Error("Internal Server Error");

    reqMock.params = { idRole: 1 };
  
    const findOneByIdSpy = jest.spyOn(RoleService.prototype, "findOneById").mockReturnValue(role);
    const updateRoleNameSpy = jest.spyOn(RoleService.prototype, "updateRole").mockRejectedValue(error);
  
    await roleController.updateRole(reqMock, resMock);
  
    expect(findOneByIdSpy).toHaveBeenCalled();
    expect(updateRoleNameSpy).toHaveBeenCalled();
  
    expect(resMock.json).toHaveBeenCalledWith(error);
    expect(resMock.status).toHaveBeenCalledWith(500);

    findOneByIdSpy.mockRestore();
    updateRoleNameSpy.mockRestore();
  });

  test('delete - return not found (404)', async () => {
    reqMock.body = { idRole: 1 };

    const findOneByIdSpy = jest.spyOn(RoleService.prototype, "findOneById").mockResolvedValue(false);

    await roleController.delete(reqMock, resMock);

    expect(findOneByIdSpy).toHaveBeenCalled();
    expect(resMock.status).toHaveBeenCalledWith(404);
    findOneByIdSpy.mockRestore();
  });

  test('delete - return destroyed role (200)', async () => {
    const role = {
      idRole: 1,
      name: 'juiz',
      accessLevel: 1,
      allowedActions: [],
      destroy: jest.fn(),
    };

    reqMock.body = { idRole: 1 };

    const findOneByIdSpy = jest.spyOn(RoleService.prototype, "findOneById").mockResolvedValue(role);
    const deleteRoleByIdSpy = jest.spyOn(RoleService.prototype, "deleteRoleById").mockResolvedValue();

    await roleController.delete(reqMock, resMock);

    expect(findOneByIdSpy).toHaveBeenCalled();
    expect(deleteRoleByIdSpy).toHaveBeenCalled();

    expect(resMock.json).toHaveBeenCalledWith(role);
    expect(resMock.status).toHaveBeenCalledWith(200);

    findOneByIdSpy.mockRestore();
    deleteRoleByIdSpy.mockRestore();
  });

  test('delete - internal server error (500)', async () => {
    const error = new Error('Internal Server Error');

    reqMock.body = { idRole: 1 };
    const findOneByIdSpy = jest.spyOn(RoleService.prototype, "findOneById").mockRejectedValue(error);

    await roleController.delete(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledWith(error);
    expect(resMock.status).toHaveBeenCalledWith(500);

    findOneByIdSpy.mockRestore();
  });

  test('store - create Role (200)', async () => {
    const role = {
      idRole: 1,
      name: 'juiz',
      accessLevel: 1,
      allowedActions: [],
    };
    reqMock.body = role;

    const createRoleSpy = jest.spyOn(RoleService.prototype, "createRole").mockResolvedValue(role);

    await roleController.store(reqMock, resMock);

    expect(createRoleSpy).toHaveBeenCalled();

    expect(resMock.json).toHaveBeenCalledWith(role);
    expect(resMock.status).toHaveBeenCalledWith(200);

    createRoleSpy.mockRestore();
  });

  test('store - internal server error (500)', async () => {
    const error = new Error('Internal Server Error');

    const createRoleSpy = jest.spyOn(RoleService.prototype, "createRole").mockRejectedValue(error);

    await roleController.store(reqMock, resMock);

    expect(createRoleSpy).toHaveBeenCalled();

    expect(resMock.json).toHaveBeenCalledWith(error);
    expect(resMock.status).toHaveBeenCalledWith(500);

    createRoleSpy.mockRestore();
  });
});
