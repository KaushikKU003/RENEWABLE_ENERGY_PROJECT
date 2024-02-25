const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/locations/:projectId", (req, res) => {
  try {
    const project_id = req.params.projectId;
    console.log(project_id);
    const { location_name, country, latitude, longitude } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No location details provided",
      });
    }

    db.query(
      "INSERT INTO location (project_id, location_name, country, latitude,longitude) VALUES (?, ?, ?, ?,?)",
      [project_id, location_name, country, latitude, longitude],
      (error, result) => {
        if (error) {
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }
        return res.json({
          status: 201,
          success: true,
          message: "location record created successfully",
          finance: result[0],
        });
      }
    );
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error,
    });
  }
});

router.put("/locations/:id", (req, res) => {
  try {
    const locationId = req.params.id;
    console.log(locationId);
    const { location_name, country, latitude, longitude } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No location details provided to update",
      });
    }

    let updateFields = [];
    let updateValues = [];

    if (location_name) {
      updateFields.push("location_name = ?");
      updateValues.push(location_name);
    }
    if (country) {
      updateFields.push("country = ?");
      updateValues.push(country);
    }
    if (latitude) {
      updateFields.push("latitude = ?");
      updateValues.push(latitude);
    }
    if (longitude) {
      updateFields.push("longitude = ?");
      updateValues.push(longitude);
    }

    updateValues.push(locationId);

    const sql = `UPDATE location SET ${updateFields.join(
      ", "
    )} WHERE location_id = ?`;

    db.query(sql, updateValues, (error, result) => {
      if (error) {
        return res.json({
          status: 401,
          success: false,
          message: error,
        });
      }
      return res.json({
        status: 200,
        success: true,
        message: "location updated successfully",
        project: result[0],
      });
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error,
    });
  }
});

module.exports = router;
