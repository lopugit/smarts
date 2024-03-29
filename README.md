# smarts
a smart library for doing smart things

## Installation

```bash
npm i smarts
```

### Node

```javascript
var smarts = require('smarts')(arguments)

// string arrays
smarts.optIn('foo', []) // false
smarts.optIn('foo', ['foo']) // true

// obj arrays
smarts.thingIn({ value: 'foo' }, []) // false
smarts.thingIn({ value: 'foo' }, [{ value: 'foo' }]) // true

// more examples to come.... 
```

### Vue

```javascript

<script>
    import smarts from 'smarts'
    export default {
        mixins: [
            smarts({
                vue: true, 
                objList: 'this.someListOfObjects', // set this if you don't want to always enter the most commonly checked list of objects in your vue component, it doesn't matter if the list has both strings and objects
                stringList: 'this.someListOfStrings' // set this if you don't want to always enter the most commonly checked list of strings in your vue component, it doesn't matter if the list has both strings and objects
            })
        ],
        data {
            someListOfObjects: [
                { value: 'foo' }
            ],
            someListOfStrings: [
                'foo'
            ],
        },
        created(){
            // string arrays
            this.optIn('foo', []) // false
            this.optIn('foo', ['foo']) // true
            this.optIn('foo') // true because of the default list set, useful for component specific logic
            
            // obj arrays
            this.thingIn({ value: 'foo' }, []) // false
            this.thingIn({ value: 'foo' }, [{ value: 'foo' }]) // true
            this.thingIn({ value: 'foo' }) // true because of the default list set, useful for component specific logic

            // more examples to come.... 
        }
    }
</script>
```

# Change Log
## [1.0.267]
### Added
- Added vue.standalone option for use with store
## [1.0.266]
### Changed
- Added optional vue.Vue instance argument for Vue.set function and a vue.basePath argument for $store.commit
## [1.0.265]
### Changed
- Took out console logs in scoped Eval
## [1.0.262]
### Added
- Added a strip uuids function
## [1.0.261]
### Changed
- Made function parser take into account type property
## [1.0.260]
### Changed
- Switched Babel Core dependancy to Babel Standalone with Babel Template
## [1.0.259]
### Changed
- Fixed dist not publishing bug
## [1.0.258]
### Changed
- Fixed submodule publishing bug
## [1.0.257]
### Added
- Added a JavaScript compatible import version
## [1.0.256]
### Changed
- Fixed babel not defined issue
## [1.0.255]
### Changed
- Added clientSide argument to not load babel for fs requirement issue
## [1.0.254]
### Changed
- Removed dollar sign from js meta property 
## [1.0.253]
### Added
- fixed bug in loading where funcs did not retain uuid's 
## [1.0.252]
### Added
- fixed bug in loading where arrays did not retain uuid's 
## [1.0.251]
### Added
- fixed bug in loading where arrays that had been serialized were not loaded properly 
## [1.0.246-1.0.250]
### Added
- fixed bug in serialization where arrays were serialized recursively 
## [1.0.244]
### Added
- smarts.serialize now defaults opts.serializeArrayProps to true
## [1.0.243]
### Added
- smarts.stringify now supports serializing array with uuid into special meta-object
## [1.0.242]
### Added
- smarts.stringify now spreads any function properties when serializing
## [1.0.241]
### Added
- smarts.parse now has opts.noFunctions which will retain fn.js property instead of automatically parsing
## [1.0.240]
### Changed
- smarts.load now defaults to opts.strictFunctions = false