module.exports = {
  presets: [
		[
			'@babel/preset-env',
			{
				"targets": "> 5%, not dead",
				useBuiltIns: 'entry',
				corejs: '3'
			}
		],
	],
	plugins: [
		[
			'./exports/babelPlugin.js'
		],
	]
}

