(function(angular) {

	var module = angular.module('net.enzey.examples',
		[
			'net.enzey.autocomplete',
		]
	);

	var getPerms = function(datums) {
		var permArr = [];
		var usedChars = [];

		function permute(input) {
			var i, ch;
			for (i = 0; i < input.length; i++) {
				ch = input.splice(i, 1)[0];
				usedChars.push(ch);
				if (input.length == 0) {
					permArr.push(usedChars.slice());
				}
				permute(input);
				input.splice(i, 0, ch);
				usedChars.pop();
			}
			return permArr
		};

		return permute(datums);
	};

	module.controller('autoCompeteExample', function($scope, $timeout, $rootScope, $q) {
		var getWatchCount = function (scope, scopeHash) {
			// default for scopeHash
			if (scopeHash === undefined) {
				scopeHash = {};
			}

			// make sure scope is defined and we haven't already processed this scope
			if (!scope || scopeHash[scope.$id] !== undefined) {
				return 0;
			}

			var watchCount = 0;

			if (scope.$$watchers) {
				watchCount = scope.$$watchers.length;
			}
			scopeHash[scope.$id] = watchCount;

			// get the counts of children and sibling scopes
			// we only need childHead and nextSibling (not childTail or prevSibling)
			watchCount+= getWatchCount(scope.$$childHead, scopeHash);
			watchCount+= getWatchCount(scope.$$nextSibling, scopeHash);

			return watchCount;
		};
		var updateWatchCount;
		updateWatchCount = function() {
			$timeout(function() {
				$scope.watchCount = getWatchCount($rootScope);
				updateWatchCount();
			}, 3000, true);
		};
		updateWatchCount();

		$scope.col1Width = '12%';
		$scope.col2Width = '12%';

		var arrayOfStuff = ['fruit', 'fun', 'family', 'fudge', 'nonfrugal', 'nonliquid', 'nonunison', 'neckpiece', 'nonnitric', 'nastiness', 'novachord', 'nonsaline', 'nonchurch', 'narcotist', 'nucleolus', 'nonbodily', 'nonmucous', 'nondebtor', 'nursemaid', 'nepheline', 'nonsuccor', 'nebulated', 'norwegian', 'nachising'];
		var arrayOfObjs = [];
		arrayOfStuff.forEach(function(text) {
			arrayOfObjs.push({foo: {bar: text}});
		});
		$scope.searchFunction = function (inputText) {
			var deferredFn = $q.defer();
			if (!inputText || inputText.length < 1) {
				deferredFn.reject();
				return deferredFn.promise;
			}

			var regex = new RegExp('^' + inputText);
			var results = [];
			arrayOfStuff.forEach(function(text) {
				if (regex.test(text)) {results.push(text);}
			});

			deferredFn.resolve(results);
			return deferredFn.promise;
		};
		$scope.searchFunctionObjs = function (inputText) {
			var deferredFn = $q.defer();
			if (!inputText || inputText.length < 1) {
				deferredFn.reject();
				return deferredFn.promise;
			}

			$timeout(function() {
				var regex = new RegExp('^' + inputText);
				var results = [];
				arrayOfObjs.forEach(function(obj) {
					if (regex.test(obj.foo.bar)) {results.push(obj);}
				});

				deferredFn.resolve(results);
			}, 1000, false);

			return deferredFn.promise;
		}
		$scope.searchFunctionAnyLoc = function (inputText) {
			var deferredFn = $q.defer();
			if (!inputText || inputText.length < 1) {
				deferredFn.reject();
				return deferredFn.promise;
			}

			var regex = new RegExp(inputText);
			var results = [];
			arrayOfObjs.forEach(function(obj) {
				if (regex.test(obj.foo.bar)) {results.push(obj);}
			});

			deferredFn.resolve(results);
			return deferredFn.promise;
		}

		$scope.foo = 'some text';

		var count = 0;
		$scope.thingsArray = [];
		$scope.gridData = [];

			var data = getPerms(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
			data.forEach(function(permu) {
				var scopeVarName = permu.join('');
				count++;
				$scope[scopeVarName] = count;
				$scope.thingsArray.push(scopeVarName);

				var number = scopeVarName;
				number = number.replace('a', 1);
				number = number.replace('b', 2);
				number = number.replace('c', 3);
				number = number.replace('d', 4);
				number = number.replace('e', 5);
				number = number.replace('f', 6);
				number = number.replace('g', 7);
				$scope.gridData.push({
					name: scopeVarName,
					count: count,
					value: number,
					value1: number * 2,
					value2: number + 7,
					value3: number * 3,
					value4: number + 9
				});
			});

		$scope.currentTemplate = $scope.template2;
		$scope.setTemplate = function(template) {
			$scope.currentTemplate = template;
		};
		$scope.tableData = [
			{name: 'dsfg', value: 43654},
			{name: 'fhfdg', value: 678678},
			{name: 'ghjk', value: 789679},
			{name: 'jkl', value: 45363},
		];

		$scope.filterByName = function() {
			$scope.filter = 'true';
		};
		$scope.filterByNameRev = function() {
			$scope.filter = 'false';
		};
		
		$scope.addDataRow = function() {
			$scope.gridData.push({name: '46574657'});
		};
		$scope.editRow = function() {
			$scope.gridData[0].name = 5674567;
		};
	});

})(angular);