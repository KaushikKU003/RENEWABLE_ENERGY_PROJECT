const express = require("express");
const db = require("../db");
const router = express.Router();

router.post('/organizations/:projectId',()=>{
    try {
        const project_id = req.params.projectId;
        console.log(project_id);
        const { organization_name, organization_type, contact_info } = req.body;
    
        console.log(req.body);
    
        if (!req.body) {
          return res.json({
            status: 401,
            success: false,
            message: "No organization details provided",
          });
        }
    
        db.query(
          "INSERT INTO organization (project_id, organization_name, organization_type,contact_info) VALUES (?, ?, ?, ?)",
          [project_id, organization_name, organization_type, contact_info],
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
              message: "organization record created successfully",
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

router.put('/organizations/:id',()=>{
    try {
        const orgId = req.params.id;
        const { organization_name, organization_type, contact_info } = req.body;
    
    
        console.log(req.body);
    
        if (!req.body) {
          return res.json({
            status: 401,
            success: false,
            message: "No organization details provided to update",
          });
        }
    
        let updateFields = [];
        let updateValues = [];
    
        if (organization_name) {
          updateFields.push("organization_name = ?");
          updateValues.push(organization_name);
        }
        if (organization_type) {
          updateFields.push("organization_type = ?");
          updateValues.push(organization_type);
        }
        if (contact_info) {
            updateFields.push("contact_info = ?");
            updateValues.push(contact_info);
          }
       
    
        updateValues.push(orgId);
    
        const sql = `UPDATE organization SET ${updateFields.join(
          ", "
        )} WHERE organization_id = ?`;
    
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
            message: "organization updated successfully",
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