"function(a0765e2f5ad354264b76aa58cbe0b99f7){
						try {
							a0765e2f5ad354264b76aa58cbe0b99f7.$scopes = a0765e2f5ad354264b76aa58cbe0b99f7.val.$scopes && typeof a0765e2f5ad354264b76aa58cbe0b99f7.val.$scopes.reverse == 'function'
							if(a0765e2f5ad354264b76aa58cbe0b99f7.$scopes){
								for(a0765e2f5ad354264b76aa58cbe0b99f7.$scope of a0765e2f5ad354264b76aa58cbe0b99f7.val.$scopes.reverse()){
									if(a0765e2f5ad354264b76aa58cbe0b99f7.$scope != globalThis){
										for(a0765e2f5ad354264b76aa58cbe0b99f7.variableKey in a0765e2f5ad354264b76aa58cbe0b99f7.$scope){
											try {
												eval(
													`var ${a0765e2f5ad354264b76aa58cbe0b99f7.variableKey} = ${a0765e2f5ad354264b76aa58cbe0b99f7.$scope[a0765e2f5ad354264b76aa58cbe0b99f7.variableKey]};
													Object.defineProperty(
														a0765e2f5ad354264b76aa58cbe0b99f7.$scope, 
														${a0765e2f5ad354264b76aa58cbe0b99f7.variableKey}, 
														{
															get(){
																return ${a0765e2f5ad354264b76aa58cbe0b99f7.variableKey}
															},
															set(val){
																${a0765e2f5ad354264b76aa58cbe0b99f7.variableKey} = val
															},
															enumerable: true
														}
													)
												`)												
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
						a0765e2f5ad354264b76aa58cbe0b99f7.$scoper = function(b0765e2f5ad354264b76aa58cbe0b99f7){
							try {
								b0765e2f5ad354264b76aa58cbe0b99f7.ret = eval('('+b0765e2f5ad354264b76aa58cbe0b99f7.val.$js+')')
							} catch(err1){
								try {
									b0765e2f5ad354264b76aa58cbe0b99f7.ret = eval('({'+b0765e2f5ad354264b76aa58cbe0b99f7.val.$js+'})')
									b0765e2f5ad354264b76aa58cbe0b99f7.keys = Object.keys(b0765e2f5ad354264b76aa58cbe0b99f7.ret)
									b0765e2f5ad354264b76aa58cbe0b99f7.ret = b0765e2f5ad354264b76aa58cbe0b99f7.ret[b0765e2f5ad354264b76aa58cbe0b99f7.keys[0]]
								} catch(err2){
									try {
										b0765e2f5ad354264b76aa58cbe0b99f7.ret = eval('({b:'+ b0765e2f5ad354264b76aa58cbe0b99f7.val.$js +'})').b
									} catch(err3){
										console.error(err1)
										console.error(err2)
										console.error(err3)
									}
								}
							}
							return b0765e2f5ad354264b76aa58cbe0b99f7.ret
						}
						if(a0765e2f5ad354264b76aa58cbe0b99f7.$scopes){
							a0765e2f5ad354264b76aa58cbe0b99f7.val.$scoper = a0765e2f5ad354264b76aa58cbe0b99f7.$scoper
							return a0765e2f5ad354264b76aa58cbe0b99f7.val.$scoper
						}
						return a0765e2f5ad354264b76aa58cbe0b99f7.$scoper
					}"