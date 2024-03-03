const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/projects", (req, res) => {
  try {
    const { project_name, type, capacity, status, start_date, end_date } =
      req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No project details provided",
      });
    }

    db.query(
      "INSERT INTO project(project_name,type,capacity,status,start_date,end_date) VALUES(?,?,?,?,?,?)",
      [project_name, type, capacity, status, start_date, end_date],
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
          message: "Project created successfully",
          project: result[0],
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

router.put("/projects/:id", (req, res) => {
  try {
    const projectId = req.params.id;
    const { project_name, type, capacity, status, start_date, end_date } =
      req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No project details provided to update",
      });
    }

    let updateFields = [];
    let updateValues = [];

    if (project_name) {
      updateFields.push("project_name = ?");
      updateValues.push(project_name);
    }
    if (type) {
      updateFields.push("type = ?");
      updateValues.push(type);
    }
    if (capacity) {
      updateFields.push("capacity = ?");
      updateValues.push(capacity);
    }
    if (status) {
      updateFields.push("status = ?");
      updateValues.push(status);
    }
    if (start_date) {
      updateFields.push("start_date = ?");
      updateValues.push(start_date);
    }
    if (end_date) {
      updateFields.push("end_date = ?");
      updateValues.push(end_date);
    }

    updateValues.push(projectId);

    const sql = `UPDATE project SET ${updateFields.join(
      ", "
    )} WHERE project_id = ?`;

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
        message: "Project updated successfully",
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

router.get("/projects/year", (req, res) => {
  try {
    db.query(
      "SELECT YEAR(start_date) as year, count(*) as project_count from project group by YEAR(start_date)",
      (error, results) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "An error occurred while fetching project count by year",
            error: error.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Project count by year fetched successfully",
          data: results,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
});


router.get("/project-count", (req, res) => {
  try {
    db.query(
      "SELECT type, COUNT(*) AS count FROM project GROUP BY type",
      (error, results) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "An error occurred while fetching project count by type",
            error: error.message,
          });
        }

        return res.status(200).json({
          success: true,
          message: "Project count by type fetched successfully",
          data: results,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error.message,
    });
  }
});

router.get("/projects", (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const searchBy = req.query.searchBy;

    if (!searchTerm || !searchBy) {
      return res.status(400).json({
        success: false,
        message: "Search term and search by criteria are required",
      });
    }

    let sql = "";
    let params = [];

    if (searchBy === "project_name") {
      sql = "SELECT * FROM project WHERE project_name LIKE ?";
    } else if (searchBy === "type") {
      sql = "SELECT * FROM project WHERE type LIKE ?";
    } else if (searchBy === "start_date") {
      sql = "SELECT * FROM project WHERE YEAR(start_date) = ?";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid search by criteria",
      });
    }

    if(searchBy==="start_date"){
    params.push(searchTerm);
    }
    else{
      params.push(`%${searchTerm}%`);
    }

    db.query(sql, params, (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Error fetching projects",
          error: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Projects fetched successfully",
        data: results,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
