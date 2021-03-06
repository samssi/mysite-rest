"use strict";

const express = require("express");
const router = express.Router();
const routeProtection = require("../middleware/routeProtection");

const mongoDbService = require("../service/mongoDbService");

router.all("/*", routeProtection.requireToken);

router.get("/contents/application", (req,res) => {mongoDbService.executeDbRequest(req, res, "application", mongoDbService.getFirst)});
router.get("/contents/personal", (req,res) => {mongoDbService.executeDbRequest(req, res, "personalInfo", mongoDbService.getFirst)});
router.get("/contents/experience", (req,res) => {mongoDbService.executeDbRequest(req, res, "experience", mongoDbService.getAll)});
router.get("/contents/portfolio", (req,res) => {mongoDbService.executeDbRequest(req, res, "portfolio", mongoDbService.getAll)});
router.get("/contents/about", (req,res) => {mongoDbService.executeDbRequest(req, res, "about", mongoDbService.getFirst)});


module.exports = router;