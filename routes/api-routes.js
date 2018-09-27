// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models/index.js");
// =============================================================

module.exports = function(app) {

    // Get all job listings
    app.get("/api/all-jobs", function(req, res){

      // Finding all users, and then returning them to the user as JSON.
      // Sequelize queries are asynchronous, which helps with perceived speed.
      // If we want something to be guaranteed to happen after the query, we'll use
      // the .then function

      db.job.findAll({}).then(function(results){
        // results are available to us inside the .then
        res.json(results);
      })
    });

    // Add a new job listing
    app.post("/api/new-job", function(req, res){

        var normalizedDate = new Date(Date.now()).toISOString();


        db.job.create({
            jobTitle: req.body.jobTitle,
            company: req.body.company,
            location: req.body.location,
            dateApplied: normalizedDate,
            status: req.body.status,
            contactInfo: req.body.contactInfo,
            url: req.body.url
        }).then(function(results){
            console.log("Success!")
            res.end();
        }).catch(function(error){
            res.json(error)
        })
    });

    // Get a single job listing
    app.get("/api/jobs/:id", function(req, res) {
        db.job.findOne({
          where: {
            id: req.params.id
          }
        }).then(function(data) {
          
          res.json(data);
        })
      });

      app.put("/api/job/:id", function(req, res) {
        db.job.update(
          req.body,
          {
            where: {
              id: req.params.id
            }
          }).then(function(data) {
          res.json(data);
        });
      });

};