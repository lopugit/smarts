module.exports = {
  presets: [
		[
			'@babel/preset-env',
			{
				"targets": "> 5%, not dead",
				useBuiltIns: 'entry',
				corejs: '3',
				modules: false
			}
		],
	],
	plugins: [
		// [
		// 	'./exports/babelPlugin.js'
		// ],
	]
}

