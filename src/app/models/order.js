const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
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
    prod_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    trans_id: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    order_num: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    details: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
