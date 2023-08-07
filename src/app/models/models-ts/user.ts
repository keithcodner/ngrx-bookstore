import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const User = sequelize.define('User', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      other: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
});