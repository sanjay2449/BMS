const BlogSetting = require("../models/blogSettingModel");
const User = require("../models/userModel");
const Post = require("../models/postModel");

const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {
        const passwordHash = bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message);

    }
}

const blogSetup = async (req, res) => {
    try {

        var blogSetting = await BlogSetting.find({});

        if (blogSetting.length > 0) {
            res.redirect('/login');
        } else {
            res.render('blogSetup')
        }

    } catch (error) {
        console.log(error);

    }
}

const blogSetupSave = async (req, res) => {
    try {

        const blog_title = req.body.blog_title;
        const blog_image = req.file.filename;
        const description = req.body.description;
        const name = req.body.name;
        const email = req.body.email;
        const password = await securePassword(req.body.password);

        const blogSetting = new BlogSetting({
            blog_title : blog_title,
            blog_logo : blog_image,
            description : description
        })

        blogSetting.save();

        const user = new User({
            name : name,
            email : email,
            password : password,
            is_admin : 1
        });

        const userData = user.save();

        if (userData) {
            res.redirect('/login');
        } else {
            res.render('blogSetup', {message : "Blog not setup properly"});
        }

    } catch (error) {
        console.log(error.message);
    }
}

const dashboard = async (req, res) => {
    try {
        res.render('admin/dashboard')
    } catch (error) {
        console.log(error.message);
    }
}


const loadPostDashboard = async (req, res) => {
    try {
        res.render('admin/postDashboard')
    } catch (error) {
        console.log(error.message); 
    }
}


const  addPostDashboard = async (req, res) => {
    try {     
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
        })

        const postData = await post.save();

        res.render('admin/postDashboard', { message: 'Post Added Successfully!'})

    } catch (error) {
        console.log(error.message); 
    }
}
module.exports = {
    blogSetup,
    blogSetupSave,
    dashboard,
    loadPostDashboard,
    addPostDashboard,
    securePassword
}