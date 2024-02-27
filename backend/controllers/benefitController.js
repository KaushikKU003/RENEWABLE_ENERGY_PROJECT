const express = require("express");
const db = require("../db");
const router = express.Router();

router.post('/benefits/:projectId',()=>{
    try {
        const project_id = req.params.projectId;
        console.log(project_id);
        const {
          co2_reduction,
          other_benefits,
        } = req.body;
    
        console.log(req.body);
    
        if (!req.body) {
          return res.json({
            status: 401,
            success: false,
            message: "No benefit details provided",
          });
        }
    
        db.query(
          "INSERT INTO benefit (project_id, co2_reduction, other_benefits) VALUES (?, ?, ?)",
          [
            project_id,
            co2_reduction,
            other_benefits,       
          ],
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
})

router.put('/benefits/:id',()=>{
    try {
        const benefitId = req.params.id;
        const {
            co2_reduction,
            other_benefits,
          } = req.body;
    
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
})

module.exports = router