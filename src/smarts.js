let f = require('flatted')
let merge = require('deepmerge')
module.exports = ({
  objList,
  stringList,
  reactiveSetter,
  vue
} = {}) => {
	let local = {
		objList,
		stringList,
		reactiveSetter,
		vue
	}
  return {
		stringify(obj, supplemental){
			return f.stringify(obj, supplemental || this.stringifyFunc)
		},
		parse(string, supplemental){
			return f.parse(string, supplemental || this.parseFunc)
		},
		stringifyFunc(key, val){
			if (
				val instanceof Function && 
				typeof val.toString === 'function'
			){
				return "Function " + val.toString()
			} else if (
				val instanceof RegExp &&
				typeof val.toString === 'function'
			) {
				return "RegExp " + val.toString()
			}
			return val
		},
		parseFunc(key, val){
			if (
				typeof val === 'string'
			){
				if(
					val.indexOf('Function ') == 0 
					// ||
					// val[val.length-1] == '}' && 
					// ( 
					// 	val.slice(0,8) === 'function' || 
					// 	val.slice(0,2) === '()' || 
					// 	val.slice(0,5) === 'async'
					// ) 
				) {
					let ret = val
					try {
						ret = eval("("+val.split('Function ')[1]+")")
					} catch(err){
	
					}
					return ret
				} else if (
					val.indexOf('RegExp ') == 0
				) {
					let ret = val
					try {
						var regex = val.split('RegExp ')[1].match(/\/(.*)\/(.*)?/);
						ret = new RegExp(regex[1], regex[2] || "")
					} catch(err){

					}
					return ret
				}
			}
			return val
		},	
		dupe(obj){
			return f.parse(f.stringify(obj))
		},
		schema(obj1, obj2, opts){
			return Object.assign(
				obj1, 
				merge(obj2, obj1, opts || {
					arrayMerge: function (store, saved) { return saved },
					clone: true,
				})
			)		
		},
		merge(obj1, obj2, opts){
			return Object.assign(
				obj1, 
				merge(obj1, obj2, opts || {
					arrayMerge: function (store, saved) { return saved },
					clone: true,
				})
			)
		},
		mod(args, mod){
			return mod(args) || args
		},
    popThing({
      option,
      list = this.getsmart(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      defaultValue = undefined,
      vue = vue
    } = {}) {
      if (typeof list == 'object' && this.thingIn({
          option,
          list,
          obj,
          keys,
          keymatchtype
        })) {
        return list[this.thingIndex({
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
      list = this.getsmart(objList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      push,
      strings,
      targets,
      vue = vue
    } = {}) {
			let index = this.thingIndex({
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
						let value = this.getsmart(option, targets[i], undefined)
						if (value) {
							this.setsmart(list[index], targets[i], value)
						}
					}
				} else {
					list.splice(index, 1, option)
					if (this.getsmart(local.vue, 'reactiveSetter', false) && this.$set) {
						if(!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('thing')
						}
					} else if (this.getsmart(local.vue, 'store', false) && !localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
					}
				}
				// list[index] = option
			} else if (push && list) {
				if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
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
      list = this.getsmart(objList),
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
							this.setThing({
								option,
								list,
								obj,
								keys,
								keymatchtype,
								push
							})
						})
					} else {
						this.setThing({
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
    optIn(option, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
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
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && (this.getsmart(list[i], keys[indKey], undefined) !== undefined)) {
                return index ? i : true
              } else if (list[i] && typeof list[i] == 'string' && (list[i] == this.getsmart(option, keys[indKey], undefined)) && (this.getsmart(option, keys[indKey], undefined) !== undefined)) {
                return index ? i : true
              }
            } else {
              if (list[i] && (this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined)) && (this.getsmart(list[i], keys[indKey], undefined) !== undefined)) {
                if (indKey == keys.length - 1) {
                  return index ? i : true
                }
              } else if (list[i] && typeof list[i] == 'string' && (list[i] == this.getsmart(option, keys[indKey], undefined)) && (this.getsmart(option, keys[indKey], undefined) !== undefined)) {
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
      list = this.getsmart(objList),
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
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && this.getsmart(list[i], keys[indKey], undefined) !== undefined) {
                if (retIndex) {
                  return i
                } else {
                  return true
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, keys[indKey], undefined) && this.getsmart(option, keys[indKey], undefined) !== undefined) {
                if (retIndex) {
                  return i
                } else {
                  return true
                }
              }
            } else {
              if (list[i] && this.getsmart(list[i], keys[indKey], undefined) == this.getsmart(option, keys[indKey], undefined) && this.getsmart(list[i], keys[indKey], undefined) !== undefined) {
                if (indKey == keys.length - 1) {
                  if (retIndex) {
                    return i
                  } else {
                    return true
                  }
                }
              } else if (list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, keys[indKey], undefined) && this.getsmart(option, keys[indKey], undefined) !== undefined) {
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
    optsIn(options, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return true
      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          // return true
        } else if (obj && list) {
          for (var i = 0; i < list.length; i++) {
            if (!this.optIn(option, list[i], obj, keys, keymatchtype)) {
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
      list = this.getsmart(stringList),
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
            if (!this.optIn(option, list[i], obj, keys, keymatchtype)) {
              return false
            }
          }
        } else {
          return false
        }
      }
      return true
    },
    anyOptsIn(options, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return false
      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          return true
        } else if (obj && list && typeof list.length == 'number') {
          for (var i = 0; i < list.length; i++) {
            if (this.optIn(option, list[i], obj, keys, keymatchtype)) {
              return true
            }
          }
        }
      }
      return false
    },
    anyThingsIn({
      options,
      list = this.getsmart(stringList),
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
            if (this.optIn(option, list[i], obj, keys, keymatchtype)) {
              return true
            }
          }
        }
      }
      return false
    },
    optIndex(option, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (typeof option === 'object') {
        obj = true
      }
      if (obj && list && keys && typeof list.length == 'number') {
        for (var i = 0; i < list.length; i++) {
          if (this.optIn(option, list, obj, keys, keymatchtype)) {
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
        let index = this.thingIn({
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
    pushOpt(option, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype, index) {
      if (typeof list == 'object' && !this.optIn(option, list, obj, keys, keymatchtype)) {
				if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
					}
				} else {
					list.push(option)
				}
			}
			return index ? this.optIn(option, list, obj, keys, keymatchtype, index) : this.optIn(option, list, obj, keys, keymatchtype, index)
    },
    pushThing({
      option,
      list = this.getsmart(stringList),
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (typeof list == 'object' && !this.thingIn({option, list, obj, keys, keymatchtype})) {
				if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
					list.splice(list.length, 0, option)
					if(!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
					}
				} else {
					list.push(option)
				}
      }
    },
    pushOpts(options, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
      for (let option of options) {
        this.pushOpt(option, list, obj, keys, keymatchtype)
      }
    },
    pushThings({
      options,
      list = this.getsmart(stringList),
      obj,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
			if(!(options instanceof Array)) return
      for (let option of options) {
        this.pushThing({option, list, obj, keys, keymatchtype})
      }
    },
    popOpt(option, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (typeof list == 'object' && this.optIn(option, list, obj, keys, keymatchtype)) {
				list.splice(this.optIndex(option, list, obj, keys, keymatchtype), 1)
				if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
					if(!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
					}
				}      
			}
    },
    popThing({
      option,
      list = this.getsmart(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (typeof list == 'object' && this.thingIn({
          option,
          list,
          obj,
          keys,
          keymatchtype
        })) {
        list.splice(this.thingIndex({
          option,
          list,
          obj,
          keys,
          keymatchtype
				}), 1)
				if (this.getsmart(local.vue, 'reactiveSetter', false) || this.getsmart(local.vue, 'store', false)) {
					if(!localStorage.getItem('vuexWriteLock') && typeof this.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
					}
				} 
      }
    },
    popOpts(options, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
      for (let option of options) {
        this.popOpt(option, list, obj, keys, keymatchtype)
      }
    },
    popThings({
      options,
      list = this.getsmart(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
			if(!(options instanceof Array)) return
      for (let option of options) {
        this.popOpt(option, list, obj, keys, keymatchtype)
      }
    },
    toggleOpt(option, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      if (this.optIn(option, list, obj, keys, keymatchtype)) {
        this.popOpt(option, list, obj, keys, keymatchtype)
      } else {
        this.pushOpt(option, list, obj, keys, keymatchtype)
      }
    },
    toggleThing({
      option,
      list = this.getsmart(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
      if (this.optIn(option, list, obj, keys, keymatchtype)) {
        this.popOpt(option, list, obj, keys, keymatchtype)
      } else {
        this.pushOpt(option, list, obj, keys, keymatchtype)
      }
    },
    toggleOpts(options, list = this.getsmart(stringList), obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
			if(!(options instanceof Array)) return
      for (let option in options) {
        this.toggleOpt(option, list, obj, keys, keymatchtype)
      }
    },
    toggleThings({
      options,
      list = this.getsmart(stringList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      vue = vue
    } = {}) {
			if(!(options instanceof Array)) return
      for (let option in options) {
        if (this.optIn(option, list, obj, keys, keymatchtype)) {
          this.popOpt(option, list, obj, keys, keymatchtype)
        } else {
          this.pushOpt(option, list, obj, keys, keymatchtype)
        }
      }
    },
    // no use right now
    ratchetOpt(option, list, obj, keys = ['uuid', '_id', 'id'], keymatchtype) {
      // find(obj, property, equals){
      // 	if(this.getsmart(obj, 'constructor', undefined) == Array){
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
        property = property.split(".");
      } else if (this.getsmart(property, 'constructor', false) !== Array) {
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
        var nextObj = obj[propsArray[0]];
        var remainingProps = propsArray.slice(1);

        return deepGetByArray(nextObj, remainingProps, defaultValue);
      };
      return deepGetByArray(obj, property, defaultValue);
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
        property = property.split(".");
      } else if (this.getsmart(property, 'constructor', false) !== Array) {
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
      var that = this
      // In order to avoid constantly checking the type of the property
      // we separate the real logic out into an inner function.
      var deepGetByArray = function (obj, propsArray, value) {

        // If the path array has only 1 more element, we've reached
        // the intended property and set its value
        if (propsArray.length == 1) {
          if (that.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
						that.$set(obj, propsArray[0], value)
						if(typeof that.getsmart(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('thing')
						}
					} else {
						obj[propsArray[0]] = value
						if(that.getsmart(vue, 'store', false) && typeof that.getsmart(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('thing')
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
          if (that.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
						that.$set(obj, propsArray[0], {})
						if(typeof that.getsmart(window, '$store.commit', undefined) == 'function'){
							window.$store.commit('thing')
						}
          } else {
						obj[propsArray[0]] = {}
						if(that.getsmart(vue, 'store', false) && typeof that.getsmart(window, '$store.commit', undefined) == 'function'){ 
							window.$store.commit('thing')
						}
          }
				}
				return deepGetByArray(obj[propsArray[0]], remainingProps, value)
      }
      if (property) {
        return deepGetByArray(obj, property, value)
      } else {
        if (that.getsmart(vue, 'reactiveSetter', false) && that.$set && obj) {
					that.$set(obj, undefined, value)
					if(typeof that.getsmart(window, '$store.commit', undefined) == 'function'){
						window.$store.commit('thing')
					}
        } else {
					obj = value
					if(that.getsmart(vue, 'store', false) && typeof that.getsmart(window, '$store.commit', undefined) == 'function'){ 
						window.$store.commit('thing')
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
      var get = this.getsmart(obj, property, value, true)
      if (get.undefined) {
        get = this.setsmart(obj, property, get.value, context)
      }
      // return value from property path, either gotten or smartly set
      if (context) {
        return get
      } else {
        return this.getsmart(get, 'value', get)
      }
    },
    vgosmart(obj, property, value, context) {
			// stands for v-model get or set smart
      // return value from property path, either gotten or smartly set
			return {
				get: ()=>{
					var get = this.getsmart(obj, property, value, true)
					if (get.undefined) {
						get = this.setsmart(obj, property, get.value, context)
					}
					if (context) {
						return get
					} else {
						return this.getsmart(get, 'value', get)
					}
				},
				set: (val)=>{
					this.setsmart(obj, property, val)
				}
			}
    },
    getsmartval(obj, property, defaultValue) {
      // get the value of a property path based off its type
      let target = this.getsmart(obj, property, defaultValue)
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
      return this.jsmart.stringify(something || '')
    },
    safeparse(something) {
      return this.jsmart.parse(something || '')
    },
    mapsmart(list, keyProperty = 'title', returnExistant, populate) {
      return new Promise((resolve, reject) => {
        if (!keyProperty) {
          reject()
        } else if (list && typeof list.length == 'number') {
          if (list.length == 0) {
            if ((returnExistant && this.getsmart(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
              resolve(true)
            } else if (returnExistant) {
              resolve(false)
            } else {
              resolve()
            }
          }
          if (!list.mapped || typeof list.mapped === 'boolean') {
            if (this.getsmart(local.vue, 'reactiveSetter', false) && this.$set && list) {
              this.$set(list, 'mapped', {})
            } else {
              list['mapped'] = {}
            }
					}
          for (var i = 0; i < list.length; i++) {
            if (typeof list[i] !== 'string') {
              if (this.getsmart(local.vue, 'reactiveSetter', false) && this.$set && list.mapped) {
                this.$set(list.mapped, list[i][keyProperty], list[i])
              } else {
                list['mapped'][list[i][keyProperty]] = list[i]
              }
              if (i == list.length - 1) {
                if ((returnExistant && this.getsmart(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
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
            //   this.getThing({
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
            //       if((returnExistant && this.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
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
              if ((returnExistant && this.getsmart(list, 'mapped.' + returnExistant, false)) || !returnExistant) {
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
      return this.getsmart(thing, 'properties.description', '')
    },
    getThing({
      option,
      list = this.getsmart(objList),
      obj = true,
      keys = ['uuid', '_id', 'id'],
      keymatchtype,
      strings,
      defaultValue = undefined,
      vue = vue
    } = {}) {
      var index = this.thingIn({
        ...arguments[0],
        retIndex: true
      })
      if (index >= 0) {
        return list[index]
      } else {
        return defaultValue
      }
    },
		equal(obj1, obj2){
			if((obj1 && obj2) && (typeof obj1 == 'object') && (typeof obj2 == 'object')){
				//Loop through properties in object 1
				for (var p in obj1) {
					//Check property exists on both objects
					if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
			 
					switch (typeof (obj1[p])) {
						//Deep compare objects
						case 'object':
							if (!this.equal(obj1[p], obj2[p])) return false;
							break;
						//Compare function code
						case 'function':
							if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
							break;
						//Compare values
						default:
							if (obj1[p] != obj2[p]) return false;
					}
				}
			 
				//Check object 2 for any extra properties
				for (var p in obj2) {
					if (typeof (obj1[p]) == 'undefined') return false;
				}
				return true;
			}
		}
	}
}