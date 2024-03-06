const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/risks/:projectId", (req,res) => {
  try {
    const project_id = req.params.projectId;
    console.log(project_id);
    const { impact, Likelihood, risk_description } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No risk details provided",
      });
    }

    db.query(
      "INSERT INTO risk (project_id, impact, Likelihood,risk_description) VALUES (?, ?, ?, ?)",
      [project_id, impact, Likelihood, risk_description],
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
          message: "risk record created successfully",
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

router.put("/risks/:id", (req,res) => {
    try {
        const benefitId = req.params.id;
        const { impact, Likelihood, risk_description } = req.body;
    
        console.log(req.body);
    
        if (!req.body) {
          return res.json({
            status: 401,
            success: false,
            message: "No risk details provided to update",
          });
        }
    
        let updateFields = [];
        let updateValues = [];
    
        if (impact) {
          updateFields.push("impact = ?");
          updateValues.push(impact);
        }
        if (Likelihood) {
          updateFields.push("Likelihood = ?");
          updateValues.push(Likelihood);
        }
        if (risk_description) {
            updateFields.push("risk_description = ?");
            updateValues.push(risk_description);
          }
       
    
        updateValues.push(benefitId);
    
        const sql = `UPDATE risk SET ${updateFields.join(
          ", "
        )} WHERE risk_id = ?`;
    
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
            message: "risk updated successfully",
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
