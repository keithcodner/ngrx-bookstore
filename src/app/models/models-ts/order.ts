import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const Order = sequelize.define('Order', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      video_title: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      creator: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      length: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0
      },
      cost: {
        type: DataTypes.DECIMAL(20,6),
        allowNull: true
      }
});