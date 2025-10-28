import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db.js';

class Collectable extends Model {}

Collectable.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    category: { type: DataTypes.STRING }
  },
  { sequelize, modelName: 'Collectable', tableName: 'collectables', timestamps: true }
);

export { Collectable };
export default Collectable;







