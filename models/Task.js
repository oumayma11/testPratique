module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },


        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    });
  


    return Task;
};