module.exports = function({objList, stringList, reactiveSetter, vue}={}){
  return {
    setThing({option, list=this.getsmart(objList), obj, key='_id', keymatchtype, push, strings, targets}={}) {
      return new Promise((resolve, reject)=>{
        let index = this.thingIndex({option, list, obj, key, keymatchtype, strings})
        if(index >= 0 && list){
          if(targets){
            for(var i=0;i<targets.length;i++){
              let value = this.getsmart(option, targets[i], undefined)
              if(value){
                this.setsmart(list[index], targets[i], value)
              }
            }
          } else {
            list.splice(index, 1, option)
          }
          // list[index] = option
        } else if(push && list) {
          list.push(option)
          index = list.length-1
        }
        resolve(index)
      })
    },
    setThings({options, list=this.getsmart(objList), obj, key='_id', keymatchtype, push}={}) {
      return new Promise((resolve, reject)=>{
        if(options && list) {
          for(let option of options){
            this.setThing({option, list, obj, key, keymatchtype, push})
          }
        }
        resolve()
      })
    },
    optIn(option, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
      if(typeof option === 'object'){
        obj = true
      }
      if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
        return true
      } else if (obj && list) {
        for (var i=0; i < list.length; i++) {
          if(typeof key == 'object'){
            for(var indKey=0; indKey<key.length;indKey++){
              if(keymatchtype == 'broad'){
                if (list[i] && this.getsmart(list[i], key[indKey], undefined) == this.getsmart(option, key[indKey], undefined) && this.getsmart(list[i], key[indKey], undefined) !== undefined) {
                  return true
                } else if(list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, key[indKey], undefined) && this.getsmart(option, key[indKey], undefined) !== undefined){
                  return true
                }    
              } else {
                if (list[i] && this.getsmart(list[i], key[indKey], undefined) == this.getsmart(option, key[indKey], undefined) && this.getsmart(list[i], key[indKey], undefined) !== undefined) {
                  if(indKey == key.length-1){
                    return true
                  }
                } else if(list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, key[indKey], undefined) && this.getsmart(option, key[indKey], undefined) !== undefined){
                  if(indKey == key.length-1){
                    return true
                  }
                }   
              } 
            }
          } else {
            if (list[i] && this.getsmart(list[i], key, undefined) == this.getsmart(option, key, undefined) && this.getsmart(list[i], key, undefined) !== undefined) {
              return true
            }
          }
        }
      }
      return false
    },
    thingIn({option, list, obj, key='_id', keymatchtype, strings, retIndex}={}) {
      if(typeof option === 'object'){
        obj = true
      }
      if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
        if(retIndex){
          return list.indexOf(option)
        } else {
          return true
        }
      } else if (obj && list) {
        for (var i=0; i < list.length; i++) {
          if(typeof key == 'object'){
            for(var indKey=0; indKey<key.length;indKey++){
              if(keymatchtype == 'broad'){
                if (list[i] && this.getsmart(list[i], key[indKey], undefined) == this.getsmart(option, key[indKey], undefined) && this.getsmart(list[i], key[indKey], undefined) !== undefined) {
                  if(retIndex){
                    return i
                  } else {
                    return true
                  }
                } else if(list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, key[indKey], undefined) && this.getsmart(option, key[indKey], undefined) !== undefined){
                  if(retIndex){
                    return i
                  } else {
                    return true
                  }
                }    
              } else {
                if (list[i] && this.getsmart(list[i], key[indKey], undefined) == this.getsmart(option, key[indKey], undefined) && this.getsmart(list[i], key[indKey], undefined) !== undefined) {
                  if(indKey == key.length-1){
                    if(retIndex){
                      return i
                    } else {
                      return true
                    }
                  }
                } else if(list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, key[indKey], undefined) && this.getsmart(option, key[indKey], undefined) !== undefined){
                  if(indKey == key.length-1){
                    if(retIndex){
                      return i
                    } else {
                      return true
                    }
                  }
                }  
              } 
            }
          } else {
            if (list[i] && this.getsmart(list[i], key, undefined) == this.getsmart(option, key, undefined) && list[i][key] !== undefined) {
              if(retIndex){
                return i
              } else {
                return true
              }
            } else if(list[i] && typeof list[i] == 'string' && list[i] == this.getsmart(option, key, undefined) && this.getsmart(option, key, undefined) !== undefined){
              if(retIndex){
                return i
              } else {
                return true
              }
            }  
          }
        }
      }
      if(retIndex){
        return -1
      } else {
        return false
      }
    },
    optsIn(options, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          // return true
        } else if (obj && list) {
          for (var i=0; i < list.length; i++) {
            if(!this.optIn(option, list[i], obj, key, keymatchtype)){
              return false
            }
          }
        } else {
          return false
        }
      }
      return true
    },
    thingsIn({options, list=this.getsmart(stringList), obj, key='_id', keymatchtype}={}) {
      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          // return true
        } else if (obj && list) {
          for (var i=0; i < list.length; i++) {
            if(!this.optIn(option, list[i], obj, key, keymatchtype)){
              return false
            }
          }
        } else {
          return false
        }
      }
      return true
    },
    anyOptsIn(options, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          return true
        } else if (obj && list) {
          for (var i=0; i < list.length; i++) {
            if(this.optIn(option, list[i], obj, key, keymatchtype)){
              return true
            }
          }
        }
      }
      return false
    },
    anyThingsIn({options, list=this.getsmart(stringList), obj, key='_id', keymatchtype}={}) {
      for (let option of options) {
        // if(typeof option === 'object'){
        //   obj = true
        // }
        if (!obj && list && list.indexOf && list.indexOf(option) >= 0) {
          return true
        } else if (obj && list) {
          for (var i=0; i < list.length; i++) {
            if(this.optIn(option, list[i], obj, key, keymatchtype)){
              return true
            }
          }
        }
      }
      return false
    },
    optIndex(option, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
      if(typeof option === 'object'){
        obj = true
      }
      if (obj && list && key) {
        for (var i=0; i < list.length; i++) {
          if(this.optIn(option, list, obj, key, keymatchtype)){
            return i
          }
        }
      } else if(list) {
        return list.indexOf(option)
      }
      return -1
    },
    thingIndex({option, list, obj, key='_id', keymatchtype, strings}={}) {
      if(typeof option === 'object'){
        obj = true
      }
      if (obj && list && key) {
        let index = this.thingIn({option, list, obj, key, keymatchtype, strings, retIndex: true})
        return index
      } else if(list) {
        return list.indexOf(option)
      }
      return -1
    },
    pushOpt(option, list=this.getsmart(stringList), obj, key='_id') {
      if (typeof list == 'object' && !this.optIn(option, list, obj, key)) {
        list.push(option)
      }
    },
    pushThing({option, list=this.getsmart(stringList), obj, key='_id'}={}) {
      if (typeof list == 'object' && !this.optIn(option, list, obj, key)) {
        list.push(option)
      }
    },
    pushOpts(options, list=this.getsmart(stringList), obj, key='_id') {
      for (let option of options) {
        this.pushOpt(option, list, obj, key)
      }
    },
    pushThings({options, list=this.getsmart(stringList), obj, key='_id'}={}) {
      for (let option of options) {
        this.pushOpt(option, list, obj, key)
      }
    },
    popOpt(option, list=this.getsmart(stringList), obj, key='_id') {
      if (typeof list == 'object' && this.optIn(option, list, obj, key)) {
        list.splice(this.optIndex(option, list, obj, key), 1)
      }
    },
    popThing({option, list=this.getsmart(stringList), obj, key='_id'}={}) {
      if (typeof list == 'object' && this.optIn(option, list, obj, key)) {
        list.splice(this.optIndex(option, list, obj, key), 1)
      }
    },
    popOpts(options, list=this.getsmart(stringList), obj, key='_id') {
      for (let option of options) {
        this.popOpt(option, list, obj, key)
      }
    },
    popThings({options, list=this.getsmart(stringList), obj, key='_id'}={}) {
      for (let option of options) {
        this.popOpt(option, list, obj, key)
      }
    },
    toggleOpt(option, list=this.getsmart(stringList), obj, key='_id') {
      if (this.optIn(option, list, obj, key)) {
        this.popOpt(option, list, obj, key)
      } else {
        this.pushOpt(option, list, obj, key)
      }
    },
    toggleThing({option, list=this.getsmart(stringList), obj, key='_id'}={}) {
      if (this.optIn(option, list, obj, key)) {
        this.popOpt(option, list, obj, key)
      } else {
        this.pushOpt(option, list, obj, key)
      }
    },
    toggleOpts(options, list=this.getsmart(stringList), obj, key) {
      for (let option in options) {
        this.toggleOpt(option, list, obj, key)
      }
    },
    toggleThings({options, list=this.getsmart(stringList), obj, key}={}) {
      for (let option in options) {
        if (this.optIn(option, list, obj, key)) {
          this.popOpt(option, list, obj, key)
        } else {
          this.pushOpt(option, list, obj, key)
        }
      }
    },
    ratchetOpt(option, list, obj, key){
    },
    getsmart(obj, property, defaultValue) {

      if(!property && typeof obj == 'string'){
        property = obj.split(".")
        obj = eval(property[0])
        property = property.slice(1, property.length)
      }
      // If the property list is in dot notation, convert to array
      if (typeof property == "string") {
          property = property.split(".");
      }

      // In order to avoid constantly checking the type of the property
      // we separate the real logic out into an inner function.
      var deepGetByArray = function (obj, propsArray, defaultValue) {
          // If we have reached an undefined/null property
          // then stop executing and return the default value.
          // If no default was provided it will be undefined.
          if (!propsArray || (!obj && !(obj == 0 || obj == ''))) {
              return defaultValue;
          }

          // If the path array has no more elements, we've reached
          // the intended property and return its value
          if (propsArray.length === 0) {
              return obj;
          }

          // Prepare our found property and path array for recursion
          var nextObj = obj[propsArray[0]];
          var remainingProps = propsArray.slice(1);

          return deepGetByArray(nextObj, remainingProps, defaultValue);
      };

      return deepGetByArray(obj, property, defaultValue);
    },
    setsmart(obj, property, value){
      if(!property && typeof obj == 'string'){
        property = obj.split(".")
        obj = eval(property[0])
        property = property.slice(1, property.length)
      }
      // If the property list is in dot notation, convert to array
      if (typeof property == "string") {
          property = property.split(".");
      }

      // switch contexts
      var that = this
      // In order to avoid constantly checking the type of the property
      // we separate the real logic out into an inner function.
      var deepGetByArray = function (obj, propsArray, value) {
        
        // Prepare nextProperty
        var nextProperty = obj[propsArray[0]]
        // If the path array has only 1 more element, we've reached
        // the intended property and set its value
        if (propsArray.length == 1) {
          if(!nextProperty && that.getsmart(vue, 'reactiveSetter', false) && that.getsmart(vue, 'vm.$set', false)){
            vue.vm.$set(obj, propsArray[0], value)
          } else {
            obj[propsArray[0]] = value
          }
          return obj[propsArray[0]]
        }
        // Prepare our path array for recursion
        var remainingProps = propsArray.slice(1)
        if (nextProperty == undefined || nextProperty == null){
          // If we have reached an undefined/null property
          if(that.getsmart(vue, 'reactiveSetter', false) && that.getsmart(vue, 'vm.$set', false)){
            vue.vm.$set(obj, propsArray[0], {})
          } else {
            obj[propsArray[0]] = {}
          }
        }
        
        return deepGetByArray(nextProperty, remainingProps, value)
      }

      return deepGetByArray(obj, property, value)
    },
    gosmart(obj, property, value){
      // stands for get or set smart
      return this.setsmart(obj, property, this.getsmart(obj, property, value))
    },
    getsmartvalue(obj, property, defaultValue){
      
    },
    safestring(something) {
      return this.jsmart.stringify(something || '')
    },
    safeparse(something) {
      return this.jsmart.parse(something || '')
    }
  }
}