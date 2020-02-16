function anonymous() {
	try {
		let uuidd01b52785e864e5991a69a8fe654c720 = uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0]['uuidd01b52785e864e5991a69a8fe654c720'];
		Object.defineProperty(uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0], uuidd01b52785e864e5991a69a8fe654c720, {
			get() {
				return uuidd01b52785e864e5991a69a8fe654c720;
			},

			set(val) {
				uuidd01b52785e864e5991a69a8fe654c720 = val;
			}

		});
		var $state = uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0]['$state'];
		Object.defineProperty(uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0], $state, {
			get() {
				return $state;
			},

			set(val) {
				$state = val;
			}

		});
		let json = uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0]['json'];
		Object.defineProperty(uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0], json, {
			get() {
				return json;
			},

			set(val) {
				json = val;
			}

		});
		let foo = uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0]['foo'];
		Object.defineProperty(uuid7635290234c54336b0a7390c16cfb5a1.val.$scopes[0], foo, {
			get() {
				return foo;
			},

			set(val) {
				foo = val;
			}

		});

		try {
			return function scopedEval(uuid7635290234c54336b0a7390c16cfb5a1) {
				if (typeof uuid7635290234c54336b0a7390c16cfb5a1 == 'string') {
					uuid7635290234c54336b0a7390c16cfb5a1 = {
						val: {
							$js: uuid7635290234c54336b0a7390c16cfb5a1
						}
					};
				} else if (typeof uuid7635290234c54336b0a7390c16cfb5a1 == 'function' && typeof uuid7635290234c54336b0a7390c16cfb5a1.toString == 'function') {
					uuid7635290234c54336b0a7390c16cfb5a1 = {
						val: {
							$js: uuid7635290234c54336b0a7390c16cfb5a1.toString()
						}
					};
				}

				try {
					uuid7635290234c54336b0a7390c16cfb5a1.ret = eval('(' + uuid7635290234c54336b0a7390c16cfb5a1.val.$js + ')');
				} catch (err1) {
					try {
						uuid7635290234c54336b0a7390c16cfb5a1.ret = eval('({' + uuid7635290234c54336b0a7390c16cfb5a1.val.$js + '})');
						uuid7635290234c54336b0a7390c16cfb5a1.keys = Object.keys(uuid7635290234c54336b0a7390c16cfb5a1.ret);
						uuid7635290234c54336b0a7390c16cfb5a1.ret = uuid7635290234c54336b0a7390c16cfb5a1.ret[uuid7635290234c54336b0a7390c16cfb5a1.keys[0]];
					} catch (err2) {
						try {
							uuid7635290234c54336b0a7390c16cfb5a1.ret = eval('({b:' + uuid7635290234c54336b0a7390c16cfb5a1.val.$js + '})').b;
						} catch (err3) {
							console.error(err1);
							console.error(err2);
							console.error(err3);
						}
					}
				}

				return uuid7635290234c54336b0a7390c16cfb5a1.ret;
			};
		} catch (err) {}
	} catch (err) {}
}