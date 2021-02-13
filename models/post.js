module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
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
    return Posts;
};