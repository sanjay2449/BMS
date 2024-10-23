const BlogSetting = require('../models/blogSettingModel');

const isBlog = async (req, res, next) => {
    try {
        
        const blogSetting = await BlogSetting.find({});

        if (blogSetting.length == 0 && req.originalUrl != "/blog_setup") {
            res.redirect('/blog_setup');
        } else {
            next();
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    isBlog
}