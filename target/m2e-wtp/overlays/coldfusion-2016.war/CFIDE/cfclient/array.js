function arrayAppend(arrayObj, value, merge)
{
	_validateParameters(arrayAppend.arguments.length, 2, "arrayAppend");
	
	if("undefined" == typeof merge)
		var merge = false;
		
	if(value instanceof Array && merge)
	{
		for(var i=0;i < value.length;i++)
		{
			arrayObj[arrayLen(arrayObj)] = value[i];
		}		
	}
	else
	{
		if(arrayObj._dim > 1)
			throw "If an array with more then one dimension is passed to this function, the value passed to the array must be an array with one less dimension.";
		arrayObj[arrayLen(arrayObj)] = value;
	}
		
	return true;	
}

function arrayAvg(arrayObj)
{
	_validateParameters(arrayAvg.arguments.length, 1, "arrayAvg");
	
	var sum = 0;
	var avg = 0;
	
	if (arrayObj.length > 0) 
	{
		var temp;
		for (var i = 0; i < arrayObj.length; i++) 
		{
			temp = arrayObj[i];
			if(typeof temp != "undefined")
				sum = sum + temp;
			else
				throw "The value at position "+(i+1)+" was either not numeric or not defined.";
		}
		
		avg = sum / arrayObj.length;
	}
	
	return avg;
	
}

function arrayClear(arrayObj)
{
	_validateParameters(arrayClear.arguments.length, 1, "arrayClear");
	
	arrayObj.splice(0, arrayObj.length);
	
	return true;
}

function arrayDeleteAt(arrayObj, position)
{
	_validateParameters(arrayDeleteAt.arguments.length, 2, "arrayDeleteAt");
	
	position = position - 1;
	
	if (arrayObj instanceof Array) 
	{
		if (position < 0 || (position > arrayObj.length)) 
			throw "Invalid Array Index";
		
		arrayObj.splice(position, 1);
		
		return true;
	}
	
	return false;
}
function arrayEach(arrayObj, func)
{
	_validateParameters(arrayEach.arguments.length, 2, "arrayEach");
	if (arrayObj instanceof Array) 
	{
		if(typeof func != "function")
			throw new IllegalArgumentException();
			
		for (var i = 0; i < arrayObj.length; i++) 
		{
			func(arrayObj[i],i+1);
		}
	}
}

function arrayFilter(arrayObj, func)
{
	_validateParameters(arrayFilter.arguments.length, 2, "arrayFilter");
	if (arrayObj instanceof Array) 
	{
		if(typeof func != "function")
			throw new IllegalArgumentException();
			
		var temp = [];
		var index = 0;
		for (var i = 0; i < arrayObj.length; i++) 
		{
			if(func(arrayObj[i]))
			{
				temp[index] = arrayObj[i];
				index++;
			}
		}
		
		return temp;
	}
}

function arrayMap(arrayObj, func)
{
	_validateParameters(arrayMap.arguments.length, 2, "arrayMap");
	if (arrayObj instanceof Array) 
	{
		if(typeof func != "function")
			throw new IllegalArgumentException();
			
		var temp = [];
		for (var i = 0; i < arrayObj.length; i++) 
		{
			temp[i] = func(arrayObj[i],i+1,arrayObj);			
		}
		
		return temp;
	}
}

function arrayReduce(arrayObj, func, initValue)
{
	_validateParameters(arrayReduce.arguments.length, 2, "arrayReduce");
	
	if(typeof initValue != "undefined")
		var temp = initValue;
	else
		var temp = "";
	
	if (arrayObj instanceof Array) 
	{
		if(typeof func != "function")
			throw new IllegalArgumentException();
			
		
		for (var i = 0; i < arrayObj.length; i++) 
		{
			temp = func(temp,arrayObj[i],i+1,arrayObj);			
		}		
	}
	return temp;
}

function arrayFind(arrayObj, obj)
{
	_validateParameters(arrayFind.arguments.length, 2, "arrayFind");
	
	return _arrayfind(arrayObj, obj, true);
}



function arrayFindAll(arrayObj, obj)
{
	_validateParameters(arrayFindAll.arguments.length, 2, "arrayFindAll");
	
	return _arrayfindall(arrayObj, obj, true);
}

function arrayFindAllNoCase(arrayObj, obj)
{
	_validateParameters(arrayFindAllNoCase.arguments.length, 2, "arrayFindAllNoCase");
	
	return _arrayfindall(arrayObj, obj, false);
}



function arrayFindNoCase(arrayObj, obj)
{
	_validateParameters(arrayFindNoCase.arguments.length, 2, "arrayFindNoCase");
	
	return _arrayfind(arrayObj, obj, false);
}

function arrayInsertAt(arrayObj, position, value)
{
	_validateParameters(arrayInsertAt.arguments.length, 3, "arrayInsertAt");
	
	position = position - 1;
	
	if(arrayObj instanceof Array)
	{
		if(position < 0 || (position > arrayObj.length))
			throw "Invalid Array Index";
			
		arrayObj.splice(position, 0, value);
		return true;
	}
	
	return false;
}

function arrayContains(arrayObj, value)
{
	_validateParameters(arrayContains.arguments.length, 2, "arrayContains");
	
	if (arrayObj instanceof Array) 
	{
		for (var i = 0; i < arrayObj.length; i++) 
		{
			if (arrayObj[i] == value) 
				return true;
		}
	}
	
	return false;
}

function arraySlice(arrayObj, offset, length)
{
	_validateParameters(arraySlice.arguments.length, 2, "arraySlice");
	
	
	if(offset < 0)
		offset = arrayObj.length + offset;
	else
		offset = offset - 1;
	
	if(arrayObj instanceof Array)
	{
		if ("undefined" != typeof length) 
		{
			if(offset + length > arrayObj.length)
				throw new "Invalid array index";
				
			return arrayObj.slice(offset, offset + length);
		}
		else		
			return arrayObj.slice(offset, arrayObj.length);
	}
}

function arrayIsDefined(arrayObj,index)
{				
	_validateParameters(arrayIsDefined.arguments.length, 2, "arrayIsDefined");
	index = index - 1;
	return ("undefined" != typeof arrayObj[index]);
}

function arrayIsEmpty(arrayObj)
{
	_validateParameters(arrayIsEmpty.arguments.length, 1, "arrayIsEmpty");
	return arrayObj.length == 0;
}

function arrayLen(arrayObj)
{
	_validateParameters(arrayLen.arguments.length, 1, "arrayLen");
	return arrayObj.length;
}

function arrayMax(arrayObj)
{
	_validateParameters(arrayMax.arguments.length, 1, "arrayMax");
	var max;
	var n;
	for (var i = 0; i < arrayObj.length; i++)
	{
		n = arrayObj[i];
		if (!isNaN(n) && (typeof n != "boolean")) 
		{
			if("undefined" == typeof max || n > max)
				max = n;
		}
	}
	if("undefined" != typeof max)
		return max;
	return 0;
}

function arrayMin(arrayObj)
{
	_validateParameters(arrayMin.arguments.length, 1, "arrayMin");
	var min;
	var n;
	for (var i = 0; i < arrayObj.length; i++)
	{
		n = arrayObj[i];
		if (!isNaN(n)) 
		{
			if("undefined" == typeof min || n < min)
				min = n;
		}
	}
	if("undefined" != typeof min)
		return min;
	return 0;
}

function arrayDelete(arrayObj, value)
{
	_validateParameters(arrayDelete.arguments.length, 2, "arrayDelete");
	if (arrayObj instanceof Array) 
	{
		for (var i = 0; i < arrayObj.length; i++) 
		{
			if (arrayObj[i] == value) 
			{
				arrayObj.splice(i, 1);
				return true;
			}				
		}
	}
	
	return false;
}
	
function arrayNew(dimension)
{
	_validateParameters(arrayNew.arguments.length, 1, "arrayNew");
	if("undefined" == typeof dimension)
		var dimension = 1;
		
	if(dimension < 1 || dimension > 3)
		throw new "Array dimension "+dimension+" must be between 1 and 3";
		
	var arr = new Array();
	
	//add _dim as non iteratable property
	Object.defineProperty(arr, "_dim", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: dimension
	});
	
	return arr;
		
}

function arrayPrepend(arrayObj, value)
{
	_validateParameters(arrayPrepend.arguments.length, 2, "arrayPrepend");
	if(arrayObj instanceof Array)
	{
		arrayObj.unshift(value);
		return true;
	}
	
	return false;
}

function arrayResize(arrayObj, minSize)
{
	_validateParameters(arrayResize.arguments.length, 2, "arrayResize");
	
	minSize = Math.floor(minSize);
	
	if(minSize < 1)
		throw "Minimum size should be greater than 0";
	if(arrayObj instanceof Array)
	{
		if (minSize > arrayObj.length) 
		{
			arrayObj.length = minSize;
			return true;
		}
		
		return true;
	}
	
	return false;
}

function arraySet(arrayObj, start, end, value)
{
	_validateParameters(arraySet.arguments.length, 4, "arraySet");
	if(arrayObj instanceof Array)
	{
		for(var i=start-1; i <= end-1; i++)
		{
			arrayObj[i] = value;
		}
		
		return true;
	}
	
	return false;
}

function arraySort(arrayObj, sortType, sortOrder, localeSensitive)
{	
	_validateParameters(arraySort.arguments.length, 2, "arraySort");
	
	function _arraySortClosure(obj, func)
	{
		if (obj instanceof Array) 
		{
			if(typeof func != "function")
				throw new IllegalArgumentException();
				
			obj.sort(func);
			return true;
		}
		return false;
	}
	
	if(typeof arraySort.arguments[1] == "function")
		return _arraySortClosure(arraySort.arguments[0],arraySort.arguments[1]);
	else
	{
	
	if("undefined" == typeof localeSensitive)
		localeSensitive = false;
		
	if("undefined" == typeof sortOrder)
		sortOrder = "asc";
		
	sortOrder = sortOrder.toLowerCase();

	switch (sortType.toLowerCase())
	{
		case "numeric" :
		{
			if(sortOrder != "desc")
				arrayObj.sort(function(a,b){return a-b} );
			else
				arrayObj.sort(function(a,b){return b-a} );
			
			return true;
		}
		
		case "text" :
		{
			if (localeSensitive) 
			{
				arrayObj.sort(function(a, b)
				{
					var val1 = a + "";
					var val2 = b + "";
					return val1.localeCompare(val2);
				});
			}
			else 
				arrayObj.sort();
				
			if (sortOrder == "desc") 
				arrayObj.reverse();
				
			return true;
		}
		
		case "textnocase" :
		{
			if (localeSensitive) 
			{
				arrayObj.sort(function(a, b)
				{
					var val1 = a + "";
					var val2 = b + "";
					return val1.toLowerCase().localeCompare(val2.toLowerCase()) ;
				});
			
			}
			else 
			{
				arrayObj.sort(function(a, b)
				{
					var val1 = a + "";
					var val2 = b + "";
					
					if (val1.toLowerCase() < val2.toLowerCase()) 
						return -1;
					if (val1.toLowerCase() > val2.toLowerCase()) 
						return 1;
					return 0;
				});
			}
				
			if (sortOrder == "desc") 
				arrayObj.reverse();
				
			return true;
			
		}
	}
	return false;
	}
}

function arraySum(arrayObj)
{
	_validateParameters(arraySum.arguments.length, 1, "arraySum");
	var sum = 0;
	var n;
	for(var i=0; i < arrayObj.length; i++)
	{
		n = arrayObj[i];
		if (!isNaN(n)) 
		{
			sum = sum + n;
		}
		else
			throw "Non-numeric value found. The value at position "+i+" was not numeric";
	}
	return sum;
}

function arraySwap(arrayObj, position1, position2)
{
	_validateParameters(arraySwap.arguments.length, 3, "arraySwap");
	
	if(arrayObj instanceof Array)
	{
		position1 = Math.floor(position1 - 1);
		position2 = Math.floor(position2 - 1);
		if(position1 >= 0 && position1 < arrayObj.length && 
			position2 >= 0 && position2 < arrayObj.length)
			{
				var temp  = arrayObj[position1];
				arrayObj[position1] = arrayObj[position2];
				arrayObj[position2] = temp;
				
				return true;
			}
	}
	
	return false;
}

function arrayToList(arrayObj, delim)
{
	_validateParameters(arrayToList.arguments.length, 1, "arrayToList");

    var result = "";
	
	if (arrayObj instanceof Array) 
	{
	
		if (typeof delim == 'undefined') 
			delim = ",";
		
		return arrayObj.join(delim);
	}
    
    return result;
}

function listToArray(list, delim, incudeEmptyFields, multiCharDelim)
{
	_validateParameters(listToArray.arguments.length, 1, "listToArray");
	if (typeof delim == 'undefined') 
		delim = ",";
		
	if (typeof incudeEmptyFields == 'undefined') 
		incudeEmptyFields = false;
		
	if (typeof multiCharDelim == 'undefined') 
		multiCharDelim = false;
		
	var result = new Array();
	if (!multiCharDelim) 
		result = _multiDelimSplit(list, delim, incudeEmptyFields);
	else 
	{
		var arrayObj = list.split(delim);	
		
		if (arrayObj.length == 0 && incudeEmptyFields) 
			result[0] = "";
		else 
		{		
			var index = 0;
			var addItem = false;
			var item = null;
			for (var i = 0; i < arrayObj.length; i++) 
			{
				item = arrayObj[i];
				addItem = true;
				if (typeof item == "undefined" || item == "") 
				{
					if (!incudeEmptyFields) 
						addItem = false;
				}
				
				if (addItem) 
				{
					result[index] = item;
					index++;
				}
			}
		}
	}
		
	return result;
}

function isArray(arrayObj)
{
	_validateParameters(isArray.arguments.length, 1, "isArray");
	if(typeof arrayObj == "undefined")
		return false;
	if(arrayObj instanceof Array)
		return true;
		//length and push function are used for duck test of an array, using the same here
	else if(typeof arrayObj.length == "number" && typeof arrayObj.push == "function")
		return true;
		
	return false;	
}

function _arrayfind(arrayObj, obj, caseSensitive)
{
	if (arrayObj instanceof Array) 
	{
		var _compareFunction = compareObj;
		if (typeof obj != "function") 
		{
			if(typeof obj == "string")
				_compareFunction = compareStr;
				
			for (var i = 0; i < arrayObj.length; i++) 
			{				
				if (_compareFunction(i,obj)) 
					return i + 1;
			}
			
		}
	}
		
	function compareStr(i, obj)
	{
		return _compareString(arrayObj[i], obj, caseSensitive);
	}
	
	function compareObj(i, obj)
	{
		return _equals(arrayObj[i],obj);
	}
	
	return 0;
}

function _arrayfindall(arrayObj, obj, caseSensitive)
{
	var result = new Array();
	
	if (arrayObj instanceof Array) 
	{
		var _compareFunction = compareObj;
		if (typeof obj != "function") 
		{
			if(typeof obj == "string")
				_compareFunction = compareStr;
				
			for (var i = 0; i < arrayObj.length; i++) 
			{				
				if (_compareFunction(i,obj))
					result.push(i+1); 
			}
			
		}
	}
		
	function compareStr(i, obj)
	{
		return _compareString(arrayObj[i], obj, caseSensitive);
	}
	
	function compareObj(i, obj)
	{
		return (arrayObj[i] == obj);
	}
	
	return result;
}

function _compareString(str1, str2, caseSensitive)
{
	if (typeof str1 == "string" && typeof str2 == "string") 
	{
		if (caseSensitive) 
			return (str1 == str2);
		else 
			return str1.toLowerCase() == str2.toLowerCase();
	}
	
	return false;
}
