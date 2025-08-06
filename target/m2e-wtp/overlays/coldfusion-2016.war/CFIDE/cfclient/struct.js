function duplicate(structVar)
{
	_validateParameters(duplicate.arguments.length, 1, "duplicate");
	
	if(structVar == null || "object" != typeof structVar)
		return structVar;
	else
	{
		return _cf_duplicate(structVar, {});
	}
}

function _cf_duplicate(structVar, refCache)
{
	if(structVar in refCache)
		return refCache[structVar];
	else
	{
		if(structVar == null || "object" != typeof structVar)
			return structVar;
		else
		{
			var copy = new Object();
			if (structVar instanceof Array) 
			{
				for (var i=0; i< structVar.length; i++) 
				{				
					copy[i+1] = _cf_duplicate(structVar[i],refCache);
				}
			
			}
			else 
			{
			
				for (var item in structVar) 
				{
					if (structVar.hasOwnProperty(item)) 
						copy[item] = _cf_duplicate(structVar[item],refCache);
				}
			}
			
			refCache[structVar] = copy;
			return copy;
		}
	}
}

function isStruct(structVar)
{
	_validateParameters(isStruct.arguments.length, 1, "isStruct");
	
	return ("object" == typeof structVar);
	
}

function structAppend(struct1, struct2, overwriteFlag)
{
	_validateParameters(structAppend.arguments.length, 2, "structAppend");
	
	var overwrite = true;
	if(overwriteFlag != null)
		overwrite = overwriteFlag;
		
	for(var item in struct2)
	{
		if (struct2.hasOwnProperty(item)) 
		{
			if (item in struct1) 
			{
				if (overwrite) 
					struct1[item] = struct2[item];
			}
			else 
				struct1[item] = struct2[item];
		}
			
	}
	return true;
}

function structClear(structVar)
{
	_validateParameters(structClear.arguments.length, 1, "structClear");
	
    for (var prop in structVar) 
    {
        if (structVar.hasOwnProperty(prop)) 
        {
            delete structVar[prop];
        }
    }
	
	return true;
}

function structCopy(structVar)
{
	_validateParameters(structCopy.arguments.length, 1, "structCopy");
	
	if(structVar == null)
		throw new IllegalArgumentException();
	else
	{
		var copy = new Object();
		
		//TODO clone array variables
        for (var item in structVar) 
        {
            if (structVar.hasOwnProperty(item)) 
                copy[item] = structVar[item];
        }
		
		return copy;
	}
}

function structCount(structVar)
{
	_validateParameters(structCount.arguments.length, 1, "structCount");
	
	if(structVar == null)
		throw new IllegalArgumentException();
	else
	{
		var count = 0;
        for (var item in structVar) 
        {
            if (structVar.hasOwnProperty(item)) 
                count++;
        }
		
		return count;
	}
}

function structFind(structVar, key)
{
	_validateParameters(structFind.arguments.length, 2, "structFind");
	
	if(structVar == null)
		throw new IllegalArgumentException();
	
	if(key in structVar)
		return structVar[key];	
	else
		throw "Cannot find "+key+" in structure";
}

function structFindKey(top, value, scope)
{
	_validateParameters(structFindKey.arguments.length, 2, "structFindKey");
	
	if(top == null)
		throw new IllegalArgumentException();
	
	if("undefined" == typeof scope)
		var scope = "one";	
		
	if(scope.toLowerCase() != "all" && scope.toLowerCase() != "one")
		throw "Invalid Scope "+scope;
		
	var resultArray = [];
	var index = 0;
	
	_structFindKey(top,value,scope.toLowerCase(),resultArray,"",index);
	
	function _structFindKey(top, value, scope, resultArray, path, index)
	{	
		var result = null;
		
		if(index == 1 && scope != "all")
			return index;
			
		if("object" == typeof top)
		{
			for (var item in top) 
			{
				if (item == value) 
				{
					result = new Object();
					result.value = top[item];
					result.path = path + "." + item;
					result.owner = top;
					resultArray[index] = result;
					index++;
					
				}
				else 
					index = _structFindKey(top[item], value, scope, resultArray, path + "." + item, index);
					
				if(index == 1 && scope != "all")
						return index;
			}
		}
		
		return index;
		
	}
	
	return resultArray;	
}

function structFindValue(top, value, scope)
{
	_validateParameters(structFindValue.arguments.length, 2, "structFindValue");
	
	if(top == null)
		throw new IllegalArgumentException();
		
	if("undefined" == typeof scope)
		var scope = "one";	
	
	var resultArray = [];
	var index = 0;
	
	_structFindValue(top,value,scope,resultArray,"",index);
	
	function _structFindValue(top, value, scope, resultArray, path, index)
	{	
		var result = null;
		if(index == 1 && scope != "all")
			return index;
			
		if("object" == typeof top)
		{
			for (var item in top) 
			{
				if (top[item] == value) 
				{
					result = new Object();
					result.path = path + "." + item;
					result.owner = top;
					result.key = item;
					resultArray[index] = result;
					index++;
				}
				else 
					index = _structFindValue(top[item], value, scope, resultArray, path + "." + item, index);
			}
		}
		
		return index;
		
	}
	
	return resultArray;
	
}

function structGet(path)
{
	_validateParameters(structGet.arguments.length, 1, "structGet");
	
	if(path == "" || typeof path == "undefined")
		throw "Invalid Path";
		
	var keys = path.split(".");
	
	var pathStr = "";
	var mainObj = null;
	for(var key in keys)
	{		
		pathStr = keys[key];
		if(mainObj === null)
		{
			if(typeof window[pathStr] === "undefined")
				window[pathStr]= new Object();
				
			mainObj = window[pathStr];
		}
		else
		{
			mainObj[pathStr] = new Object();
			mainObj = mainObj[pathStr];
		}		
		
	}
	
	return mainObj;
}

function structKeyArray(structVar)
{
	_validateParameters(structKeyArray.arguments.length, 1, "structKeyArray");
	
	if (structVar != null) 
	{
		var returnArray = new Array();
		var index = 0;
		
		for(var key in structVar)
		{
			if (structVar.hasOwnProperty(key)) 
			{
				returnArray[index] = key;
				index++;
			}
		}	
		
		return returnArray;
		
	}
	else
		throw new IllegalArgumentException();
}

function structKeyList(structVar, delim)
{
	_validateParameters(structKeyList.arguments.length, 1, "structKeyList");
    var result = "";
    
    if (typeof delim == 'undefined') 
        delim = ",";
    
    var isFirst = true;
	var isArr = isArray(structVar);
    for (var key in structVar) 
    {
		if (structVar.hasOwnProperty(key)) 
		{
			key = __$cf.__incrNum(key,isArr);//adjust key
			if (!isFirst) 
				result += delim;
			else 
				isFirst = false;
			
			result += key;
		}
    }
    
    return result;
}

function structNew()
{
	return new Object();
}

function structKeyExists(structVar, key)
{
	_validateParameters(structKeyExists.arguments.length, 2, "structKeyExists");
	
	if(structVar == null)
		return false;
	
    if (key in structVar) 
        return true;
    else 
        return false;
}

function structDelete(structVar, key, indicateNotExisting )
{
	_validateParameters(structDelete.arguments.length, 2, "structDelete");
	
	if (key in structVar) 
	{
		delete structVar[key];
		return true;
	}
	
	if(indicateNotExisting != null && indicateNotExisting)
		return false;
	else
		return true;
}

function structInsert(structVar, key1, value, allowOverwrite)
{
	_validateParameters(structInsert.arguments.length, 3, "structInsert");
	
	var overwrite = true;
	if(allowOverwrite != null)
		overwrite = allowOverwrite;
		
	var key = key1;
		
	if(key in structVar)
	{
		if(overwrite)
			structVar[key] = value;
		else
			throw "Key already Exists";
	}
	else
	{
		structVar[key] = value;
	}
	
	return true;
}

function structIsEmpty(structVar)
{
	_validateParameters(structIsEmpty.arguments.length, 1, "structIsEmpty");
	
	if(structVar != null)
	{
		if (!Object.keys) 
		{
	    	Object.keys = function (obj) 
			{
	       	 	var keys = [], k;
	        	for (var k in obj) 
				{
	            	if (Object.prototype.hasOwnProperty.call(obj, k)) 
					{
	                	keys.push(k);
					}
	        	}
	        return keys;
	    	};
		}
		
		var count = Object.keys(structVar).length;
		
		return (count == 0);
	}
	else
		throw new IllegalArgumentException();
	
}

function structSort(base, sortType, sortOrder, pathToSubElement, localeSensitive)
{
	_validateParameters(structSort.arguments.length, 1, "structSort");
	if(base == null)
		throw new IllegalArgumentException();
		
	if("undefined" == typeof sortType)
		var sortType = "text";
		
	if("undefined" == typeof sortOrder)
		var sortOrder = "asc";
		
	if("undefined" == typeof localeSensitive)
		var localeSensitive = false;
		
	if(structCount(base) == 0)
		return new Array();
		
	var value_arr = new Array();
	var value_map = new Object();
	var value_arr_index = 0;
		
	//create array of values to sort
	for(var key in base)
	{
		if (base.hasOwnProperty(key)) 
		{
			var keyName = key;
			var value = base[key];
			if(typeof pathToSubElement != "undefined")
			{
				var keys = pathToSubElement.split(".");
				for(item in keys)
				{
					value =  value[keys[item]];
				}
			}
			
			var arr = value_map[value];
			
			if (arr == null) 
			{
				arr = new Array();
				value_arr[value_arr_index] = value;
				value_arr_index++;
				value_map[value] = arr;
			}
			
			var index = arr.length;
			arr[index] = key;
		}
	}
	
	//sort value array
	arraySort(value_arr, sortType, sortOrder, localeSensitive);
	
	var resultArray = new Array();
	var index = 0;
	for(var item in value_arr)
	{
		var keyArray = value_map[value_arr[item]];
		
		if(keyArray != null)
		{
			for(var keyItem in keyArray)
			{
				resultArray[index] = keyArray[keyItem];
				index++;
			}
		}
		
	}
	
	return resultArray;
		
	
}

function structUpdate(structVar, key1, value)
{
	_validateParameters(structUpdate.arguments.length, 3, "structUpdate");
	var key = key1;
	if (structVar != null) 
	{
	
		if (key in structVar) 
		{
			structVar[key] = value;
		}
		else 
		{
			throw "Cannot find " + key + " key in structure";
		}
	}
	else
		throw new IllegalArgumentException();
	
	return true;
}

function _arraySort(arrayObj, sortType, sortOrder, localeSensitive)
{
	switch (sortType)
	{
		case "numeric" :
		{
			if(sortOrder != "desc")
				arrayObj.sort(function(a,b){return a-b} );
			else
				arrayObj.sort(function(a,b){return b-a} );
			break;
		}
		
		case "text" :
		{
			if (localeSensitive) 
			{
				arrayObj.sort(function(a, b)
				{
					return a.localeCompare(b);
				});
			}
			else 
				arrayObj.sort();
				
			if (sortOrder == "desc") 
				arrayObj.reverse();
		}
		
		case "textnocase" :
		{
			if (localeSensitive) 
			{
				arrayObj.sort(function(a, b)
				{
					return a.toLowerCase().localeCompare(b.toLowerCase()) ;
				});
			
			}
			else 
			{
				arrayObj.sort(function(a, b)
				{
					if (a.toLowerCase() < b.toLowerCase()) 
						return -1;
					if (a.toLowerCase() > b.toLowerCase()) 
						return 1;
					return 0;
				});
			}
				
			if (sortOrder == "desc") 
				arrayObj.reverse();
			
		}
	}
}

function _equals(obj1, obj2)
{
	if(obj1 === obj2)
		return true;
	if(!(obj1 instanceof Object && obj2 instanceof Object ))
		return false;
		
	if(obj1.constructor !== obj2.constructor)
		return false;
		
	for(var prop in obj1)
	{
		if(obj1.hasOwnProperty(prop))
		{
			if(obj1[prop] === obj2[prop])
				continue;
			
			if(typeof obj1[prop] !== "object")
				return false; //return false as primitive properties didn't match
				
			if(! (_equals(obj1[prop], obj2[prop]) ) )
				return false;
		}
	}
	
	return true;	
}

function _validateParameters(argumentCount, requiredCount, functionName)
{
	if(argumentCount < requiredCount)
		throw new ParameterValidationException("Parameter validation error for function "+functionName+". The function takes "+requiredCount+" parameter");		
		
}

function IllegalArgumentException()
{
	this.message = "Undefined Structure";
}

function ParameterValidationException(msg)
{
	this.message = msg;
}

function __memberWrapper(func, args, thisObj, funcName)
{
	Array.prototype.unshift.call(args,thisObj);
	try{
		return func.apply(thisObj, args);
	}catch(e){
		if(e instanceof ParameterValidationException)
		{
			var msg = e.message, len = func.name.length,index= e.message.indexOf(func.name),next = index+len;
			var num = parseInt(msg.substring(next+21,next+22)) -1;
			e.message = msg.substring(0,index)+funcName+msg.substring(next,next+21)+num + msg.substring(next+22);
		}
		throw e;
	}
}

function __initFunctionList() { // Wrap in a function so the var scoped variables stay local
	if (!window._funcInit) {
		// list functions
		Object.defineProperty( String.prototype,"listAppend",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listAppend,arguments, this,"listAppend");}});
		Object.defineProperty( String.prototype,"changeDelims",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listChangeDelims,arguments, this,"changeDelims");}});
		Object.defineProperty( String.prototype,"listContains",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listContains,arguments, this,"listContains");}});
		Object.defineProperty( String.prototype,"listContainsNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listContainsNoCase,arguments, this,"listContainsNoCase");}});
		Object.defineProperty( String.prototype,"listDeleteAt",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listDeleteAt,arguments, this,"listDeleteAt");}});
		Object.defineProperty( String.prototype,"listFind",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listFind,arguments, this,"listFind");}});
		Object.defineProperty( String.prototype,"listFindNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listFindNoCase,arguments, this,"listFindNoCase");}});
		Object.defineProperty( String.prototype,"listFirst",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listFirst,arguments, this,"listFirst");}});
		Object.defineProperty( String.prototype,"listLast",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listLast,arguments, this,"listLast");}});
		Object.defineProperty( String.prototype,"listGetAt",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listGetAt,arguments, this,"listGetAt");}});
		Object.defineProperty( String.prototype,"listInsertAt",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listInsertAt,arguments, this,"listInsertAt");}});
		Object.defineProperty( String.prototype,"listLen",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listLen,arguments, this,"listLen");}});
		Object.defineProperty( String.prototype,"listPrepend",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listPrepend,arguments, this,"listPrepend");}});
		Object.defineProperty( String.prototype,"listQualify",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listQualify,arguments, this,"listQualify");}});
		Object.defineProperty( String.prototype,"listRest",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listRest,arguments, this,"listRest");}});
		Object.defineProperty( String.prototype,"listSetAt",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listSetAt,arguments, this,"listSetAt");}});
		Object.defineProperty( String.prototype,"sort",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listSort,arguments, this,"sort");}});
		Object.defineProperty( String.prototype,"listToArray",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listToArray,arguments, this,"listToArray");}});
		Object.defineProperty( String.prototype,"valueCount",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listValueCount,arguments, this,"valueCount");}});
		Object.defineProperty( String.prototype,"valueCountNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(listValueCountNoCase,arguments, this,"valueCountNoCase");}});
//		Object.defineProperty( String.prototype,"replace",{enumerable: false, writable:true, value:function(){ return __memberWrapper(ReplaceList,arguments, this);}});
		// string functions
		Object.defineProperty( String.prototype,"asc",{enumerable: false, writable:true, value:function(){ return __memberWrapper(asc,arguments, this,"asc");}});
		Object.defineProperty( String.prototype,"insert",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_insert,arguments, this,"insert");}});
		Object.defineProperty( String.prototype,"uCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(uCase,arguments, this,"uCase");}});
		Object.defineProperty( String.prototype,"lCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(lCase,arguments, this,"lCase");}});
		Object.defineProperty( String.prototype,"left",{enumerable: false, writable:true, value:function(){ return __memberWrapper(left,arguments, this,"left");}});
		Object.defineProperty( String.prototype,"right",{enumerable: false, writable:true, value:function(){ return __memberWrapper(right,arguments, this,"right");}});
		Object.defineProperty( String.prototype,"rJustify",{enumerable: false, writable:true, value:function(){ return __memberWrapper(rJustify,arguments, this,"rJustify");}});
		Object.defineProperty( String.prototype,"lJustify",{enumerable: false, writable:true, value:function(){ return __memberWrapper(lJustify,arguments, this,"lJustify");}});
		Object.defineProperty( String.prototype,"cJustify",{enumerable: false, writable:true, value:function(){ return __memberWrapper(cJustify,arguments, this,"cJustify");}});
		Object.defineProperty( String.prototype,"mid",{enumerable: false, writable:true, value:function(){ return __memberWrapper(mid,arguments, this,"mid");}});
		Object.defineProperty( String.prototype,"len",{enumerable: false, writable:true, value:function(){ return __memberWrapper(len,arguments, this,"len");}});
		Object.defineProperty( String.prototype,"trim",{enumerable: false, writable:true, value:function(){ return __memberWrapper(trim,arguments, this,"trim");}});
		Object.defineProperty( String.prototype,"removeChars",{enumerable: false, writable:true, value:function(){ return __memberWrapper(removeChars,arguments, this,"removeChars");}});
		Object.defineProperty( String.prototype,"compare",{enumerable: false, writable:true, value:function(){ return __memberWrapper(compare,arguments, this,"compare");}});
		Object.defineProperty( String.prototype,"compareNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(compareNoCase,arguments, this,"compareNoCase");}});
		Object.defineProperty( String.prototype,"repeatString",{enumerable: false, writable:true, value:function(){ return __memberWrapper(repeatString,arguments, this,"repeatString");}});
		Object.defineProperty( String.prototype,"rTrim",{enumerable: false, writable:true, value:function(){ return __memberWrapper(rTrim,arguments, this,"rTrim");}});
		Object.defineProperty( String.prototype,"lTrim",{enumerable: false, writable:true, value:function(){ return __memberWrapper(lTrim,arguments, this,"lTrim");}});
		Object.defineProperty( String.prototype,"replaceNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(replaceNoCase,arguments, this,"replaceNoCase");}});
//		Object.defineProperty( String.prototype,"replace",{enumerable: false, writable:true, value:function(){ return __memberWrapper(Replace,arguments, this);}});
		Object.defineProperty( String.prototype,"wrap",{enumerable: false, writable:true, value:function(){ return __memberWrapper(wrap,arguments, this,"wrap");}});
		Object.defineProperty( String.prototype,"spanExcluding",{enumerable: false, writable:true, value:function(){ return __memberWrapper(spanExcluding,arguments, this,"spanExcluding");}});
		Object.defineProperty( String.prototype,"spanIncluding",{enumerable: false, writable:true, value:function(){ return __memberWrapper(spanIncluding,arguments, this,"spanIncluding");}});
		Object.defineProperty( String.prototype,"reverse",{enumerable: false, writable:true, value:function(){ return __memberWrapper(reverse,arguments, this,"reverse");}});
		Object.defineProperty( String.prototype,"stripCR",{enumerable: false, writable:true, value:function(){ return __memberWrapper(stripCR,arguments, this,"stripCR");}});
		Object.defineProperty( String.prototype,"find",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_find,arguments, this,"find");}});
		Object.defineProperty( String.prototype,"findNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_findnocase,arguments, this,"findNoCase");}});
		Object.defineProperty( String.prototype,"findOneOf",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_findoneof,arguments, this,"findOneOf");}});
		Object.defineProperty( String.prototype,"getToken",{enumerable: false, writable:true, value:function(){ return __memberWrapper(getToken,arguments, this,"getToken");}});
		
		// Array functions
		Object.defineProperty(Array.prototype,"append",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayAppend,arguments, this,"append");}});
		Object.defineProperty(Array.prototype,"avg",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayAvg,arguments, this,"avg");}});
		Object.defineProperty(Array.prototype,"clear",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayClear,arguments, this,"clear");}});
		Object.defineProperty(Array.prototype,"deleteAt",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayDeleteAt,arguments, this,"deleteAt");}});
		Object.defineProperty(Array.prototype,"insertAt",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayInsertAt,arguments, this,"insertAt");}});
		Object.defineProperty(Array.prototype,"contains",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayContains,arguments, this,"contains");}});
	//	Object.defineProperty(Array.prototype,"slice",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arraySlice,arguments, this);}});
		Object.defineProperty(Array.prototype,"isEmpty",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayIsEmpty,arguments, this,"isEmpty");}});
		Object.defineProperty(Array.prototype,"len",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayLen,arguments, this,"len");}});
		Object.defineProperty(Array.prototype,"max",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayMax,arguments, this,"max");}});
		Object.defineProperty(Array.prototype,"min",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayMin,arguments, this,"min");}});
		Object.defineProperty(Array.prototype,"delete",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayDelete,arguments, this,"delete");}});
		Object.defineProperty(Array.prototype,"findAllNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayFindAllNoCase,arguments, this,"findAllNoCase");}});
		Object.defineProperty(Array.prototype,"prepend",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayPrepend,arguments, this,"prepend");}});
		Object.defineProperty(Array.prototype,"resize",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayResize,arguments, this,"resize");}});
		Object.defineProperty(Array.prototype,"set",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arraySet,arguments, this,"set");}});
	//	Object.defineProperty(Array.prototype,"sort",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arraySort,arguments, this);}});
		Object.defineProperty(Array.prototype,"find",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayFind,arguments, this,"find");}});
		Object.defineProperty(Array.prototype,"findAll",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayFindAll,arguments, this,"findAll");}});
		Object.defineProperty(Array.prototype,"sum",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arraySum,arguments, this,"sum");}});
		Object.defineProperty(Array.prototype,"swap",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arraySwap,arguments, this,"swap");}});
		Object.defineProperty(Array.prototype,"toList",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayToList,arguments, this,"toList");}});
		Object.defineProperty(Array.prototype,"findNoCase",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayFindNoCase,arguments, this,"findNoCase");}});
		Object.defineProperty(Array.prototype,"isDefined",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayIsDefined,arguments, this,"isDefined");}});
	//	Object.defineProperty(Array.prototype,"filter",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayFilter,arguments, this,"filter");}});
		Object.defineProperty(Array.prototype,"map",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayMap,arguments, this,"map");}});
		Object.defineProperty(Array.prototype,"reduce",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayReduce,arguments, this,"reduce");}});
		Object.defineProperty(Array.prototype,"each",{enumerable: false, writable:true, value:function(){ return __memberWrapper(arrayEach,arguments, this,"each");}});		
		// Date functions
		Object.defineProperty(Date.prototype,"diff",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_datediff,arguments, this,"diff");}});
		Object.defineProperty(Date.prototype,"compare",{enumerable: false, writable:true, value:function(){ return __memberWrapper(dateCompare,arguments, this,"compare");}});
		Object.defineProperty(Date.prototype,"dateFormat",{enumerable: false, writable:true, value:function(){ return __memberWrapper(dateFormat,arguments, this,"dateFormat");}});
		Object.defineProperty(Date.prototype,"second",{enumerable: false, writable:true, value:function(){ return __memberWrapper(second,arguments, this,"second");}});
		Object.defineProperty(Date.prototype,"minute",{enumerable: false, writable:true, value:function(){ return __memberWrapper(minute,arguments, this,"minute");}});
		Object.defineProperty(Date.prototype,"hour",{enumerable: false, writable:true, value:function(){ return __memberWrapper(hour,arguments, this,"hour");}});
		Object.defineProperty(Date.prototype,"day",{enumerable: false, writable:true, value:function(){ return __memberWrapper(day,arguments, this,"day");}});
		Object.defineProperty(Date.prototype,"week",{enumerable: false, writable:true, value:function(){ return __memberWrapper(week,arguments, this,"week");}});
		Object.defineProperty(Date.prototype,"month",{enumerable: false, writable:true, value:function(){ return __memberWrapper(month,arguments, this,"month");}});
		Object.defineProperty(Date.prototype,"quarter",{enumerable: false, writable:true, value:function(){ return __memberWrapper(quarter,arguments, this,"quarter");}});
		Object.defineProperty(Date.prototype,"year",{enumerable: false, writable:true, value:function(){ return __memberWrapper(year,arguments, this,"year");}});
		Object.defineProperty(Date.prototype,"daysInMonth",{enumerable: false, writable:true, value:function(){ return __memberWrapper(daysInMonth,arguments, this,"daysInMonth");}});
		Object.defineProperty(Date.prototype,"daysInYear",{enumerable: false, writable:true, value:function(){ return __memberWrapper(daysInYear,arguments, this,"daysInYear");}});
		Object.defineProperty(Date.prototype,"dayOfWeek",{enumerable: false, writable:true, value:function(){ return __memberWrapper(dayOfWeek,arguments, this,"dayOfWeek");}});
		Object.defineProperty(Date.prototype,"dayOfYear",{enumerable: false, writable:true, value:function(){ return __memberWrapper(dayOfYear,arguments, this,"dayOfYear");}});
		Object.defineProperty(Date.prototype,"firstDayOfMonth",{enumerable: false, writable:true, value:function(){ return __memberWrapper(firstDayOfMonth,arguments, this,"firstDayOfMonth");}});
		Object.defineProperty(Date.prototype,"dateTimeFormat",{enumerable: false, writable:true, value:function(){ return __memberWrapper(dateTimeFormat,arguments, this,"dateTimeFormat");}});
		Object.defineProperty(Date.prototype,"timeFormat",{enumerable: false, writable:true, value:function(){ return __memberWrapper(timeFormat,arguments, this,"timeFormat");}});
		Object.defineProperty(Date.prototype,"dateFormat",{enumerable: false, writable:true, value:function(){ return __memberWrapper(dateFormat,arguments, this,"dateFormat");}});
		Object.defineProperty(Date.prototype,"add",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_dateadd,arguments, this,"add");}});
		Object.defineProperty(Date.prototype,"convert",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_dateconvert,arguments, this,"convert");}});
		Object.defineProperty(Date.prototype,"datePart",{enumerable: false, writable:true, value:function(){ return __memberWrapper(_datepart,arguments, this,"datePart");}});
		//Struct functions
		// Make following functions we add to object non-iterable and writable
		Object.defineProperty(Object.prototype,"isEmpty",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structIsEmpty,arguments, this,"isEmpty");}});
		Object.defineProperty(Object.prototype,"append",{enumerable: false, writable:true, value:function(){ return  __memberWrapper(structAppend,arguments, this,"append");}});
		Object.defineProperty(Object.prototype,"clear",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structClear,arguments, this,"clear");}});
		Object.defineProperty(Object.prototype,"copy",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structCopy,arguments, this,"copy");}});
		Object.defineProperty(Object.prototype,"count",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structCount,arguments, this,"count");}});
		Object.defineProperty(Object.prototype,"delete",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structDelete,arguments, this,"delete");}});
		Object.defineProperty(Object.prototype,"find",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structFind,arguments, this,"find");}});
		Object.defineProperty(Object.prototype,"findValue",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structFindValue,arguments, this,"findValue");}});
		Object.defineProperty(Object.prototype,"update",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structUpdate,arguments, this,"update");}});
		Object.defineProperty(Object.prototype,"sort",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structSort,arguments, this,"sort");}});
	//	Object.defineProperty(Object.prototype,"insert",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structInsert,arguments, this);}});
		Object.defineProperty(Object.prototype,"keyArray",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structKeyArray,arguments, this,"keyArray");}});
		Object.defineProperty(Object.prototype,"keyExists",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structKeyExists,arguments, this,"keyExists");}});
		Object.defineProperty(Object.prototype,"keyList",{enumerable: false, writable:true, value:function(){ return __memberWrapper(structKeyList,arguments, this,"keyList");}});

		window._funcInit = true;
	}
}
__initFunctionList();
