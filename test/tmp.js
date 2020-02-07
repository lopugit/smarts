export default function (babel) {
	
	const { types: t } = babel;
	
	let initScope = (uuid)=>{
		let node = babel.template.ast(`
			var uuid${uuid} = {
				$scope: {},
				$scoper: (func)=>{
					Object.defineProperty(
						func, 
						'$scopes', 
						{
							value: [uuid${uuid}.$scope]
						}
					)
					return func
				}
			}
		`)
		node.scoped = true
		return node
	}
	let scopeVar = (uuid, key)=>{
		let node = babel.template.ast(`
			Object.defineProperty(
				uuid${uuid}.$scope,
				${key},
				{
					get(){
						return ${key}
					},
					set(val){
						${key} = val
					}
				}
			)
		`)
		node.scoped = true
		return node
	}
	let functionWrapper = (uuid, path)=>{
		let wrapper = babel.template.ast(`
			uuid${uuid}.$scoper()
		`)
		wrapper.expression.arguments.push(path.node)
		return wrapper
	}

	let bodyInsert = function(index, body, ...things){
		body.splice(
			index,
			0,
			...things
		)
		return things.length
	}
	
	let ret =  {
		visitor: {
			Program(path){
				if(!path.node.scoped){
					let uuid = Math.round(Math.random()*1000000)
					let i = bodyInsert(
						0,
						path.node.body,
						initScope(uuid)
					)
					path.scope.uuid = uuid
				}
			},
			BlockStatement(path){
				if(!path.node.scoped){
					let uuid = Math.round(Math.random()*1000000)
					let i = bodyInsert(
						0,
						path.node.body,
						initScope(uuid)
					)
					path.scope.uuid = uuid
				}
			},
			Function(path){
				if(!path.node.scopeWrapped){
					path.node.scopeWrapped = true
					console.log('path', path)
					let uuid 
					try{ 
						uuid = path.state.context.scope.uuid
					} catch(err1){
						try {
							uuid = path.contexts[0].scope.uuid
						} catch(err2){console.error(err1,err2)}
					}
					let replacement = functionWrapper(uuid, path)
					path.replaceWith(
						replacement
					)
				}
			},
			VariableDeclaration(path){
				// console.log('pathhhh', path)
				if(!path.node.scoped){
					path.node.scoped = true
					let uuid = Math.round(Math.random()*1000000)
					path.insertAfter(
						// scopeVar(uuid, path.id.name)
					)
				}
			}
		}
	}
	return ret
}
