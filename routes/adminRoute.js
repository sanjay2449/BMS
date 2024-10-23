const express = require("express");
const admin_route = express();

const session = require('express-session');
const config = require("../config/config");
admin_route.use(session({
    secret : config.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

// Body Parser setup
const bodyParser = require('body-parser');
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended : true }));

// View engine
admin_route.set('view engine', 'ejs');
admin_route.set('views', './views');

const multer = require("multer");
const path = require("path");

admin_route.use(express.static('public'));

const storage =  multer.diskStorage({
    destination : function (req, res, cb) {
        cb(null, path.join(__dirname,'../public/images'))
    },
    filename : function (req, file, cb) {
        const name = Date.now()+'-'+ file.originalname;
        cb(null,name);
    }
});

const upload = multer({storage : storage})

const adminController = require("../controllers/adminController");
const adminLoginAuth = require('../middlewares/adminLoginAuth');


admin_route.get('/blog_setup', adminController.blogSetup);
admin_route.post('/blog_setup',upload.single('blog_image'), adminController.blogSetupSave);

admin_route.get('/dashboard',adminLoginAuth.isLogin, adminController.dashboard);

admin_route.get('/create-post',adminLoginAuth.isLogin, adminController.loadPostDashboard);
admin_route.post('/create-post',adminLoginAuth.isLogin, adminController.addPostDashboard);


module.exports = admin_route;