const express = require("express");
const db = require("./db");
const router = express.Router();

//register admin
router.post("/admins",(req, res) => {
  try {
    const { admin_name, admin_password } = req.body;

    console.log(req.body)

    db.query(
      "INSERT INTO admin (admin_name,admin_password) VALUES(?,?)",
      [admin_name, admin_password],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }
        console.log("Admin created successfully");
        return res.json({
          status: 201,
          success: true,
          message: result,
        });
      }
    );
  } catch (error) {
    console.log(error)
    return res.json({
      status: 500,
      success: false,
      message: "Error adding users",
    });
  }
});


router.post('/login', (req, res) => {
  try {
    const { admin_name, admin_password } = req.body;

    console.log(req.body);

    db.query('SELECT * FROM admin WHERE admin_name = ? AND admin_password = ?', [admin_name, admin_password], (error, result) => {
      if (error) {
        console.log(error);
        return res.json({
          status: 401,
          success: false,
          message: "Admin name and password did not match"
        });
      }

      if (result.length === 0) {
        
        return res.json({
          status: 401,
          success: false,
          message: "Admin name and password did not match"
        });
      }

      
      console.log("Admin authenticated successfully");
      return res.json({
        status: 200, 
        success: true,
        message: "Admin authenticated successfully",
        admin: result[0]
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      success: false,
      message: "Error authenticating user"
    });
  }
});

module.exports = router;
