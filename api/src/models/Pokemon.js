const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Name already exists',
      },
      validate: {
        notNull:{
          args: true,
          msg: 'name attribute is missing'
       },
      notEmpty: {
        args: true,
        msg: "name must be provided"
        },
      isAlpha: {
        args: true,
        msg: 'name must contains letters only'
      }
    },
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    hp: {
      type: DataTypes.INTEGER,
    allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'hp attribute is missing'
        }
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'attack attribute is missing'
        }
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'defense attribute is missing'
        }
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'speed attribute is missing'
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'height attribute is missing'
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'weight attribute is missing'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'image attribute is missing'
        },
        notEmpty: {
          args: true,
          msg: 'url must be provided'
          },
        isUrl: {
          args: true,
          msg: 'invalid url'
        }
      }
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
