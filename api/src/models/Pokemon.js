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
        msg: 'name already exists',
      },
      validate: {
        notNull:{
          args: true,
          msg: 'name attribute is missing'
       },
        notEmpty: {
          args: true,
          msg: 'name must be provided'
          },
        is: /^[a-z-]{1,20}$/
      // isAlpha: {
      //   args: true,
      //   msg: 'name must contains letters only'
      // }
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
        },
        min: 1,
        max: 250,
        validator(value) {
          if(value < 1 || value > 250) {
            throw new Error ('hp must be between 1 and 250');
          }
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
        },
        min: 1,
        max: 250,
        validator(value) {
          if(value < 1 || value > 250) {
            throw new Error ('attack must be between 1 and 250');
          }
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
        },
        min: 1,
        max: 250,
        validator(value) {
          if(value < 1 || value > 250) {
            throw new Error ('defense must be between 1 and 250');
          }
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
        },
        min: 1,
        max: 250,
        validator(value) {
          if(value < 1 || value > 250) {
            throw new Error ('speed must be between 1 and 250');
          }
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
        },
        min: 1,
        max: 100,
        validator(value) {
          if(value < 1 || value > 100) {
            throw new Error ('height must be between 1 and 100');
          }
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
        },
        min: 1,
        max: 1000,
        validator(value) {
          if(value < 1 || value > 1000) {
            throw new Error ('weight must be between 1 and 1000');
          }
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

