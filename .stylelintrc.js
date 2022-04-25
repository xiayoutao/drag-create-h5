module.exports = {
	root: true,
	extends: [
		'stylelint-config-rational-order',
	],
	plugins: [
		'stylelint-scss',
		'stylelint-order',
	],
	ignoreFiles: [
		'**/*.md',
		'**/*.js',
		'**/*.jsx',
		'**/*.tsx',
		'**/*.ts',
	],
	customSyntax: "postcss-scss",
	overrides: [
		// 扫描.vue/html文件中的<style>标签内的样式
		{
			files: ['**/*.{vue,html}'],
			customSyntax: 'postcss-html'
		},
		{
			files: ['**/*.{scss}'],
			customSyntax: 'postcss-scss'
		},
		{
			files: ['**/*.{css}'],
			customSyntax: 'postcss-cssnext'
		}
	],
	rules: {
		"indentation": 'tab',
		'max-empty-lines': 1,
		'number-max-precision': 4, // css属性值中小数点之后数字的最大位数
		'string-quotes': 'single',
		"color-function-notation": "legacy", // 很重要
		'property-no-unknown': null,
		"scss/at-rule-no-unknown": null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['function', 'mixin', 'include', 'extend', 'each', 'if', 'else', 'forward', 'use']
			}
		],
		'declaration-colon-space-before': 'never',
		'declaration-colon-space-after': 'always-single-line',
		'order/order': [
      'dollar-variables', // 变量
      'custom-properties', // 自定义属性
      'at-rules', // 规则
      'declarations', // 声明
      'rules', // 规则
    ],
		'plugin/rational-order': [
			true,
			{
				'border-in-box-model': true,
				'empty-line-between-groups': false
			}
		],
	}
}