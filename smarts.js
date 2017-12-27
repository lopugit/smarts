module.exports = function({objList, stringList}={}){
  return {
    setThing: function ({option, list=this.getsmart(objList), obj, key='_id', keymatchtype, push, strings, targets}={}) {
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
    setThings: function ({options, list=this.getsmart(objList), obj, key='_id', keymatchtype, push}={}) {
      return new Promise((resolve, reject)=>{
        if(options && list) {
          for(let option of options){
            this.setThing({option, list, obj, key, keymatchtype, push})
          }
        }
        resolve()
      })
    },
    optIn: function (option, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
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
    thingIn: function ({option, list, obj, key='_id', keymatchtype, strings, retIndex}={}) {
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
    optsIn: function (options, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
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
    thingsIn: function ({options, list=this.getsmart(stringList), obj, key='_id', keymatchtype}={}) {
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
    anyOptsIn: function (options, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
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
    anyThingsIn: function ({options, list=this.getsmart(stringList), obj, key='_id', keymatchtype}={}) {
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
    optIndex: function (option, list=this.getsmart(stringList), obj, key='_id', keymatchtype) {
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
    thingIndex: function ({option, list, obj, key='_id', keymatchtype, strings}={}) {
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
    pushOpt: function (option, list=this.getsmart(stringList), obj, key='_id') {
      if (typeof list == 'object' && !this.optIn(option, list, obj, key)) {
        list.push(option)
      }
    },
    pushThing: function ({option, list=this.getsmart(stringList), obj, key='_id'}={}) {
      if (typeof list == 'object' && !this.optIn(option, list, obj, key)) {
        list.push(option)
      }
    },
    pushOpts: function (options, list=this.getsmart(stringList), obj, key='_id') {
      for (let option of options) {
        this.pushOpt(option, list, obj, key)
      }
    },
    pushThings: function ({options, list=this.getsmart(stringList), obj, key='_id'}={}) {
      for (let option of options) {
        this.pushOpt(option, list, obj, key)
      }
    },
    popOpt: function (option, list=this.getsmart(stringList), obj, key='_id') {
      if (typeof list == 'object' && this.optIn(option, list, obj, key)) {
        list.splice(this.optIndex(option, list, obj, key), 1)
      }
    },
    popThing: function ({option, list=this.getsmart(stringList), obj, key='_id'}={}) {
      if (typeof list == 'object' && this.optIn(option, list, obj, key)) {
        list.splice(this.optIndex(option, list, obj, key), 1)
      }
    },
    popOpts: function (options, list=this.getsmart(stringList), obj, key='_id') {
      for (let option of options) {
        this.popOpt(option, list, obj, key)
      }
    },
    popThings: function ({options, list=this.getsmart(stringList), obj, key='_id'}={}) {
      for (let option of options) {
        this.popOpt(option, list, obj, key)
      }
    },
    toggleOpt: function (option, list=this.getsmart(stringList), obj, key='_id') {
      if (this.optIn(option, list, obj, key)) {
        this.popOpt(option, list, obj, key)
      } else {
        this.pushOpt(option, list, obj, key)
      }
    },
    toggleThing: function ({option, list=this.getsmart(stringList), obj, key='_id'}={}) {
      if (this.optIn(option, list, obj, key)) {
        this.popOpt(option, list, obj, key)
      } else {
        this.pushOpt(option, list, obj, key)
      }
    },
    toggleOpts: function (options, list=this.getsmart(stringList), obj, key) {
      for (let option in options) {
        if (this.optIn(option, list, obj, key)) {
          this.popOpt(option, list, obj, key)
        } else {
          this.pushOpt(option, list, obj, key)
        }
      }
    },
    toggleThings: function ({options, list=this.getsmart(stringList), obj, key}={}) {
      for (let option in options) {
        if (this.optIn(option, list, obj, key)) {
          this.popOpt(option, list, obj, key)
        } else {
          this.pushOpt(option, list, obj, key)
        }
      }
    },
    ratchetOpt: function(option, list, obj, key){
    },
    getsmart: function (obj, property, defaultValue) {

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
          if (!propsArray || !obj) {
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
    setsmart: function(obj, property, value){
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
      var deepGetByArray = function (obj, propsArray, value) {
        if (propsArray.length === 1) {
          // If the path array has only 1 more element, we've reached
          // the intended property and set its value
          obj[propsArray[0]] = value
          return obj[propsArray[0]]
        } else if (obj === undefined || obj === null){
          // If we have reached an undefined/null property
          obj = {}
        }


          // Prepare our found property and path array for recursion
          var foundSoFar = obj[propsArray[0]];
          var remainingProps = propsArray.slice(1);

          return deepGetByArray(foundSoFar, remainingProps, value);
      };

      return deepGetByArray(obj, property, value)
    },
    safestring: function (something) {
      return this.jsmart.stringify(something || '')
    },
    safeparse: function (something) {
      return this.jsmart.parse(something || '')
    }
  }
}