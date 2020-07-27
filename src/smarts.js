let babel = require('@babel/core')
babel.generator = require('@babel/generator').default
let uuid = require('uuid/v4')
let defaultIsMergeableObject = require('is-mergeable-object')

module.exports = ({
	objList,
	stringList,
	reactiveSetter,
	vue
} = {}) => {
	var local = {
		objList,
		stringList,
		reactiveSetter,
		vue
	}
	
	var smarts = {
		getBabel(){ return babel },
		uuid,
		pause(value, opts){
			return smarts.stringify(value, opts)
		},
		save(value, opts){
			return smarts.stringify(value, opts)
		},
		stringify(value, opts={}) {
			let schema = {
				stringifier: smarts.stringifier,
				// replace: eval('(function '+smarts.replace.toString().replace()+')'),
				replace(key, value){
					if (opts.firstRun) {
						opts.firstRun = !opts.firstRun
						return value
					}
					var after = opts.stringifier(key, value, opts)
					switch (typeof after.value) {
						case 'object':
							if (after === null || after.value === null) {
								let ret = after.value
								return ret
							} 
						// excluding the break; line makes object cases continue to the string case
						case 'string':
							let ret = opts.known.get(after.key) || smarts.setKnown(opts.known, opts.input, after)
							return ret
					}
					return after.value
				}, 
				strictFunctions: true,
				firstRun: undefined,
				known: new Map,
				input: [],
				output: [],
			}

			Object.keys(schema).forEach(key=>{
				if(smarts.getsmart(opts, smarts.epp(key), {undefined:true}, true).undefined == true){
					opts[key] = schema[key]
				}
			})

			opts.virtual = opts.stringifier('', value, opts)
			for(
				i = parseInt(smarts.setKnown(opts.known, opts.input, opts.virtual));
				i < opts.input.length; 
				i++
			) {
				opts.firstRun = true
				try {
					opts.output[i] = JSON.stringify(opts.input[i], opts.replace, opts.space)
					debug = 1
				} catch(err){ console.error(err) }
			}
			return '[' + opts.output.join(',') + ']'
		},
		replace(key, value){
			if (opts.firstRun) {
				opts.firstRun = !opts.firstRun
				return value
			}
			var after = opts.stringifier(key, value, opts)
			switch (typeof after.value) {
				case 'object':
					if (after === null) {
						let ret = after.value
						return ret
					} 
				case 'string':
					let ret = opts.known.get(after.key) || smarts.setKnown(opts.known, opts.input, after)
					return ret
			}
			return after.value
		},
		setKnown(known, input, virtual) {
			var index = String(input.push(virtual.value) - 1)
			known.set(virtual.key, index)
			return index
		},
		stringifier(key, val, opts){
			let ret = {value: val, key: val}
			if (
				val instanceof Function 
				&& typeof val.toString === 'function'
				&& (!opts.strictFunctions || typeof val.$scopes != 'undefined')
			){
				let known = opts.known.get(ret.key)
				ret = {
					value: known || {
						type: 'function',
						$js: val.toString(),
						$scopes: val.$scopes,
						$context: val.$context,
					},
					key: val
				}
				if(ret.value.$js == "function () { [native code] }") return
				if(typeof known == "undefined") smarts.setKnown(opts.known, opts.input, ret)
			} else if(
				ret.value === Infinity
				&& typeof ret.value != 'string'
			){
				let known = opts.known.get(ret.key)
				ret = {
					value: known || {
						type: 'number',
						$js: "Infinity",
						$scopes: [],
						$context: {}
					},
					key: val
				}
				if(typeof known == "undefined") smarts.setKnown(opts.known, opts.input, ret)
			} else if (
				typeof ret.value === 'undefined'
			) {
				ret = {
					value: {
						type: 'undefined',
						$js: 'undefined'
					},
					key: val
				}
			}
			return ret
		},
		primitives(value) {
			return value instanceof String ? String(value) : value
		},
		Primitives(key, value) {
			return typeof value === "string" ? new String(value) : value
		},
		play(text, opts){
			return smarts.parse(text, opts)
		},
		load(text, opts){
			return smarts.parse(text, opts)
		},
		parse(text, opts={}) {
			let schema = {
				// parser: eval('(function '+smarts.parser+')'),
				parser: smarts.parser(opts),
				value: {},
				strictFunctions: true,
				firstPass: true,
				output: new Map
			}

			Object.keys(schema).forEach(key=>{
				if(smarts.getsmart(opts, smarts.epp(key), {undefined:true}, true).undefined == true){
					opts[key] = schema[key]
				}
			})
			
			let altOpts = opts
			// opts.parser = opts.parser.bind(opts)
			opts.input = JSON.parse(text, smarts.Primitives)
			opts.firstPass = false
			opts.input = opts.input.map(smarts.primitives)
			opts.value = opts.input[0]
			let isObject = typeof opts.value === 'object' && opts.value
			var tmp = isObject 
				? smarts.revive(opts.input, opts.output, opts.value, opts.parser, opts) 
				: opts.value

			opts.replaceMode = true
			let ret = smarts.revive(opts.input, new Map, tmp, opts.parser, opts)
			ret = opts.parser('', tmp, opts)
			return ret
		},
		parser(opts){
			return function(key, val){
				if (
					val.$js
					&& opts.replaceMode
				) {
					let ret = opts.input[opts.output.get(val)]
					if(typeof ret == val.type) return ret
					let uuid = smarts.jsUUID()
					var fn
					var scopedEval
					if(val.$scopedEval && typeof val.$scopedEval == 'function'){
						scopedEval = val.$scopedEval
					} else {
						var fns = smarts.createScopedEval(uuid)

						fn = eval(`(${fns})`)
						var input = {val, smarts}
						try{
							scopedEval = fn(input)
						} catch(err){
							console.log(err)
						}

					}

					ret = scopedEval({val})
					try {
						Object.defineProperty(ret, '$scopes', {
							value: val.$scopes,
							enumerable: true
						})
					} catch(err){
						if(opts.verbose) console.error(err)
					}
					try {
						Object.defineProperty(ret, '$context', {
							value: val.$context,
							enumerable: true
						})
					} catch(err){
						if(opts.verbose) console.error(err)
					}
					try {
						Object.defineProperty(ret, '$scopedEval', {
							value: scopedEval,
							enumerable: true
						})
					} catch(err){
						if(opts.verbose) console.error(err)
					}
					opts.input[opts.output.get(val)] = ret
					return ret
				} else if(opts.replaceMode){
					return val
				}
				return smarts.Primitives(key, val)
			}
		},			
		revive(input, parsed, output, parser, opts) {
			return Object.keys(output).reduce(
				(output, key)=>{
					var value = output[key]
					// if the value hasn't been revived yet
					if (value instanceof String) {
						var tmp = input[value]
						if (typeof tmp === 'object' && !parsed.get(tmp)) {
							parsed.set(tmp, value)
							output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, tmp, parser, opts)))
						} else {
							try {
								output[key] = smarts.primitives(parser(key, tmp))
							} catch(err){
								delete output[key]
							}
						}
					} else {
						try {
							if(opts.replaceMode){
								// output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, value, parser, opts)))
								value = parser(key, value)
								if (
									typeof value === 'object' 
									&& !parsed.get(value)
								) {
									parsed.set(value, value)
									output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, value, parser, opts)))
								} else {
									try {
										output[key] = smarts.primitives(value)
									} catch(err){
										delete output[key]
									}
								}
							} else {
								output[key] = smarts.primitives(parser(key, value))
							}
						} catch(err){
							delete output[key]
						}
					}
					return output
				},
				output
			)
		},
		createScopedEval(uuid){
			let ret =  /*javascript*/`
				function createScopedEval(${uuid}){
					
					// scopeCode
					${uuid}.scopeCode = ${uuid}.scopeCode || ${uuid}.smarts.getBabel().template.ast('try{}catch(err){console.log(err)}')
					${uuid}.previousScopeCode = ${uuid}.currentScopeCode || ${uuid}.scopeCode
					${uuid}.currentScopeCode = ${uuid}.scopeCode.block.body.length ? ${uuid}.smarts.getBabel().template.ast('try{}catch(err){console.log(err)}') : ${uuid}.scopeCode
					if(${uuid}.previousScopeCode != ${uuid}.currentScopeCode){
						${uuid}.previousScopeCode.block.body.push(
							${uuid}.currentScopeCode
						)
					}
					${uuid}.closureIndex = ${uuid}.closureIndex || 0
					${uuid}.closure = ${uuid}.smarts.getsmart.bind(this)(${uuid}, ${/*javascript*/`\`val.$scopes.\${${uuid}.closureIndex}\``}, {})
					${uuid}.variableKeys = Object.keys(${uuid}.closure)
					${uuid}.variableMap = ${uuid}.smarts.getsmart.bind(this)(${uuid}, ${/*javascript*/`\`val.$context.$variableMaps.\${${uuid}.closureIndex}\``}, [])
					${uuid}.allowedIdentifiers = ['let','var','const']
					${uuid}.variableKeys.forEach((key)=>{
						if(
							typeof ${uuid}.variableMap[key] == 'string' 
							&& ${uuid}.allowedIdentifiers.indexOf(${uuid}.variableMap[key]) >= 0
						){
							try{
								${uuid}.currentScopeCode.block.body.push(
									${uuid}.smarts.getBabel().template.ast(
										${/*javascript*/`\`
											\${${uuid}.variableMap[key]} \${key} = ${uuid}.val.$scopes[\${${uuid}.closureIndex}]['\${key}']
										\``}
									)
								)
							}catch(err){console.log(1,err)}
							try{
								${uuid}.currentScopeCode.block.body.push(
									${uuid}.smarts.getBabel().template.ast(
										${/*javascript*/`\`
											Object.defineProperty(
												${uuid}.val.$scopes[\${${uuid}.closureIndex}],
												\${smarts.stringify(key)},
												{
													get(){
														return \${key}
													},
													set(val){
														\${key} = val
													},
													enumerable: true
												}
											)
										\``}
									)
								)
							}catch(err){console.log(2,err)}
						}
						// console.log(${uuid}.scopeCode)
					})
					// console.log(${uuid}.scopeCode)
					${uuid}.closureIndex++
					if(${uuid}.closureIndex >= ${uuid}.smarts.getsmart.bind(this)(${uuid}, 'val.$scopes.length', -1)){
						// console.log(${uuid}.scopeCode)
						try{
							${uuid}.currentScopeCode.block.body.push(
								${uuid}.smarts.getBabel().template.ast(
									${/*javascript*/`\`
										return \${${uuid}.smarts.scopedEval('${uuid}')}
									\``}
								)
							)
						}catch(err){console.log(3,err)}
						try{
							${uuid}.wrapper = ${uuid}.smarts.getBabel().template.ast(
								${/*javascript*/`\`
									function anonymous(){}							
								\``}
							)
						}catch(err){console.log(4,err)}
						// console.log(${uuid}.wrapper)
						// console.log(${uuid}.scopeCode)
						${uuid}.wrapper.body.body.push(${uuid}.scopeCode)
						${uuid}.scopeCode = ${uuid}.wrapper
						${uuid}.scopeCode = ${uuid}.smarts.getBabel().generator(
							${uuid}.scopeCode
						).code
						// console.log(${uuid}.scopeCode)
						${uuid}.scopeCode = eval("("+${uuid}.scopeCode+")")
						// console.log(${uuid}.scopeCode.toString())
						try {
							${uuid}.val.$scopedEval = ${uuid}.scopeCode()
						}catch(err){console.log(5,err)}
						// console.log(${uuid}.val.$scopedEval)
						// return ${uuid}.scopeCode.toString()
						return ${uuid}.val.$scopedEval
					} else {
						return eval(${/*javascript*/`\`(\${${uuid}.smarts.createScopedEval('${uuid}')})\``})(${uuid})
					}
				}
			`
			return ret
		},
		defineVariable(uuid){
			return /*javascript*/`
				${uuid.variableType}	${uuid.variableKey} = ${uuid}.$scope[${uuid}.variableKey]
				Object.defineProperty(
					${uuid}.$scope, 
					${uuid}.variableKey, 
					{
						get(){
							return ${uuid.variableKey}
						},
						set(val){
							${uuid.variableKey} = val
						},
						enumerable: true
					}
				)
			`
		},
		scopedEval(uuid){
			let ret = /*javascript*/`function scopedEval(${uuid}){
					if(typeof ${uuid} == 'string'){
						${uuid} = {
							val: {
								$js: ${uuid}
							}
						}
					} else if(typeof ${uuid} == 'function' && typeof ${uuid}.toString == 'function'){
						${uuid} = {
							val: {
								$js: ${uuid}.toString()
							}
						}
					}
					try {
						${uuid}.ret = eval('('+${uuid}.val.$js+')')
					} catch(err1){
						try {
							${uuid}.ret = eval('({'+${uuid}.val.$js+'})')
							${uuid}.keys = Object.keys(${uuid}.ret)
							${uuid}.ret = ${uuid}.ret[${uuid}.keys[0]]
						} catch(err2){
							try {
								${uuid}.ret = eval('({b:'+ ${uuid}.val.$js +'})').b
							} catch(err3){
								console.error(err1)
								console.error(err2)
								console.error(err3)
							}
						}
					}
					return ${uuid}.ret
				}
			`
			return ret
		},
		jsUUID(prefix='uuid'){
			return prefix+smarts.uuid().replace(/-/g,'')
		},
		context(opts){
			let uuid = smarts.gosmart.bind(this)(opts, 'path.context.scope.uuid', smarts.jsUUID())
			return eval(/*javascript*/`
				(
					function(){
						${smarts.contextObject(uuid)}
						return ${uuid}
					}
				)()
			`)
		},
		contextObject(uuid){
			return /*javascript*/`
				let ${uuid} = {
					$$uuid: '${uuid}',
					$closure: {},
					$variableMap: {},
					$functionScoper: (func)=>{
						Object.defineProperty(
							func,
							'$scopes', 
							{
								value: (function(arr){
									for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { 
										arr2[i] = arr[i]; 
									} 
									return arr2
								})((typeof ${uuid} != 'undefined') ? ${uuid}.$scopes : []),
								enumerable: true
							}
						)
						Object.defineProperty(
							func,
							'$context',
							{
								value: ${uuid}
							}
						)
						return func
					},
					$add: (type, name, value)=>{
						${uuid}.$closure[name] = value
						${uuid}.$variableMap[name] = type
					},
					$scopes: (function(arr){
						for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { 
							arr2[i] = arr[i]; 
						} 
						return arr2
					})((typeof $context == 'object') ? $context.$scopes : []),
					$variableMaps: (function(arr){
						for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { 
							arr2[i] = arr[i]; 
						} 
						return arr2
					})((typeof $context == 'object') ? $context.$variableMaps : []),
					$contexts: {},
					$contextsList: [],
					$parentContexts: [],
					$contextStatus: "var",
					$mode: (eval("var ${uuid}1 = null"), (typeof ${uuid+"1"} === "undefined")) ? "strict" : "non-strict",
				}
				${uuid}.$functionScoper = ${uuid}.$functionScoper(${uuid}.$functionScoper)
				${uuid}.$scopes.splice(0,0,${uuid}.$closure)
				${uuid}.$variableMaps.splice(0,0,${uuid}.$variableMap)
				var globalThis = globalThis || global || window || {}
				${uuid}.$contextStatus = ${uuid}.$mode == 'strict' ? '' : 'var'
				try { 
					eval(${/*javascript*/`\`\${${uuid}.$contextStatus} $context = $context || ${uuid}\``})
				} catch(err){
					${uuid}.$contextStatus = ''
				}
				eval(${/*javascript*/`\`\${${uuid}.$contextStatus} $context = $context || ${uuid}\``})
				if(typeof $context == 'object' && $context != ${uuid} && $context.$contexts instanceof Object){
					$context.$contexts[${uuid}.$$uuid] = $context.$contexts[${uuid}.$$uuid] || []
					${uuid}.$$instance = $context.$contexts[${uuid}.$$uuid].push(${uuid})-1
					${uuid}.$parentContexts.push($context)
					$context.$contextsList.push(${uuid})
				}
				if(!globalThis.$contexts){
					globalThis.$contexts = {}
					globalThis.$contexts[${uuid}.$$uuid] = [${uuid}]
					globalThis.$contextsList = [${uuid}]
					${uuid}.$$instance = 0
				} else if(
					globalThis.${uuid}s instanceof Object 
					&& ${uuid}.$parentContexts.length == 0
					&& typeof ${uuid}.$$instance == 'undefined'
				){
					globalThis.${uuid}s[${uuid}.$$uuid] = globalThis.$contexts[${uuid}.$$uuid] || []
					${uuid}.$$instance = globalThis.$contexts[${uuid}.$$uuid].push(${uuid})-1
					globalThis.$contextsList.push(${uuid})
				}
				{
					let $context = ${uuid}
				}
			`
		},
		createContext(opts){
			smarts.schema(opts, {
				wrapBody: true
			})
			let node = opts.aster(/*javascript*/`
				${smarts.contextObject(opts.uuid)}
			`)
			node[0].declarations[0].contextDeclaration = true
			// so the $functionScoper function doesn't get wrapped or have $context inserted
			let property3 = node[0].declarations[0].init.properties[3]
			property3.value.scoperWrapped = true
			property3.value.body.scopeInitialized = true
			let property3ScopesValue = property3.value.body.body[0].expression.arguments[2].properties[0].value
			property3ScopesValue.callee.scoperWrapped = true
			property3ScopesValue.callee.body.scopeInitialized = true
			let property3ForStatement = property3ScopesValue.callee.body.body[0]
			property3ForStatement.body.scopeInitialized = true
			property3ForStatement.init.declarations[0].inScope = true
			property3ForStatement.init.declarations[1].inScope = true
			// so the $add function doesn't get wrapped or have $context inserted
			let property4 = node[0].declarations[0].init.properties[4]
			property4.value.scoperWrapped = true
			property4.value.body.scopeInitialized = true
			// so the $scopes self-invoking function doesn't get wrapped or have $context inserted
			let property5 = node[0].declarations[0].init.properties[5]
			property5.value.callee.scoperWrapped = true
			property5.value.callee.body.scopeInitialized = true
			let property5ForStatement = property5.value.callee.body.body[0]
			property5ForStatement.body.scopeInitialized = true
			property5ForStatement.init.declarations[0].inScope = true
			property5ForStatement.init.declarations[1].inScope = true
			// so the $variableMaps self-invoking function doesn't get wrapped or have $context inserted
			let property6 = node[0].declarations[0].init.properties[6]
			property6.value.callee.scoperWrapped = true
			property6.value.callee.body.scopeInitialized = true
			let property6ForStatement = property6.value.callee.body.body[0]
			property6ForStatement.body.scopeInitialized = true
			property6ForStatement.init.declarations[0].inScope = true
			property6ForStatement.init.declarations[1].inScope = true
			node6 = node[6]
			// make sure try statement block doesn't get scoped either
			node6.block.scopeInitialized = true
			// make sure catch statement block doesn't get scoped either
			node6.handler.body.scopeInitialized = true
			node8 = node[8]
			// make sure if statement block doesn't get scoped either
			node8.consequent.scopeInitialized = true
			node9 = node[9]
			// make sure if statement block doesn't get scoped either
			node9.consequent.scopeInitialized = true
			// make sure else if statement block doesn't get scoped either
			node9.alternate.consequent.scopeInitialized = true
			node10 = node[10]
			node10.scopeInitialized = true
			node10.inheritScope = true
			node[node.length-1].lastContextNode = true
			if(opts.wrapBody){
				let bodyWrapper = node[node.length-1]
				bodyWrapper.body.push(...opts.path.node.body)
			}
			smarts.addBindingsToContext({...opts, node})
			// let addContextToScopeNode = smarts.scopeVar({
			// 	uuid,
			// 	key: '$context',
			// 	type: 'let',
			// 	aster
			// })
			// wrapper.body.splice(1,0,addContextToScopeNode)	
			return node
		},
		createInlineContext(opts){
			let wrapperString = /*javascript*/`
				for(let ${opts.uuid} = function(){
					// node goes here
					return ${opts.uuid}
				}() ; a<1;a++){}
			`
			let inlineContextNode = opts.aster(wrapperString).init.declarations[0]
			let contextBody = smarts.createContext({...opts, wrapBody: false})
			inlineContextNode.init.callee.body.body.splice(0,0,...contextBody)
			inlineContextNode.contextDeclaration = true
			return inlineContextNode
		},
		addBindingsToContext(opts){
			for(let key in opts.path.scope.bindings){
				let binding = opts.path.scope.bindings[key]
				if(binding.kind == 'var'){
					let newNode = smarts.scopeVar({
						...opts,
						key,
						type: binding.kind
					})
					opts.node.splice(opts.node.length-1, 0, newNode)
				}
			}
		},
		scopeVarCode(opts){
			let ret = /*javascript*/`
				Object.defineProperty(
					${opts.uuid}.$closure,
					${smarts.stringify(opts.key)},
					{
						get(){
							return ${opts.key}
						},
						set(val){
							${opts.key} = val
						},
						enumerable: true
					}
				) &&
				(${opts.uuid}.$variableMap["${opts.key}"] = "${opts.type}")
			`
			return ret
		},
		scopeVarInlineCode(opts){
			let ret = /*javascript*/`
				let ${smarts.jsUUID()} = (
					${smarts.scopeVarCode(opts)}
				)
			`
			return ret
		},
		scopeVar (opts={}){
			let string
			let thirdArg
			let node
			if(opts.inline){
				string = smarts.scopeVarInlineCode(opts)
				node = opts.aster(string)
				thirdArg = node.declarations[0].init.left.arguments[2]
				node.declarations[0].inScope = true
			} else {
				string = smarts.scopeVarCode(opts)
				node = opts.aster(string)
				thirdArg = node.expression.left.arguments[2]
			}

			let getter = thirdArg.properties[0]
			let setter = thirdArg.properties[1]
			getter.body.scopeInitialized = true
			setter.body.scopeInitialized = true
			getter.body.scoperWrapped = true
			setter.body.scoperWrapped = true
			getter.scoperWrapped = true
			setter.scoperWrapped = true
			if(opts.inline) return node.declarations[0]
			return node
		},
		functionWrapper(uuid, path, aster){
			let wrapper = aster(/*javascript*/`
				${uuid}.$functionScoper()
			`)
			wrapper.expression.arguments.push(path.node)
			return wrapper
		},
		bodyInsert(index, body, aster, ...things){
			body.splice(
				index,
				0,
				...things
			)
			return things.length
		},
		initBlock(path, aster){
			if(!path.node.scopeInitialized){
				path.node.scopeInitialized = true
				let uuid = smarts.getPathUUID({path})
				let contextNode = smarts.createContext({uuid, aster, path})
				path.node.body = contextNode
			}
		},
		getNodeUUID(opts){
			if(opts.node && opts.node.type != 'BlockStatement' && opts.node.type != 'Program') return smarts.getNodeUUID({...opts, node: opts.node.body || opts.node.block})
			return smarts.gosmart.bind(this)(opts.node, 'uuid', smarts.jsUUID())
		},
		getPathUUID(opts){
			if(opts.path.context.scope.path.node.inheritScope || opts.path.scope.path.node.inheritScope) return smarts.getPathUUID({...opts, path: opts.path.parentPath})
			return smarts.getNodeUUID({...opts, node: opts.path.context.scope.path.node})
		},
		babelPlugin(babel){
			const t = babel.types
			const aster = babel.template.ast

			let metaVisitor = {
				Program(path){
					smarts.initBlock(path,aster)
				},
				BlockStatement(path){
					smarts.initBlock(path,aster)
				},
				ForInStatement(path){
					path = path
				},
				ObjectMethod(path){
					let name = path.node.key.name
					let replacement = aster(/*javascript*/`
						let a = {
							${name}: function ${name}(){}
						}
					`)
					replacement = replacement.declarations[0].init.properties[0]
					replacement.value.body = path.node.body
					replacement.value.params = path.node.params
					path.replaceWith(
						replacement
					)
				},
				Function(path){
					if(
						path.type != 'FunctionDeclaration' 
						&& !path.node.scoperWrapped 
						&& !path.node.body.scoperWrapped
					){
						path.node.scoperWrapped = true
						path.node.body.scoperWrapped = true
						let uuid = smarts.getPathUUID({path})
						let replacement = smarts.functionWrapper(uuid, path, aster)
						path.replaceWith(
							replacement
						)
					}
				},
				FunctionDeclaration(path){
					if(!path.node.scoped){
						path.node.scoped = true
						parentBlock = path.scope.parent
						try {
							parentBlock.block.body.forEach((node,index)=>{
								if(node.lastContextNode){
									let uuid = smarts.getPathUUID({path})
									let newNode = aster(/*javascript*/`
										${uuid}.$functionScoper(${path.node.id.name})
									`)
									node.body.splice(1, 0, 
										newNode
									)
									throw new Error('break foreach')
								}
							})
						} catch(err){}
					}
				},
				VariableDeclarator(path){
					if(!path.node.inScope){
						path.node.inScope = true
						let parentPath = smarts.getsmart.bind(this)(path, 'parentPath', undefined)
						if(
							// this is for inline let and const declarations in normal
							// js blocks
							(
								parentPath.node.kind == "let"
								|| parentPath.node.kind == "const"
							)
							// we check the length of declarations because we only have to do inline replacement
							// if there's a chance another declaration might use a former one
							&& parentPath.node.declarations.length > 1
							&& !(
								parentPath.parentPath.node.type == 'ForInStatement'
								|| parentPath.parentPath.node.type == 'ForOfStatement'
								|| parentPath.parentPath.node.type == 'ForStatement'
							)
						){
							let uuid = smarts.getPathUUID({path})
							if(uuid){
								let indexInParent = parentPath.node.declarations.indexOf(path.node)
								let newDeclaration = smarts.scopeVar({
									aster, 
									inline: true,
									uuid,
									key: parentPath.node.declarations[indexInParent].id.name,
									type: parentPath.node.kind
								})
								parentPath.node.declarations.splice(indexInParent+1, 0, newDeclaration)
							}
						} else if(
							// 
							(
								parentPath.node.kind == "let" 
								|| parentPath.node.kind == "var"
								|| parentPath.node.kind == "const"
							)
							// only do this for singular declarations
							&& parentPath.node.declarations.length < 2
							// and check if variable is declared inside a ForX statement
							&& (
								parentPath.parentPath.node.type == 'ForInStatement'
								|| parentPath.parentPath.node.type == 'ForOfStatement'
								|| parentPath.parentPath.node.type ==  "ForStatement"
							)						
						){
							let uuid = smarts.getPathUUID({path})
							if(uuid){
								let indexInParent = parentPath.node.declarations.indexOf(path.node)
								let newNode = smarts.scopeVar({
									aster, 
									uuid,
									key: parentPath.node.declarations[indexInParent].id.name,
									type: parentPath.node.kind
								})
								parentPath.parentPath.node.body.body.splice(0,0,newNode)
							}
						} else if(
							// this is a special case for when ForStatements get their own scope
							(
								parentPath.node.kind == "let"
								|| parentPath.node.kind == "const"
							)
							// we check the length of declarations because we only have to do inline replacement
							// if there's a chance another declaration might use a former one
							&& parentPath.node.declarations.length > 1
							&& parentPath.parentPath.node.type == 'ForStatement'
						){
							// if the first declaration isn't our context declaration, insert one
							let uuid = smarts.gosmart.bind(this)(path, 'scope.uuid', smarts.jsUUID())
							if(!parentPath.node.declarations[0].contextDeclaration){
								let inlineContextDeclaration = smarts.createInlineContext({
									path,
									uuid,
									aster
								})
								parentPath.node.declarations.splice(0,0, inlineContextDeclaration)
							}
							if(uuid){
								let indexInParent = parentPath.node.declarations.indexOf(path.node)
								let newDeclaration = smarts.scopeVar({
									aster, 
									inline: true,
									uuid,
									key: parentPath.node.declarations[indexInParent].id.name,
									type: parentPath.node.kind
								})
								parentPath.node.declarations.splice(indexInParent+1, 0, newDeclaration)
							}

						} else if(
							(
								parentPath.node.kind == "let"
								|| parentPath.node.kind == "const"
							)
						){							
							let uuid = smarts.getPathUUID({path})
							if(uuid){
								let indexInParent = parentPath.node.declarations.indexOf(path.node)
								let newNode = smarts.scopeVar({
									aster, 
									uuid,
									key: parentPath.node.declarations[indexInParent].id.name,
									type: parentPath.node.kind
								})
								parentPath.insertAfter(newNode)
							}
						} else if(false){							
						} else if(false){							
						} else {
							// let uuid = smarts.getPathUUID({path})
							// if(uuid){
							// 	let indexInParent = parentPath.node.declarations.indexOf(path.node)
							// 	let newNode = smarts.scopeVar({
							// 		aster, 
							// 		uuid,
							// 		key: parentPath.node.declarations[indexInParent].id.name,
							// 		type: parentPath.node.kind
							// 	})
							// 	parentPath.insertAfter(newNode)
							// }
						}
					}
				}
			}
			let ret = {
				visitor: metaVisitor,
				// visitor: {
				// 	Program(path){
				// 		path.traverse(metaVisitor)
				// 	}
				// } 
			}
			return ret
		},
		transform(src, opts={}){
			return smarts.getBabel().transform(
				src, 
				{
					plugins: [smarts.babelPlugin],
					...opts					
				}
			)
		},
		dupe(obj, opts={}){
			return smarts.parse(smarts.stringify(obj))
		},
		clone(obj, opts={}){
			return smarts.dupe(obj, opts)
		},
		schema(obj1, obj2, opts={}){
			if(!opts.noSchemaClone){
				obj2 = smarts.clone(obj2, opts)
			}
			return smarts.merge(obj1, obj2, {
				...opts
			})
		},
		create(obj1, obj2, opts){

			let ret = smarts.merge(obj1, obj2, {
				clone: true, 
				...opts,
			})

			return ret
		},
		merge(value1, value2, opts={}, seen=new Map){

			if(seen.has(value1)) return seen.get(value1)
			
			if(value1 instanceof Array && value2 instanceof Array){
				return value1
			}

			
			if(opts.clone){
				value1 = smarts.clone(value1)
				value2 = smarts.clone(value2)
			}
			
			// base case non-valueect value
			if(smarts.basic(value1) || smarts.basic(value2)){
				value1 = value2
				return value1
			}
			
			let props = Object.keys(value2)

			props.forEach(prop=>{
				let propertyValue1 = value1[prop]
				if(prop in value1 && smarts.basic(propertyValue1) && !opts.overwrite){
					return
				}
				let propertyValue2 = value2[prop]
				seen.set(value1, value1)
				value1[prop] = smarts.merge.bind(this)(propertyValue1, propertyValue2, {...opts, ...{clone: false}}, seen)
			})

			return value1
			

			// let newProps = smarts.merge(obj1, obj2, {
			// 	arrayMerge: function (store, saved) { return saved },
			// 	clone: true,
			// 	...opts
			// })
			// Object.keys(newProps).forEach(key=>{
			// 	if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj1) {
			// 		this.$set(obj1, key, newProps[key])
			// 		if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
			// 			window.$store.commit('graph/thing')
			// 		}
			// 	} else {
			// 		obj1[key] = newProps[key]
			// 		if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
			// 			window.$store.commit('graph/thing')
			// 		}
			// 	}
			// })
		},
		basic(value){
			let ret = !(typeof value == 'object' || typeof value == 'array') || (value === null)
			return ret
		},
		mergeArray(obj1, obj2, opts){
			return smarts.merge(obj1, obj2, {
				arrayMerge: function (store, saved) { return saved },
				clone: true,
				...opts
			})
		},
		mod(args, mod){
			return mod(args) || args
		},
		// transform(value, fn, path, ret={}){
		// 	return smarts.forEach(value, fn, path, ret)
		// },
		deepForEach(value, fn, path, ret={}, seens={originals:[],clones:[]}) {
			path = path || ''
			value = { '': value }
			// if(!(typeof value == 'string' || typeof value == 'boolean' || typeof value == 'number')){
			// 	seens.originals.push(value)
			// }
			if (Array.isArray(value)) {
				smarts.forEachArray(value, fn, path, ret, seens)
			} else if (typeof value == 'object') {
				smarts.forEachObject(value, fn, path, ret, seens)
			}
			return ret['']
		},	
		forEachObject(obj, fn, path, ret, seens) {
			for (const key in obj) {
				const deepPath = path ? `${path}.${key}` : key
				let primitive = typeof obj[key] == 'string' || typeof obj[key] == 'boolean' || typeof obj[key] == 'number'
				if(primitive || seens.originals.indexOf(obj[key]) < 0){
					if(!primitive){
						seens.originals.push(obj[key])
					}
					// Note that we always use obj[key] because it might be mutated by forEach
					fn(obj[key], key, obj, deepPath, ret, seens)
					
					smarts.deepForEach(obj[key], fn, deepPath, ret, seens)
				}
			}
		},
		forEachArray(array, fn, path, ret={}, seens) {
			array.forEach((value, index, arr) => {
				let primitive = typeof obj[key] == 'string' || typeof obj[key] == 'boolean' || typeof obj[key] == 'number'
				if(primitive || seens.originals.indexOf(value) < 0){
					if(!primitive){
						seens.originals.push(value)
					}
					const deepPath = `${path}.${index}`

					fn(value, index, arr, deepPath, ret, seens)

					// Note that we use arr[index] because it might be mutated by forEach
					smarts.deepForEach(arr[index], fn, deepPath, ret, seens)
				}
			})
		},
		popThing({
			option,
			list = smarts.getsmart.bind(this)(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			defaultValue = undefined,
			vue = local.vue
		} = {}) {
			if (typeof list == 'object' && smarts.thingIn({
					option,
					list,
					obj,
					keys,
					keymatchtype
				})) {
				return list[smarts.thingIndex({
					option,
					list,
					obj,
					keys,
					keymatchtype
				})]
			} else {
				return defaultValue
			}
		},
		setThing({
			option,
			list = smarts.getsmart.bind(this)(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			push,
			strings,
			targets,
			vue = local.vue
		} = {}) {
			let index = smarts.thingIndex({
				option,
				list,
				obj,
				keys,
				keymatchtype,
				strings
			})
			if (obj == "debug") {
				console.log('index')
				console.log(index)
				console.log('list')
				console.log(list)
			}
			if (index >= 0 && list) {
				if (targets && targets.length && typeof targets.length == 'number') {
					for (var i = 0; i < targets.length; i++) {
						let value = smarts.getsmart.bind(this)(option, targets[i], undefined)
						if (value) {
							smarts.setsmart.bind(this)(list[index], targets[i], value)
						}
					}
				} else {
					list.splice(index, 1, option)
					if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false)) {
						if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else if (smarts.getsmart.bind(this)(local.vue, 'store', false) && !localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				}
				// list[index] = option
			} else if (push && list) {
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					list.push(option)
				}
				index = list.length - 1
			}
			return index
		},
		setThings({
			options,
			list = smarts.getsmart.bind(this)(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			push,
			async,
			vue = local.vue
		} = {}) {
			if (options && options instanceof Array && list) {
				for (let option of options) {
					if(async){
						new Promise((resolve, reject)=>{
							smarts.setThing({
								option,
								list,
								obj,
								keys,
								keymatchtype,
								push
							})
						})
					} else {
						smarts.setThing({
							option,
							list,
							obj,
							keys,
							keymatchtype,
							push
						})
					}
				}
			}
			return list
		},
		optIn(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
			if (typeof option === 'object') {
				obj = true
			}
			if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
				return index ? list.indexOf(option) : true
			} else if (obj && list && typeof list.length == 'number') {
				for (var i = 0; i < list.length; i++) {
					if(!(keys && typeof keys.length == 'number')) return
					for (var indKey = 0; indKey < keys.length; indKey++) {
						if (keymatchtype == 'broad') {
							if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && (smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined)) {
								return index ? i : true
							} else if (list[i] && typeof list[i] == 'string' && (list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined)) && (smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined)) {
								return index ? i : true
							}
						} else {
							if (list[i] && (smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined)) && (smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined)) {
								if (indKey == keys.length - 1) {
									return index ? i : true
								}
							} else if (list[i] && typeof list[i] == 'string' && (list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined)) && (smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined)) {
								if (indKey == keys.length - 1) {
									return index ? i : true
								}
							}
						}
					}
				}
			}
			return index ? -1 : false
		},
		thingIn({
			option,
			list = smarts.getsmart.bind(this)(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			strings,
			retIndex,
			vue = local.vue
		} = {}) {
			if (typeof option === 'object') {
				obj = true
			}
			if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
				if (retIndex) {
					return list.indexOf(option)
				} else {
					return true
				}
			} else if (obj && list && typeof list.length == 'number') {
				for (var i = 0; i < list.length; i++) {
					if(!(keys && typeof keys.length == 'number')) return
					for (var indKey = 0; indKey < keys.length; indKey++) {
						if (keymatchtype == 'broad') {
							if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined) {
								if (retIndex) {
									return i
								} else {
									return true
								}
							} else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined) {
								if (retIndex) {
									return i
								} else {
									return true
								}
							}
						} else {
							if (list[i] && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(list[i], keys[indKey], undefined) !== undefined) {
								if (indKey == keys.length - 1) {
									if (retIndex) {
										return i
									} else {
										return true
									}
								}
							} else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart.bind(this)(option, keys[indKey], undefined) && smarts.getsmart.bind(this)(option, keys[indKey], undefined) !== undefined) {
								if (indKey == keys.length - 1) {
									if (retIndex) {
										return i
									} else {
										return true
									}
								}
							}
						}
					}
				}
			}
			if (retIndex) {
				return -1
			} else {
				return false
			}
		},
		optsIn(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return true
			for (let option of options) {
				// if(typeof option === 'object'){
				//   obj = true
				// }
				if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
					// return true
				} else if (obj && list) {
					for (var i = 0; i < list.length; i++) {
						if (!smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
							return false
						}
					}
				} else {
					return false
				}
			}
			return true
		},
		thingsIn({
			options,
			list = smarts.getsmart.bind(this)(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if(!(options instanceof Array)) return true
			for (let option of options) {
				// if(typeof option === 'object'){
				//   obj = true
				// }
				if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
					// return true
				} else if (obj && list && typeof list.length == 'number') {
					for (var i = 0; i < list.length; i++) {
						if (!smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
							return false
						}
					}
				} else {
					return false
				}
			}
			return true
		},
		anyOptsIn(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return false
			for (let option of options) {
				// if(typeof option === 'object'){
				//   obj = true
				// }
				if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
					return true
				} else if (obj && list && typeof list.length == 'number') {
					for (var i = 0; i < list.length; i++) {
						if (smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
							return true
						}
					}
				}
			}
			return false
		},
		anyThingsIn({
			options,
			list = smarts.getsmart.bind(this)(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if(!(options instanceof Array)) return false
			for (let option of options) {
				// if(typeof option === 'object'){
				//   obj = true
				// }
				if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
					return true
				} else if (obj && list && typeof list.length == 'number') {
					for (var i = 0; i < list.length; i++) {
						if (smarts.optIn(option, list[i], obj, keys, keymatchtype)) {
							return true
						}
					}
				}
			}
			return false
		},
		optIndex(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if (typeof option === 'object') {
				obj = true
			}
			if (obj && list && keys && typeof list.length == 'number') {
				for (var i = 0; i < list.length; i++) {
					if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
						return i
					}
				}
			} else if (list) {
				return list.indexOf(option)
			}
			return -1
		},
		thingIndex({
			option,
			list,
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			strings,
			vue = local.vue
		} = {}) {
			if (typeof option === 'object') {
				obj = true
			}
			if (obj && list && keys) {
				let index = smarts.thingIn({
					option,
					list,
					obj,
					keys,
					keymatchtype,
					strings,
					retIndex: true
				})
				return index
			} else if (list) {
				return list.indexOf(option)
			}
			return -1
		},
		pushOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
			if (typeof list == 'object' && !smarts.optIn(option, list, obj, keys, keymatchtype)) {
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					list.push(option)
				}
			}
			return index ? smarts.optIn(option, list, obj, keys, keymatchtype, index) : smarts.optIn(option, list, obj, keys, keymatchtype, index)
		},
		addOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
			if (typeof list == 'object') {
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					list.push(option)
				}
			}
			return index ? smarts.optIn(option, list, obj, keys, keymatchtype, index) : smarts.optIn(option, list, obj, keys, keymatchtype, index)
		},
		pushThing({
			option,
			list = smarts.getsmart.bind(this)(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if (typeof list == 'object' && !smarts.thingIn({option, list, obj, keys, keymatchtype})) {
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					list.push(option)
				}
			}
		},
		pushOpts(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.pushOpt(option, list, obj, keys, keymatchtype)
			}
		},
		pushThings({
			options,
			list = smarts.getsmart.bind(this)(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.pushThing({option, list, obj, keys, keymatchtype})
			}
		},
		popOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if (typeof list == 'object' && smarts.optIn(option, list, obj, keys, keymatchtype)) {
				list.splice(smarts.optIndex(option, list, obj, keys, keymatchtype), 1)
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				}      
			}
		},
		popThing({
			option,
			list = smarts.getsmart.bind(this)(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if (typeof list == 'object' && smarts.thingIn({
					option,
					list,
					obj,
					keys,
					keymatchtype
				})) {
				list.splice(smarts.thingIndex({
					option,
					list,
					obj,
					keys,
					keymatchtype
				}), 1)
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) || smarts.getsmart.bind(this)(local.vue, 'store', false)) {
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} 
			}
		},
		popOpts(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			}
		},
		popThings({
			options,
			list = smarts.getsmart.bind(this)(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleOpt(option, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			} else {
				smarts.pushOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleThing({
			option,
			list = smarts.getsmart.bind(this)(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			} else {
				smarts.pushOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleOpts(options, list = smarts.getsmart.bind(this)(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
			for (let option in options) {
				smarts.toggleOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleThings({
			options,
			list = smarts.getsmart.bind(this)(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = local.vue
		} = {}) {
			if(!(options instanceof Array)) return
			for (let option in options) {
				if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
					smarts.popOpt(option, list, obj, keys, keymatchtype)
				} else {
					smarts.pushOpt(option, list, obj, keys, keymatchtype)
				}
			}
		},
		// no use right now
		ratchetOpt(option, list, obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			// find(obj, property, equals){
			// 	if(smarts.getsmart.bind(this)(obj, 'constructor', undefined) == Array){
			// 		for(var i=0; i<obj.length; i++){
			// 			find(obj[i], )
			// 		}
			// 	}
			// },
		},
		getsmart(obj, property, defaultValue, context, schema) {

			if (!property && obj && typeof obj == 'string') {
				property = obj.split(".")
				try {
					obj = eval(property[0])
				} catch (err) {
					// console.error(err)

					obj = property[0]
				}
				property = property.slice(1, property.length)
			}
			if (!property) {
				if (context) {
					return {
						value: defaultValue,
						undefined: true
					}
				} else {
					return defaultValue
				}
			}
			// If the property list is in dot notation, convert to array
			if (typeof property == "string") {
				property = smarts.parsePropertyPath(property)
			} else if (smarts.getsmart.bind(this)(property, 'constructor', false) !== Array) {
				if (context) {
					return {
						value: defaultValue,
						undefined: true,
						err: 'properties path @property argument was not passed properly'
					}
				} else {
					return defaultValue
				}
			}

			let deepGetByArray = deepGetByArrayUnbound.bind(this)

			return deepGetByArray(obj, property, defaultValue)

			// In order to avoid constantly checking the type of the property
			// we separate the real logic out into an inner function.
      function deepGetByArrayUnbound(obj, propsArray, defaultValue) {

				// This case getting to the last property but it not being ultimately defined
				// Not just having a value of undefined
				if(propsArray.length > 0 && context && typeof obj == 'object' && obj !== null && !(smarts.ee(propsArray[0]) in obj)){
					return {
						value: defaultValue,
						undefined: true
					}
				}
				
        // If we have reached an undefined/null property
        // then stop executing and return the default value.
        // If no default was provided it will be undefined.
        if (( typeof obj == 'undefined' || obj == null ) || (schema && obj.constructor.name !== schema) ) {
          if (context) {
						let undef = true
						if(propsArray.length === 0){
							undef = false
						}
            return {
              value: defaultValue,
              undefined: undef,
							schema: (schema && obj.constructor.name === schema)

							};
          } else {
            return defaultValue;
          }
        } // If the path array has no more elements, we've reached
        // the intended property and return its value


        if (propsArray.length === 0) {
          if (context) {
            return {
              value: obj,
              undefined: false
            };
          } else {
            return obj;
          }
        } // Prepare our found property and path array for recursion


        var nextObj = obj[smarts.ee(propsArray[0])];
        var remainingProps = propsArray.slice(1);
        return deepGetByArray(nextObj, remainingProps, defaultValue);
      }
		},
		escapePropertyPath(path=""){
			let newPath = smarts.escapeEscapes(path)
			return "[\""+newPath+"\"]"
		},
		epp(path=""){
			return smarts.escapePropertyPath(path)
		},
		escapeEscapes(path=""){
			let newPath = ""
			for(let i in path){
				i = +i
				let char = path[i]
				if(i > 0 && i < path.length-1){
					let prevChar = path[i-1]
					let nextChar = path[i+1]
					let openingArrayPath = (char === '"' && prevChar === "[" 
						// && (nextChar !== "\\" || i === path.length-1)
					)
					let closingArrayPath = (char === '"' && nextChar === "]" 
						&& (prevChar !== "\\")
					)
					let offset = 0
					// if(openingArrayPath) offset = 1
					if (openingArrayPath || closingArrayPath){
						newPath += "\\"
						// path = path.slice(0,i+offset)+"\\"+path.slice(i+offset,path.length)
					} 
				}
				newPath += char
			}
			return newPath
		},
		ee(path=""){
			return smarts.escapeEscapes(path)
		},
		// TODO
		// Make parsing use \" or \'
		// Currently only uses \"
		parsePropertyPath(path=""){

			let array = []

			let readingArrayBasedPath = false
			let i = 0
			let push = false
			let pushed = false
			while (i < path.length){

				let arrayPathStart = path[i] == '[' && path[i+1] == "\""
				let escapedStart = !(path[i+1] !== "\\" || i === 0)

				if(readingArrayBasedPath){

					// we found the end of an array delimited path
					let arrayPathEnd = path[i] == "\"" && path[i+1] == "]"
					let escapedEnd = !(path[i-1] !== "\\" || i == 0)
					if(arrayPathEnd && !escapedEnd) {
						i += 1
						readingArrayBasedPath = false
						if(!pushed) push = true
					} else {
						// if the path includes an "escaped" array based path begin or end value
						// do not push the escape character
						if(
							(path[i] == "\\" && path[i+1] == "\"" && path[i+2] == "]")
							|| (path[i-1] == "["  && path[i] == "\\" && path[i+1] == "\"")
						){

						} else {
							array[array.length-1] += path[i]
						}
					}
				} else if(path[i] == '.'){
					if(!pushed) push = true
				} 
				// we found the start of an array delimited path
				else if(arrayPathStart && !escapedStart) {
					
					readingArrayBasedPath = true
					if(!pushed) push = true
					i += 1
				} else {
					if(i == 0) array.push("")
					array[array.length-1] += path[i]
				}

				i++
				if(push && i < path.length){
					pushed = true
					array.push("")
					push = false
				} else {
					pushed = false
				}
			}

			return array

		},
		ppp(path=""){
			return this.parsePropertyPath(path)
		},
		parsePropertyArray(pathArray){
			let path = ""

			if(pathArray instanceof Array){
				pathArray.forEach(subPath=>{
					path += smarts.epp(subPath)
				})
			} else if(typeof pathArray === 'string'){
				return path
			}

			return path
		},
		ppa(pathArray){
			return this.parsePropertyArray(pathArray)
		},
		pathToArray(path) {
			if(typeof path == 'string'){
				return smarts.parsePropertyPath(path)
			} else {
				return path
			}
		},
		pathToString(path) {
			if(typeof path == 'string'){
				let ret = smarts.parsePropertyPath(path)
				ret = smarts.parsePropertyArray(ret)
				return ret
			} else {
				let ret = smarts.parsePropertyArray(path)
				return ret
			}
		},
		setsmart(obj, property, value, context) {
			if (!property && typeof obj == 'string') {
				property = obj.split(".")
				try {
					obj = eval(property[0])
				} catch (err) {
					// console.error(err)
					obj = property[0]
				}
				property = property.slice(1, property.length)
			}
			// If the property list is in dot notation, convert to array
			if (typeof property == "string") {
				property = smarts.parsePropertyPath(property)
			} else if (smarts.getsmart.bind(this)(property, 'constructor', false) !== Array) {
				if (context) {
					return {
						value: value,
						undefined: true,
						err: 'properties path @property argument was not passed properly'
					}
				} else {
					return value
				}
			}

			// if no obj make obj
			if(!obj || (typeof obj !== 'object' && typeof obj !== 'function')) obj = {}

			let deepSetByArray = deepSetByArrayUnbound.bind(this)
			
			if (property) {
				return deepSetByArray(obj, property, value)
			} else {
				if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
					this.$set(obj, undefined, value)
					if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					obj = value
					if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
						window.$store.commit('graph/thing')
					}
				}
				if (context) {
					return {
						value: obj,
						undefined: false,
						err: 'there were no properties passed'
					}
				} else {
					return obj
				}
			}

			// In order to avoid constantly checking the type of the property
			// we separate the real logic out into an inner function.
			function deepSetByArrayUnbound (obj, propsArray, value) {

				// If the path array has only 1 more element, we've reached
				// the intended property and set its value
				if (propsArray.length == 1) {
					if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
						this.$set(obj, smarts.ee(propsArray[0]), value)
						if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else {
						obj[smarts.ee(propsArray[0])] = value
						if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('graph/thing')
						}
					}
					if (context) {
						return {
							value: obj[smarts.ee(propsArray[0])],
							undefined: false
						}
					} else {
						return obj[smarts.ee(propsArray[0])]
					}
				}
				// Prepare our path array for recursion
				var remainingProps = propsArray.slice(1)
				// check if next prop is object
				if (typeof obj[smarts.ee(propsArray[0])] !== 'object') {
					// If we have reached an undefined/null property
					if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
						this.$set(obj, smarts.ee(propsArray[0]), {})
						if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else {
						obj[smarts.ee(propsArray[0])] = {}
						if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('graph/thing')
						}
					}
				}
				return deepSetByArray(obj[smarts.ee(propsArray[0])], remainingProps, value)
			}
		},
		deletesmart(obj, property){
			if (!property && typeof obj == 'string') {
				property = obj.split(".")
				try {
					obj = eval(property[0])
				} catch (err) {
					// console.error(err)
					obj = property[0]
				}
				property = property.slice(1, property.length)
			}
			// If the property list is in dot notation, convert to array
			if (typeof property == "string") {
				property = smarts.parsePropertyPath(property)
			}
			let parentPathArray = property.slice(0, property.length-1)
			let path = property[property.length-1]
			let parentObj = smarts.getsmart(obj, parentPathArray, {})

			delete parentObj[path]

			if(typeof window !== 'undefined'){
				if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
					window.$store.commit('graph/thing')
				} else if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
					window.$store.commit('graph/thing')
				}
			}

		},
		pushSmart(array, value){
			if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && array) {
				array.push(value)
				if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
					window.$store.commit('graph/thing')
				}
			} else {
				array.push(value)
			}
		},
		gosmart(obj, property, value, context, schema) {
			// stands for get or set smart
			var get = smarts.getsmart.bind(this)(
				obj, 
				property, 
				value, 
				true, 
				schema ? smarts.absoluteType.bind(this)(value) : false
			)
			if (get.undefined || (schema && get.schema === false)) {
				get = smarts.setsmart.bind(this)(obj, property, get.value, context)
			}
			// return value from property path, either gotten or smartly set
			if (context) {
				return get
			} else {
				// sort of unneccessary to use getsmart but /shrug/
				return smarts.getsmart.bind(this)(get, 'value', get)
			}
		},
		gosmarter(obj, property, value, context, schema=true){
			return smarts.gosmart.bind(this)(obj, property, value, context, schema)
		},
		absoluteType(value){
			let type
			try {
				type = value.constructor.name
			} catch(e){
				if(typeof value === 'undefined') type = 'undefined'
				if(value === null) type = 'null'
			}
			return type
		},
		vgosmart(obj, property, value, context) {
			// stands for v-model get or set smart
			// return value from property path, either gotten or smartly set
			return {
				get: ()=>{
					var get = smarts.getsmart.bind(this)(obj, property, value, true)
					if (get.undefined) {
						get = smarts.setsmart.bind(this)(obj, property, get.value, context)
					}
					if (context) {
						return get
					} else {
						return smarts.getsmart.bind(this)(get, 'value', get)
					}
				},
				set: (val)=>{
					smarts.setsmart.bind(this)(obj, property, val)
				}
			}
		},
		getsmartval(obj, property, defaultValue) {
			// get the value of a property path based off its type
			let target = smarts.getsmart.bind(this)(obj, property, defaultValue)
			if (target && target.type) {
				if (target[target.type]) {
					return target[target.type]
				} else {
					return defaultValue
				}
			} else if (target) {
				return target
			}
			return defaultValue
		},
		safestring(something) {
			return smarts.jsmart.stringify(something || '')
		},
		safeparse(something) {
			return smarts.jsmart.parse(something || '')
		},
		flatten(arrays, func=(i)=>i) {
			const flat = [];

			arrays.forEach(array => {
				if (Array.isArray(array)) {
					flat.push(...smarts.flatten(array));
				} else {
					flat.push(func(array));
				}
			});

			return flat;
		},
		mapsmart(list, keyProperty = 'title', returnExistant, populate) {
			return new Promise((resolve, reject) => {
				if (!keyProperty) {
					reject()
				} else if (list && typeof list.length == 'number') {
					if (list.length == 0) {
						if ((returnExistant && smarts.getsmart.bind(this)(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
							resolve(true)
						} else if (returnExistant) {
							resolve(false)
						} else {
							resolve()
						}
					}
					if (!list.mapped || typeof list.mapped === 'boolean') {
						if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && list) {
							this.$set(list, 'mapped', {})
						} else {
							list['mapped'] = {}
						}
					}
					for (var i = 0; i < list.length; i++) {
						if (typeof list[i] !== 'string') {
							if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && list.mapped) {
								this.$set(list.mapped, list[i][keyProperty], list[i])
							} else {
								list['mapped'][list[i][keyProperty]] = list[i]
							}
							if (i == list.length - 1) {
								if ((returnExistant && smarts.getsmart.bind(this)(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
									resolve(true)
								} else if (returnExistant) {
									resolve(false)
								} else {
									resolve()
								}
							}
						}
						// else if(populate){
						//   var funCounter = this.funCounter
						//   this.funCounter = this.funCounter + 1
						//   smarts.getThing({
						//     thing: list[i],
						//     clientId: this._uid,
						//     funCounter
						//   })
						//   this.$options.sockets['giveThing'] = data => {
						//     if(this._uid == data.clientId && data.funCounter == funCounter){
						//       this.$set(list, i.toString(), data.thing)
						//       this.$set(list.mapped, list[i][keyProperty], list[i])
						//     }
						//     if(i==list.length-1){
						//       if((returnExistant && smarts.getsmart.bind(this)(list, 'mapped.'+returnExistant, false)) || !returnExistant){
						//         resolve(true)
						//       } else if(returnExistant) {
						//         resolve(false)
						//       } else {
						//         resolve()
						//       }
						//     }
						//   } 
						// } 
						else if (i == list.length - 1) {
							if ((returnExistant && smarts.getsmart.bind(this)(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
								resolve(true)
							} else if (returnExistant) {
								resolve(false)
							} else {
								resolve()
							}
						}
					}
					// if(list.mapped && !list.mapped['agora-client-mapped']){
					//   this.$set(list.mapped, 'agora-client-mapped', true)
					// }

				}
			})
		},
		domval(thing) {
			return smarts.getsmart.bind(this)(thing, 'properties.description', '')
		},
		getThing({
			option,
			list = smarts.getsmart.bind(this)(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			strings,
			defaultValue = undefined,
			vue = local.vue
		} = {}) {
			var index = smarts.thingIn({
				...arguments[0],
				retIndex: true
			})
			if (index >= 0) {
				return list[index]
			} else {
				return defaultValue
			}
		},
		equal(obj1, obj2, seen=[]){
			if((obj1 && obj2) && (typeof obj1 == 'object') && (typeof obj2 == 'object')){
				seen.push(obj1, obj2)
				//Loop through properties in object 1
				for (var p in obj1) {
					//Check property exists on both objects
					if (
						typeof obj1.hasOwnProperty == 'function' 
						&& typeof obj2.hasOwnProperty == 'function' 
						&& obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)
					) return false

					switch (typeof (obj1[p])) {
						//Deep compare objects
						case 'object':
							if ((seen.indexOf(obj1[p]) < 0) && !smarts.equal(obj1[p], obj2[p], seen)) return false
							break
						//Compare function code
						case 'function':
							if (typeof (obj2[p]) == 'undefined' || (obj1[p].toString() != obj2[p].toString())) return false
							break
						//Compare values
						default:
							if (obj1[p] != obj2[p]) return false
					}
				}

				//Check object 2 for any extra properties
				for (var p in obj2) {
					if (!(p in obj1)) return false
				}
				return true
			}
		},
		emptyTarget(val) {
			return Array.isArray(val) ? [] : {}
		},
		cloneUnlessOtherwiseSpecified(value, options, known) {
			if(known.has(value)){
				let val = known.get(value)
				return val
			} else {
				let val = (options.clone !== false && options.isMergeableObject(value))
					? smarts.parse(smarts.stringify(value))
					: value
				known.set(value, val)
				return val
			}
		},
		defaultArrayMerge(target, source, options, known) {
			if(known.has(source)) return known.get(source)
			target.concat(source).map(function(element) {
				return smarts.cloneUnlessOtherwiseSpecified(element, options, known)
			})
			known.set(source, target)
		},
		getMergeFunction(key, options) {
			if (!options.customMerge) {
				return smarts.merge
			}
			var customMerge = options.customMerge(key)
			return typeof customMerge === 'function' ? customMerge : smarts.merge
		},
		getEnumerableOwnPropertySymbols(target) {
			return Object.getOwnPropertySymbols
				? Object.getOwnPropertySymbols(target).filter(function(symbol) {
					return target.propertyIsEnumerable(symbol)
				})
				: []
		},
		getKeys(target) {
			return Object.keys(target).concat(smarts.getEnumerableOwnPropertySymbols(target))
		},
		propertyIsOnObject(object, property) {
			try {
				return property in object
			} catch(_) {
				return false
			}
		},
		// Protects from prototype poisoning and unexpected merging up the prototype chain.
		propertyIsUnsafe(target, key) {
			return smarts.propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
				&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
					&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
		},
		mergeObject(target, source, options, known) {
			var destination = {}
			if (options.isMergeableObject(target)) {
				smarts.getKeys(target).forEach(function(key) {
					if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
						this.$set(destination, key, smarts.cloneUnlessOtherwiseSpecified(target[key], options, known))
						if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else {
						let newVal = smarts.cloneUnlessOtherwiseSpecified(target[key], options, known)
						destination[key] = newVal
						if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('graph/thing')
						}
					}

				})
			}
			// if(!known.has(source)){
			// 	known.add(source)
				smarts.getKeys(source).forEach(function(key) {
					if (smarts.propertyIsUnsafe(target, key)) {
						return
					}

					if (smarts.propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
						if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
							this.$set(destination, key, smarts.getMergeFunction(key, options)(target[key], source[key], options, known))
							if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
								window.$store.commit('graph/thing')
							}
						} else {
							let newVal = smarts.getMergeFunction(key, options)(target[key], source[key], options, known)
							destination[key] = newVal
							if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
								window.$store.commit('graph/thing')
							}
						}
					} else {
						if (smarts.getsmart.bind(this)(local.vue, 'reactiveSetter', false) && smarts.getsmart.bind(this)(this, '$set', false) && obj) {
							this.$set(destination, key, smarts.cloneUnlessOtherwiseSpecified(source[key], options, known))
							if(typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){
								window.$store.commit('graph/thing')
							}
						} else {
							let newVal = smarts.cloneUnlessOtherwiseSpecified(source[key], options, known)
							destination[key] = newVal
							if(smarts.getsmart.bind(this)(local.vue, 'store', false) && typeof smarts.getsmart.bind(this)(window, '$store.commit', undefined) == 'function'){ 
								window.$store.commit('graph/thing')
							}
						}
					}
				})
			// }

			return destination
		},
		deepmerge(target, source, options, known=new Map) {
			options = options || {}
			options.arrayMerge = options.arrayMerge || smarts.defaultArrayMerge
			options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject
			// smarts.cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
			// implementations can use it. The caller may not replace it.
			options.cloneUnlessOtherwiseSpecified = smarts.cloneUnlessOtherwiseSpecified

			var sourceIsArray = Array.isArray(source)
			var targetIsArray = Array.isArray(target)
			var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray

			if (!sourceAndTargetTypesMatch) {
				return smarts.cloneUnlessOtherwiseSpecified(source, options, known)
			} else if (sourceIsArray) {
				return options.arrayMerge(target, source, options, known)
			} else {
				return smarts.mergeObject(target, source, options, known)
			}
		},
		deepmergeAll(array, options) {
			if (!Array.isArray(array)) {
				throw new Error('first argument should be an array')
			}

			return array.reduce(function(prev, next) {
				return smarts.merge(prev, next, options)
			}, {})
		}
	}

	return smarts
}
