module.exports = (sequelize, DataTypes) => {
    const Deeds = sequelize.define('Deeds', {
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      deed: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
    return Deeds;
  };