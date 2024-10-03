const Role = require('../models/Role'); 

const seedRoles = async () => {
  try {
    const roles = [
      { roleName: 'admin' },
      { roleName: 'servidor' },
      { roleName: 'professor' }
    ];

    for (const role of roles) {
      const [createdRole, created] = await Role.findOrCreate({ where: { roleName: role.roleName } });

      if (created) {
        console.log(`Papel ${createdRole.roleName} criado com sucesso!`);
      } else {
        console.log(`Papel ${createdRole.roleName} já existe.`);
      }
    }
  } catch (error) {
    console.error('Erro ao criar os papéis:', error.message, error.stack);
  }
};

module.exports = seedRoles;
