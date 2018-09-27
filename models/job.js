module.exports = function(sequelize, DataTypes) {

var Job = sequelize.define("job", {

    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },

    company: {
        type: DataTypes.STRING,
        allowNull: false
    },

    location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dateApplied: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    },

    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false
    }

},

{
    timestamps: false
});

return Job;
};