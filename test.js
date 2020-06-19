


function parsePropertyPath(path=""){

	let array = [""]

	let readingArrayBasedPath = false
	let i = 0
	let push = false
	while (i < path.length){

		if(readingArrayBasedPath){

			// we found the end of an array delimited path
			if(path[i] == "\"" && path[i+1] == "]") {
				i += 1
				readingArrayBasedPath = false
				push = true
			} else {
				array[array.length-1] += path[i]
			}
		} else if(path[i] == '.'){
			push = true
		} 
		// we found the start of an array delimited path
		else if(path[i] == '[' && path[i+1] == "\"") {
			readingArrayBasedPath = true
			push = true
			i += 1
		} else {
			array[array.length-1] += path[i]
		}

		i++
		if(push && i < path.length){
			array.push("")
			push = false
		}
	}

	return array

}

function escapePropertyPath(path=""){
			return "[\""+path+"\"]"
}

function epp(path=""){
	return escapePropertyPath(path)
}

let a = epp(".big-daddy")

let b = parsePropertyPath("test.m[ee]e"+a+"hmm[.ok[\e]"+a)

let c = 1