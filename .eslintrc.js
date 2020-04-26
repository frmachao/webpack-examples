module.exports = {
    parser: '@typescript-eslint/parser', //定义ESLint的解析器
    extends: [
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended' //使用推荐的React代码检测规范
    ],
    plugins: ['@typescript-eslint', "prettier"],//定义了该eslint文件所依赖的插件
    //指定代码的运行环境
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {        //指定ESLint可以解析JSX语法
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures": {
            jsx: true
        }
    },
    rules: {
        // disable the rule for all files
        "@typescript-eslint/explicit-function-return-type": "off",
        // 允许 any 类型
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "max-len": [
            "warn",
            {
                "code": 100,
                "ignoreStrings": true,
                "ignoreTemplateLiterals": true,
                "ignoreComments": true
            }
        ],
    },
}
