exports.blogRouter=(req,res)=>{
    res.render('index', {
        title: 'blog',
        // 生成维系各各代码块关系的代码
        manifest: '/fe-static/mpa/runtime.js',
        // 打包后的依赖文件
        venderJs: '/fe-static/mpa/vendors.js',
        // 业务代码
        app: '/fe-static/mpa/blog/index.js'
    });
}
exports.gameRouter=(req,res)=>{
    res.render('index', {
        title: 'game',
        // 生成维系各各代码块关系的代码
        manifest: '/fe-static/mpa/runtime.js',
        // 打包后的依赖文件
        venderJs: '/fe-static/mpa/vendors.js',
        // 业务代码
        app: '/fe-static/mpa/game/index.js'
    });
}
exports.spa1Router=(req,res)=>{
    res.render('spa', {
        title: 'spa1',
        // 生成维系各各代码块关系的代码
        manifest: '/fe-static/mpa/runtime.js',
        // 打包后的依赖文件
        venderJs: '/fe-static/mpa/vendors.js',
        // 业务代码
        app: '/fe-static/mpa/game/index.js'
    });
}
exports.spa2Router=(req,res)=>{
    res.render('spa', {
        title: 'spa2',
        // 生成维系各各代码块关系的代码
        manifest: '/fe-static/spa2/runtime.js',
        // 打包后的依赖文件
        venderJs: '/fe-static/spa2/vendors.js',
        // 业务代码
        app: '/fe-static/spa2/index.js'
    });
}
