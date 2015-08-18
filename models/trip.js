module.exports = function(sequelize, DataTypes) {
  var Trip = sequelize.define("trip", {
    route_id: {
      type: DataTypes.STRING(255),
      references: {
        model: "route",
        key: "route_id"
      }
    },
    service_id: {
      type: DataTypes.STRING(255),
      references: {
        model: "calendar",
        key: "service_id"
      }
    },
    trip_id: {
      type: DataTypes.STRING(255),
      primaryKey: true
    },
    trip_headsign: DataTypes.STRING(255),
    trip_short_name: DataTypes.STRING(100),
    direction_id: DataTypes.INTEGER,
    block_id: DataTypes.STRING(255),
    shape_id: DataTypes.STRING(255),  // association omitted.  See PostGIS trip for relation.
    wheelchair_accessible: DataTypes.INTEGER,
    bikes_allowed: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function (models) {

        Trip.belongsTo(models.route, {
          foreignKeyContraint: true, 
          foreignKey: "route_id" 
        });

        Trip.belongsTo(models.calendar, {
          foreignKeyContraint: true, 
          foreignKey: "service_id" 
        });

        Trip.hasMany(models.stop_time, {
          foreignKey: 'trip_id'
        });

        Trip.hasMany(models.frequency, {
          foreignKey: 'trip_id'
        });

      }
    }
  });

  return Trip;
}