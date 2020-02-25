module.exports = {
  presets: [
		// [
		// 	'@babel/preset-env',
		// 	{
		// 		useBuiltIns: 'entry',
		// 		corejs: '2'
		// 	}
		// ],
	],
	plugins: [
		[
			'./exports/babelPlugin.js'
		],
	]
}

