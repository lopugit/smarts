let merge = require('deepmerge')
let babel = require('@babel/parser')
let uuid = require('uuid/v4')
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
		uuid,
		pause(value, opts){
			return smarts.stringify(value, opts)
		},
		save(value, opts){
			return smarts.stringify(value, opts)
		},
		stringify(value, opts={}) {
			smarts.schema(opts, {
				stringifier: smarts.stringifier,
				replacer: eval('(function '+smarts.replacer.toString()+')'),
				strictFunctions: false,
				firstRun: undefined,
				known: new Map,
				input: [],
				output: [],
			})
			opts.value = opts.stringifier('', value, opts).value
			for(
				i = parseInt(smarts.setKnown(opts.known, opts.input, opts.stringifier('', opts.value, opts)));
				i < opts.input.length; 
				i++
			) {
				opts.firstRun = true
				try {
					opts.output[i] = JSON.stringify(opts.input[i], opts.replacer, opts.space)
					debug = 1
				} catch(err){ console.error(err) }
			}
			return '[' + opts.output.join(',') + ']'
		},
		replacer(key, value){
			if (opts.firstRun) {
				opts.firstRun = !opts.firstRun
				return value
			}
			var after = opts.stringifier(key, value, opts)
			switch (typeof after.value) {
				case 'object':
					if (after === null) return after.value
				case 'string':
					return opts.known.get(after.key) || smarts.setKnown(opts.known, opts.input, after)
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
						$scopes: val.$scopes
					},
					key: val
				}
				if(ret.value.$js == "function () { [native code] }") return
				if(typeof known == "undefined") smarts.setKnown(opts.known, opts.input, ret)
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
			smarts.schema(opts, {
				// parser: eval('(function '+smarts.parser+')'),
				parser: smarts.parser,
				value: {},
				strictFunctions: true,
				firstPass: true,
				output: new Map
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
				
			return opts.parser('', tmp, opts)
		},
		defineVariable(replaceUUID2){
			var	replaceVariableKey = replaceUUID2.$scope[replaceVariableKey]
			Object.defineProperty(
				replaceUUID2.$scope, 
				replaceVariableKey, 
				{
					get(){
						return replaceVariableKey
					},
					set(val){
						replaceVariableKey = val
					},
					enumerable: true
				}
			)
		},
		scoper(replaceUUID1){
			try {
				replaceUUID1.$scopes = replaceUUID1.val.$scopes && typeof replaceUUID1.val.$scopes.reverse == 'function'
				if(replaceUUID1.$scopes){
					replaceUUID1.defineVariable = replaceUUID1.smarts.defineVariable.toString().replace(/replaceUUID2/g, replaceUUID1)
					for(replaceUUID1.$scope of replaceUUID1.val.$scopes.reverse()){
						if(replaceUUID1.$scope != globalThis){
							for(replaceUUID1.variableKey in replaceUUID1.$scope){
								try {
									eval(`(${replaceUUID1.defineVariable.replace(/replaceVariableKey/g, replaceUUID1.variableKey)})(replaceUUID1)`)
								} catch(err){
									console.error(err)
								}
							}
						}
					}
				}
			} catch(err){
				console.error(err)
			}
			replaceUUID1.$scoper = replaceUUID1.smarts.createFunction.toString().replace(/replaceUUID3/g, replaceUUID1)
			if(replaceUUID1.$scopes){
				replaceUUID1.val.$scopes.$scoper = replaceUUID1.$scoper
				return replaceUUID1.val.$scopes.$scoper
			}
			return replaceUUID1.$scoper
		},
		createFunction(replaceUUID3){
			try {
				replaceUUID3.ret = eval('('+replaceUUID3.val.$js+')')
			} catch(err1){
				try {
					replaceUUID3.ret = eval('({'+replaceUUID3.val.$js+'})')
					replaceUUID3.keys = Object.keys(replaceUUID3.ret)
					replaceUUID3.ret = replaceUUID3.ret[replaceUUID3.keys[0]]
				} catch(err2){
					try {
						replaceUUID3.ret = eval('({b:'+ replaceUUID3.val.$js +'})').b
					} catch(err3){
						console.error(err1)
						console.error(err2)
						console.error(err3)
					}
				}
			}
			return replaceUUID3.ret
		},
		parser(key, val, opts, firstRun, index){
			if (
				val.$js
			) {
				if(!firstRun){
					let uuid = smarts.uuid().replace(/-/ig, '')
					var fn
					if(val.$scopes && val.$scopes.$scoper && typeof val.$scopes.$scoper == 'function'){
						fn = val.$scopes.$scoper
					} else {
						let fns = `function(a${uuid}){
							try {
								a${uuid}.$scopes = a${uuid}.val.$scopes && typeof a${uuid}.val.$scopes.reverse == 'function'
								if(a${uuid}.$scopes){
									for(a${uuid}.$scope of a${uuid}.val.$scopes.reverse()){
										if(a${uuid}.$scope != globalThis){
											for(a${uuid}.variableKey in a${uuid}.$scope){
												try {
													eval(
														\`var \${a${uuid}.variableKey} = a${uuid}.$scope[a${uuid}.variableKey];
														Object.defineProperty(
															a${uuid}.$scope, 
															\${a${uuid}.variableKey}, 
															{
																get(){
																	return \${a${uuid}.variableKey}
																},
																set(val){
																	\${a${uuid}.variableKey} = val
																},
																enumerable: true
															}
														)
													\`)												
												} catch(err){
													console.error(err)
												}
											}
										}
									}
								}
							} catch(err){
								console.error(err)
							}
							a${uuid}.$scoper = function(b${uuid}){
								try {
									b${uuid}.ret = eval('('+b${uuid}.val.$js+')')
								} catch(err1){
									try {
										b${uuid}.ret = eval('({'+b${uuid}.val.$js+'})')
										b${uuid}.keys = Object.keys(b${uuid}.ret)
										b${uuid}.ret = b${uuid}.ret[b${uuid}.keys[0]]
									} catch(err2){
										try {
											b${uuid}.ret = eval('({b:'+ b${uuid}.val.$js +'})').b
										} catch(err3){
											console.error(err1)
											console.error(err2)
											console.error(err3)
										}
									}
								}
								return b${uuid}.ret
							}
							if(a${uuid}.$scopes){
								a${uuid}.val.$scopes.$scoper = a${uuid}.$scoper
								return a${uuid}.val.$scopes.$scoper
							}
							return a${uuid}.$scoper
						}`

						fn = eval(`(${fns})`)

					}

					let ret = fn({val})({val})
					opts.input[index] = ret
					return ret
				} else {
					let tmp = opts.input[opts.output.get(val)]
					if(typeof tmp == 'function') return tmp

				}
			}
			return smarts.Primitives(key, val)
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
							output[key] = smarts.primitives(parser(key, smarts.revive(input, parsed, tmp, parser, opts), opts, false, value))
						} else {
							try {
								output[key] = smarts.primitives(parser(key, tmp, opts, true, value))
							} catch(err){
								delete output[key]
							}
						}
					} else {
						try {
							output[key] = smarts.primitives(parser(key, value, opts, true, value))
						} catch(err){
							delete output[key]
						}
					}
					return output
				},
				output
			)
		},
		dupe(obj){
			return f.parse(f.stringify(obj))
		},
		schema(obj1, obj2, opts){
			return smarts.create(obj1, obj2, {clone: false,...opts})
		},
		create(obj1, obj2, opts){
			return Object.assign(
				obj1, 
				merge(obj2, obj1, {
					arrayMerge: function (store, saved) { return saved },
					clone: true,
					...opts
				})
			)		
		},
		merge(obj1, obj2, opts){
			if(obj1 instanceof Array && typeof obj2 instanceof Array){
				return smarts.arrayMerge(obj1, obj2, opts)
			} else {
				return Object.assign(
					obj1, 
					merge(obj1, obj2, {
						arrayMerge: function (store, saved) { return saved },
						clone: true,
						...opts
					})
				)
			}
		},
		mergeArray(obj1, obj2, opts){
			return merge(obj1, obj2, {
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
			list = smarts.getsmart(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			defaultValue = undefined,
			vue = vue
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
			list = smarts.getsmart(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			push,
			strings,
			targets,
			vue = vue
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
						let value = smarts.getsmart(option, targets[i], undefined)
						if (value) {
							smarts.setsmart(list[index], targets[i], value)
						}
					}
				} else {
					list.splice(index, 1, option)
					if (smarts.getsmart(local.vue, 'reactiveSetter', false) && this.$set) {
						if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else if (smarts.getsmart(local.vue, 'store', false) && !localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				}
				// list[index] = option
			} else if (push && list) {
				if (smarts.getsmart(local.vue, 'reactiveSetter', false) || smarts.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
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
			list = smarts.getsmart(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			push,
			async,
			vue = vue
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
		optIn(option, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
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
							if (list[i] && smarts.getsmart(list[i], keys[indKey], undefined) == smarts.getsmart(option, keys[indKey], undefined) && (smarts.getsmart(list[i], keys[indKey], undefined) !== undefined)) {
								return index ? i : true
							} else if (list[i] && typeof list[i] == 'string' && (list[i] == smarts.getsmart(option, keys[indKey], undefined)) && (smarts.getsmart(option, keys[indKey], undefined) !== undefined)) {
								return index ? i : true
							}
						} else {
							if (list[i] && (smarts.getsmart(list[i], keys[indKey], undefined) == smarts.getsmart(option, keys[indKey], undefined)) && (smarts.getsmart(list[i], keys[indKey], undefined) !== undefined)) {
								if (indKey == keys.length - 1) {
									return index ? i : true
								}
							} else if (list[i] && typeof list[i] == 'string' && (list[i] == smarts.getsmart(option, keys[indKey], undefined)) && (smarts.getsmart(option, keys[indKey], undefined) !== undefined)) {
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
			list = smarts.getsmart(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			strings,
			retIndex,
			vue = vue
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
							if (list[i] && smarts.getsmart(list[i], keys[indKey], undefined) == smarts.getsmart(option, keys[indKey], undefined) && smarts.getsmart(list[i], keys[indKey], undefined) !== undefined) {
								if (retIndex) {
									return i
								} else {
									return true
								}
							} else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart(option, keys[indKey], undefined) && smarts.getsmart(option, keys[indKey], undefined) !== undefined) {
								if (retIndex) {
									return i
								} else {
									return true
								}
							}
						} else {
							if (list[i] && smarts.getsmart(list[i], keys[indKey], undefined) == smarts.getsmart(option, keys[indKey], undefined) && smarts.getsmart(list[i], keys[indKey], undefined) !== undefined) {
								if (indKey == keys.length - 1) {
									if (retIndex) {
										return i
									} else {
										return true
									}
								}
							} else if (list[i] && typeof list[i] == 'string' && list[i] == smarts.getsmart(option, keys[indKey], undefined) && smarts.getsmart(option, keys[indKey], undefined) !== undefined) {
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
		optsIn(options, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
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
			list = smarts.getsmart(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
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
		anyOptsIn(options, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
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
			list = smarts.getsmart(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
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
		optIndex(option, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
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
			vue = vue
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
		pushOpt(option, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
			if (typeof list == 'object' && !smarts.optIn(option, list, obj, keys, keymatchtype)) {
				if (smarts.getsmart(local.vue, 'reactiveSetter', false) || smarts.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					list.push(option)
				}
			}
			return index ? smarts.optIn(option, list, obj, keys, keymatchtype, index) : smarts.optIn(option, list, obj, keys, keymatchtype, index)
		},
		addOpt(option, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
			if (typeof list == 'object') {
				if (smarts.getsmart(local.vue, 'reactiveSetter', false) || smarts.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
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
			list = smarts.getsmart(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
		} = {}) {
			if (typeof list == 'object' && !smarts.thingIn({option, list, obj, keys, keymatchtype})) {
				if (smarts.getsmart(local.vue, 'reactiveSetter', false) || smarts.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					list.push(option)
				}
			}
		},
		pushOpts(options, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.pushOpt(option, list, obj, keys, keymatchtype)
			}
		},
		pushThings({
			options,
			list = smarts.getsmart(stringList),
			obj,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
		} = {}) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.pushThing({option, list, obj, keys, keymatchtype})
			}
		},
		popOpt(option, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if (typeof list == 'object' && smarts.optIn(option, list, obj, keys, keymatchtype)) {
				list.splice(smarts.optIndex(option, list, obj, keys, keymatchtype), 1)
				if (smarts.getsmart(local.vue, 'reactiveSetter', false) || smarts.getsmart(local.vue, 'store', false)) {
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				}      
			}
		},
		popThing({
			option,
			list = smarts.getsmart(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
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
				if (smarts.getsmart(local.vue, 'reactiveSetter', false) || smarts.getsmart(local.vue, 'store', false)) {
					if(!localStorage.getItem('vuexWriteLock') && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} 
			}
		},
		popOpts(options, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			}
		},
		popThings({
			options,
			list = smarts.getsmart(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
		} = {}) {
			if(!(options instanceof Array)) return
			for (let option of options) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleOpt(option, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			} else {
				smarts.pushOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleThing({
			option,
			list = smarts.getsmart(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
		} = {}) {
			if (smarts.optIn(option, list, obj, keys, keymatchtype)) {
				smarts.popOpt(option, list, obj, keys, keymatchtype)
			} else {
				smarts.pushOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleOpts(options, list = smarts.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
			for (let option in options) {
				smarts.toggleOpt(option, list, obj, keys, keymatchtype)
			}
		},
		toggleThings({
			options,
			list = smarts.getsmart(stringList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			vue = vue
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
			// 	if(smarts.getsmart(obj, 'constructor', undefined) == Array){
			// 		for(var i=0; i<obj.length; i++){
			// 			find(obj[i], )
			// 		}
			// 	}
			// },
		},
		getsmart(obj, property, defaultValue, context) {

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
				property = property.split(".")
			} else if (smarts.getsmart(property, 'constructor', false) !== Array) {
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

			// In order to avoid constantly checking the type of the property
			// we separate the real logic out into an inner function.
			var deepGetByArray = function (obj, propsArray, defaultValue) {
				// If we have reached an undefined/null property
				// then stop executing and return the default value.
				// If no default was provided it will be undefined.
				if (!propsArray || (typeof obj == 'undefined') || obj == null) {
					if (context) {
						return {
							value: defaultValue,
							undefined: true
						}
					} else {
						return defaultValue
					}
				}

				// If the path array has no more elements, we've reached
				// the intended property and return its value
				if (propsArray.length === 0) {
					if (context) {
						return {
							value: obj,
							undefined: false
						}
					} else {
						return obj
					}
				}

				// Prepare our found property and path array for recursion
				var nextObj = obj[propsArray[0]]
				var remainingProps = propsArray.slice(1)

				return deepGetByArray(nextObj, remainingProps, defaultValue)
			}
			return deepGetByArray(obj, property, defaultValue)
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
				property = property.split(".")
			} else if (smarts.getsmart(property, 'constructor', false) !== Array) {
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
			if(!obj) obj = {}
			// switch contexts
			// In order to avoid constantly checking the type of the property
			// we separate the real logic out into an inner function.
			var deepGetByArray = function (obj, propsArray, value) {

				// If the path array has only 1 more element, we've reached
				// the intended property and set its value
				if (propsArray.length == 1) {
					if (smarts.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
						that.$set(obj, propsArray[0], value)
						if(typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else {
						obj[propsArray[0]] = value
						if(smarts.getsmart(vue, 'store', false) && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('graph/thing')
						}
					}
					if (context) {
						return {
							value: obj[propsArray[0]],
							undefined: false
						}
					} else {
						return obj[propsArray[0]]
					}
				}
				// Prepare our path array for recursion
				var remainingProps = propsArray.slice(1)
				// check if next prop is 
				if (typeof obj[propsArray[0]] !== 'object') {
					// If we have reached an undefined/null property
					if (smarts.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
						that.$set(obj, propsArray[0], {})
						if(typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('graph/thing')
						}
					} else {
						obj[propsArray[0]] = {}
						if(smarts.getsmart(vue, 'store', false) && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('graph/thing')
						}
					}
				}
				return deepGetByArray(obj[propsArray[0]], remainingProps, value)
			}
			if (property) {
				return deepGetByArray(obj, property, value)
			} else {
				if (smarts.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
					that.$set(obj, undefined, value)
					if(typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('graph/thing')
					}
				} else {
					obj = value
					if(smarts.getsmart(vue, 'store', false) && typeof smarts.getsmart(window, '$store.commit', undefined) == 'function'){ 
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
		},
		gosmart(obj, property, value, context) {
			// stands for get or set smart
			var get = smarts.getsmart(obj, property, value, true)
			if (get.undefined) {
				get = smarts.setsmart(obj, property, get.value, context)
			}
			// return value from property path, either gotten or smartly set
			if (context) {
				return get
			} else {
				return smarts.getsmart(get, 'value', get)
			}
		},
		vgosmart(obj, property, value, context) {
			// stands for v-model get or set smart
			// return value from property path, either gotten or smartly set
			return {
				get: ()=>{
					var get = smarts.getsmart(obj, property, value, true)
					if (get.undefined) {
						get = smarts.setsmart(obj, property, get.value, context)
					}
					if (context) {
						return get
					} else {
						return smarts.getsmart(get, 'value', get)
					}
				},
				set: (val)=>{
					smarts.setsmart(obj, property, val)
				}
			}
		},
		getsmartval(obj, property, defaultValue) {
			// get the value of a property path based off its type
			let target = smarts.getsmart(obj, property, defaultValue)
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
		mapsmart(list, keyProperty = 'title', returnExistant, populate) {
			return new Promise((resolve, reject) => {
				if (!keyProperty) {
					reject()
				} else if (list && typeof list.length == 'number') {
					if (list.length == 0) {
						if ((returnExistant && smarts.getsmart(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
							resolve(true)
						} else if (returnExistant) {
							resolve(false)
						} else {
							resolve()
						}
					}
					if (!list.mapped || typeof list.mapped === 'boolean') {
						if (smarts.getsmart(local.vue, 'reactiveSetter', false) && this.$set && list) {
							this.$set(list, 'mapped', {})
						} else {
							list['mapped'] = {}
						}
					}
					for (var i = 0; i < list.length; i++) {
						if (typeof list[i] !== 'string') {
							if (smarts.getsmart(local.vue, 'reactiveSetter', false) && this.$set && list.mapped) {
								this.$set(list.mapped, list[i][keyProperty], list[i])
							} else {
								list['mapped'][list[i][keyProperty]] = list[i]
							}
							if (i == list.length - 1) {
								if ((returnExistant && smarts.getsmart(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
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
						//       if((returnExistant && smarts.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
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
							if ((returnExistant && smarts.getsmart(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
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
			return smarts.getsmart(thing, 'properties.description', '')
		},
		getThing({
			option,
			list = smarts.getsmart(objList),
			obj = true,
			keys = ['uuid', '_id', 'id'],
			keymatchtype,
			strings,
			defaultValue = undefined,
			vue = vue
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
					if (typeof (obj1[p]) == 'undefined') return false
				}
				return true
			}
		}
	}

	return smarts
}
