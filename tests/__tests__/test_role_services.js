import RoleService from '../../src/services/role';

const RoleModel = {
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('RoleService', () => {
  let roleService;

  beforeEach(() => {
    roleService = new RoleService(RoleModel);
  });

  describe('createRole', () => {
    it('Criar uma nova role com os parâmetros fornecidos', async () => {

      const body = { 
        idRole: 1,
        name: "Juiz",
        accessLevel: 5,
        allowedActions: [] 
      };

      RoleModel.create.mockResolvedValue(body);

      const result = await roleService.createRole(body);

      expect(result).toEqual(body);
      expect(RoleModel.create).toHaveBeenCalledWith(body);
    });
  });

  describe('updateRole', () => {
    it('Atualizar um processo com os parâmetros e registro fornecidos', async () => {
      const params = { 
        idRole: 1,
        name: "Juiz",
        accessLevel: 5,
        allowedActions: [] 
      };

      const idRole = 1;
      
      const updatedRole = { ...params, status: 'updated' };

      RoleModel.update.mockResolvedValue([1]);
      RoleModel.findOne.mockResolvedValue(updatedRole);

      const result = await roleService.updateRole(params, idRole);

      expect(result).toEqual(updatedRole);
      
      expect(RoleModel.update).toHaveBeenCalledWith(params, {
        where: { idRole },
      });

      expect(RoleModel.findOne).toHaveBeenCalledWith({ where: { idRole } });
    });

    it('Retornar false se a role nao foi atualizado', async () => {
      const params = { 
        idRole: 1,
        name: "Juiz",
        accessLevel: 5,
        allowedActions: [] 
      };

      const idRole = 1;

      RoleModel.update.mockResolvedValue([0]);

      const result = await roleService.updateRole(params, idRole);

      expect(result).toEqual(false);

      expect(RoleModel.update).toHaveBeenCalledWith(params, {
        where: { idRole },
      });

      expect(RoleModel.findOne).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleteRoleByRecord', () => {
    it('Excluir uma role com o idRole fornecido', async () => {
      const idRole = 1;
      RoleModel.destroy.mockResolvedValue(1);

      const result = await roleService.deleteRoleById(idRole);

      expect(RoleModel.destroy).toHaveBeenCalledWith({ where: { idRole } });
    });
  });

  describe('findAll', () => {
    it('Retornar uma lista de todos as roles', async () => {
      RoleModel.findAll.mockResolvedValue([
        { 
          idRole: 1,
          name: "Juiz",
          accessLevel: 5,
          allowedActions: [] 
        },
        { 
          idRole: 2,
          name: "Estagiário",
          accessLevel: 2,
          allowedActions: [] 
        },
      ]);

      const result = await roleService.findAll();

      expect(result).toEqual([
        { 
          idRole: 1,
          name: "Juiz",
          accessLevel: 5,
          allowedActions: [] 
        },
        { 
          idRole: 2,
          name: "Estagiário",
          accessLevel: 2,
          allowedActions: [] 
        },
      ]);

      expect(RoleModel.findAll).toHaveBeenCalled();
    });
  });
});
