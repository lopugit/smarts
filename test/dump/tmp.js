const test = 1

{
	// const test = (new Function('return test'))()
	console.log(test) // 1
	{
		const test = 2
		console.log(test) // 2
	}
	console.log(test) // 1
	// test = 2
	// {
	// 	const test = (new Function('return test'))()
	// 	console.log(test) // 2
	// 	test = 3
	// 	console.log(test) // 3
	// }
}

console.log(test) // 1