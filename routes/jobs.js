"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login
 */

// router.post("/", ensureAdmin, async function (req, res, next) {
//   try {
//     const validator = jsonschema.validate(req.body, companyNewSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const company = await Company.create(req.body);
//     return res.status(201).json({ company });
//   } catch (err) {
//     return next(err);
//   }
// });

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

// router.get("/", async function (req, res, next) {
//   const queries = req.query;
//   // arrive as strings from querystring, but we want as ints
//   if (queries.minEmployees !== undefined) queries.minEmployees = +queries.minEmployees;
//   if (queries.maxEmployees !== undefined) queries.maxEmployees = +queries.maxEmployees;

//   try {
//     const validator = jsonschema.validate(queries, companySearchSchema);
    
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const companies = await Company.findAll(queries);
//     return res.json({ companies });
//   } catch (err) {
//     return next(err);
//   }
// });


router.get("/", async function (req, res, next) {
  try {
    const jobs = await Job.findAll();
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
