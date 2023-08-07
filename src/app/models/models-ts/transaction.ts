import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const Transaction = sequelize.define('Transaction', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      trnsx_id: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      video_title: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
});