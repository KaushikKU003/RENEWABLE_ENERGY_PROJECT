const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/finances/:projectId", (req, res) => {
  try {
    const project_id = req.params.projectId;
    console.log(project_id);
    const {
      total_cost,
      funding_source,
      revenue_generation,
      return_on_investment,
    } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No finance details provided",
      });
    }

    db.query(
      "INSERT INTO finance (project_id, total_cost, funding_source, revenue_generation,return_on_investment) VALUES (?, ?, ?, ?,?)",
      [
        project_id,
        total_cost,
        funding_source,
        revenue_generation,
        return_on_investment,
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
          message: "Finance record created successfully",
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

router.put("/finances/:id", (req, res) => {
  try {
    const financeId = req.params.id;
    const {
      total_cost,
      funding_source,
      revenue_generation,
      return_on_investment,
    } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No finace details provided to update",
      });
    }

    let updateFields = [];
    let updateValues = [];

    if (total_cost) {
      updateFields.push("total_cost = ?");
      updateValues.push(total_cost);
    }
    if (funding_source) {
      updateFields.push("funding_source = ?");
      updateValues.push(funding_source);
    }
    if (revenue_generation) {
      updateFields.push("revenue_generation = ?");
      updateValues.push(revenue_generation);
    }
    if (return_on_investment) {
      updateFields.push("return_on_investment = ?");
      updateValues.push(return_on_investment);
    }

    updateValues.push(financeId);

    const sql = `UPDATE finance SET ${updateFields.join(
      ", "
    )} WHERE finance_id = ?`;

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
        message: "finance updated successfully",
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
