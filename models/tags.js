module.exports = (sequelize, DataTypes) => {
    const tags = sequelize.define("tags", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },

        tag: {
            type: DataTypes.STRING,
            allowNull: false
        }


       

    });

    tags.associate = models => {
        tags.belongsTo(models.Task, {
            foreignkey: {
                allowNull: false
            }
        });
    };



    return tags;
};