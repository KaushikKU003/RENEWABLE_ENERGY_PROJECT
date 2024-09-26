const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/benefits/:projectId", (req, res) => {
  try {
    const project_id = req.params.projectId;
    console.log(project_id);
    const { co2_reduction, other_benefits } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No benefit details provided",
      });
    }

    db.query(
      "INSERT INTO benefit (project_id, co2_reduction, other_benifits) VALUES (?, ?, ?)",
      [project_id, co2_reduction, other_benefits],
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
          message: "benefit record created successfully",
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

router.put("/benefits/:id", (req, res) => {
  try {
    const benefitId = req.params.id;
    const { co2_reduction, other_benefits } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No benefit details provided to update",
      });
    }

    let updateFields = [];
    let updateValues = [];

    if (co2_reduction) {
      updateFields.push("co2_reduction = ?");
      updateValues.push(co2_reduction);
    }
    if (other_benefits) {
      updateFields.push("other_benefits = ?");
      updateValues.push(other_benefits);
    }

    updateValues.push(benefitId);

    const sql = `UPDATE benefit SET ${updateFields.join(
      ", "
    )} WHERE benefit_id = ?`;

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
        message: "benefit updated successfully",
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

router.get("/benefits/:project_id", (req, res) => {
  try {
    const { project_id } = req.params

    if (!project_id) {
      return res.status(401).json({
        success: false,
        message: "No project_id provided",
      });
    }

    db.query(
      "SELECT project_name, co2_reduction, YEAR(start_date) AS YEAR FROM project p JOIN benefit b ON p.project_id = b.project_id ORDER BY co2_reduction DESC LIMIT 10",
      (error, result) => {
        if (error) {
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }

        db.query("SELECT b.co2_reduction, p.project_name from benefit b JOIN project p ON  p.project_id = b.project_id AND p.project_id=?",[project_id],(error,results)=>{
          if (error) {
            return res.json({
              status: 401,
              success: false,
              message: error,
            });
          }

          return res.status(201).json({
            success:true,
            message:"Data retrieved successfully",
            values:result,
            value:results[0]
          })
        })

      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
