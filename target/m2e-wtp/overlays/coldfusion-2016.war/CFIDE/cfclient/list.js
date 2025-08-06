function getToken(str, position, delim)
{
	_validateParameters(getToken.arguments.length, 2, "getToken");
	
	position = position -1;
	
	position = Math.floor(position);
	
	if ("undefined" == typeof delim) 
	{
		delim = " " + String.fromCharCode(9) + String.fromCharCode(10);
	}
	
	var result = _multiDelimSplit(str,delim,false);
	
	if(result.length == 0)
		return str;
	
	if (position >= 0 && position < result.length) 
			return result[position];
		
	return "";
}

function listAppend(list, value, delimiter)
{
	_validateParameters(listAppend.arguments.length, 2, "listAppend");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if(delimiter.length == 0)
		return list;
	else if(list.length == 0)
		return value;
	else
		return list + delimiter.charAt(0) + value;
		
	
}

function listChangeDelims(list, newDelimiter, oldDelimiter, includeEmptyFields)
{
	_validateParameters(listChangeDelims.arguments.length, 2, "listChangeDelims");
	
	if("undefined" == typeof oldDelimiter)
		oldDelimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var result = "";

	var tokens = _multiDelimSplit(list,oldDelimiter);		
	
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			result = result + tokens[i];
			if (i + 1 < tokens.length) 
				result = result + newDelimiter;
		}
	}

		
	return result;
}

function listContains(list, subString, delimiter, includeEmptyFields)
{
	_validateParameters(listContains.arguments.length, 2, "listContains");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list, delimiter);		
	var index = 0;
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			index++;
			if( find(subString, tokens[i])  > 0)
				return index;
		}
	}
		
	return 0;
}

function listContainsNoCase(list, subString, delimiter, includeEmptyFields)
{
	_validateParameters(listContainsNoCase.arguments.length, 2, "listContainsNoCase");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list, delimiter);		
	var index = 0;
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			index++;
			if( findNoCase(subString, tokens[i])  > 0)
				return index;
		}
	}
		
	return 0;
}

function listDeleteAt(list, position, delimiter, includeEmptyFields)
{
	_validateParameters(listDeleteAt.arguments.length, 2, "listDeleteAt");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
		
	position = position - 1;
	
	var splitResult = _multiDelimSplit(list,delimiter,true,true);	
	var tokens = splitResult["tokens"];
	var delimArray = splitResult["delims"];
	
	if(position >= tokens.length)
		throw "Invalid List index";	
	
	var result = "";
	var addedToken = -1;
	var index = 0;
	var skip = false;
	for(var i=0;i<tokens.length;i++)
	{
		
		if (index != position || tokens[i] == "") 
		{

			if (tokens[i] != "" || !skip || includeEmptyFields) 
			{
				if (i - 1 < delimArray.length && result != "") 
					result = result + delimArray[i-1];
				result = result + tokens[i];
				
			}
		}
		
		if (tokens[i] != "" || includeEmptyFields) 
		{
			index++;
			if(skip )
				skip = false; //turn it off once we get a non empty token
			if((index -1) == position) //turn on only for matching position
				skip = true;
		}
			
				
	}
		
	return result;
}

function listFind(list, value, delimiter, includeEmptyFields)
{
	_validateParameters(listFind.arguments.length, 2, "listFind");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter);		
	
	var index = 0;
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			index++;
			
			if(tokens[i] == value)
				return index;
		}
	}
		
	return 0;
}

function listFindNoCase(list, value, delimiter, includeEmptyFields)
{
	_validateParameters(listFindNoCase.arguments.length, 2, "listFindNoCase");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter);		
	
	var index = 0;
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			index++;
			
			if(tokens[i].toLowerCase() == value.toLowerCase())
				return index;
		}
	}
		
	return 0;
}

function listFirst(list, delimiter, includeEmptyFields)
{
	_validateParameters(listFirst.arguments.length, 1, "listFirst");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter);		
	
	for(var i=0;i<tokens.length;i++)
	{
		if(tokens[i] != "" || includeEmptyFields)
			return tokens[i]; 
	}
	
	return list;
}

function listGetAt(list, position, delimiter, includeEmptyFields)
{
	_validateParameters(listGetAt.arguments.length, 2, "listGetAt");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter);		
	
	position = position - 1;
	
	if(position >= tokens.length )
		throw "Invalid List index";
		
	var index = -1;
	
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			index++;
			if(index == position)
				return tokens[i];
		} 
	}
	
	if(position > index)
		throw "Invalid List index";
	
	return list;
}

function listInsertAt(list, position, value, delimiter, includeEmptyFields)
{
	_validateParameters(listInsertAt.arguments.length, 3, "listInsertAt");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var splitResult = _multiDelimSplit(list,delimiter,true,true);		
	var tokens = splitResult["tokens"];
	var delimArray = splitResult["delims"];
	position = position - 1;
	
	if(position >= tokens.length )
		throw "Invalid List index";
		
	var index = -1;	
	var result = "";
	var actualIndex = 0;
	for(var i=0;i<tokens.length;i++)
	{
		
		if (i != 0 && i -1  < delimArray.length && (addedToken <= i -1 && addedToken != -1)) 
			result = result + delimArray[addedToken];
			
		if (actualIndex == position && (tokens[i] != "" || includeEmptyFields)) 
		{
			result = result + value;
			
			if (i < tokens.length) 
				result = result + delimiter.charAt(0);
			
			actualIndex++;
		}
			
		if (tokens[i] != "" || includeEmptyFields) 
		{
			result = result + tokens[i];
			actualIndex++;
		}
		addedToken = i;	
		
		
	}
		
	return result;
}

function listLast(list, delimiter, includeEmptyFields)
{
	_validateParameters(listLast.arguments.length, 1, "listLast");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter);		
	var result = tokens[0];
	for(var i=0;i<tokens.length;i++)
	{
		if(tokens[i] != "" || includeEmptyFields)
			result = tokens[i]; 
	}
	
	return result;
}

function listLen(list, delimiter, includeEmptyFields)
{
	_validateParameters(listLen.arguments.length, 1, "listLen");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter, includeEmptyFields);		

	return tokens.length;
}

function listPrepend(list, value, delimiter)
{
	_validateParameters(listPrepend.arguments.length, 2, "listPrepend");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";	
		
	if(delimiter.length > 1)
		delimiter = delimiter.charAt(0);
		
	return value + delimiter + list;	
}

function listQualify(list, qualifier, delimiter, elements, includeEmptyFields)
{
	_validateParameters(listQualify.arguments.length, 2, "listQualify");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
			
	if("undefined" == typeof elements)
		elements = "all";
	else if (elements.toLowerCase() != "all" && elements.toLowerCase() != "char")
		throw "Invalid elements type "+elements;
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter);		

	for(var i=0;i<tokens.length;i++)
	{
		if(tokens[i] != "" || includeEmptyFields)
		{
			if(elements.toLowerCase() == "all" || _isAlphabetic(tokens[i]))
				tokens[i] = qualifier + tokens[i] + qualifier;
		}
			
	}
	
	var result = "";
	for(var i=0;i<tokens.length;i++)
	{
		if (tokens[i] != "" || includeEmptyFields) 
		{
			if( i != 0)
				result = result + delimiter[0];
				
			result = result + tokens[i];
			
		} 
	}
	
	return result;
}

function listRest(list, delimiter, includeEmptyFields)
{
	_validateParameters(listRest.arguments.length, 1, "listRest");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = true;
	
	var splitResult = _multiDelimSplit(list,delimiter, includeEmptyFields, true);
	var tokens = splitResult["tokens"];
	var delimArray = splitResult["delims"];
		
	var result = "";
	var addedFirst = false;
	var startedList = false;
	var hasEmptuFieldsAtStart = false;
	for(var i=1;i<tokens.length;i++)
	{
		
		if (tokens[i] == "" && !startedList) 
		{
			hasEmptuFieldsAtStart = true;
			continue;
		}
		if(!startedList)
		{
			startedList = true;
			if(hasEmptuFieldsAtStart) //skip first non empty element as previous elements were empty
				continue;
		}			
		result = result + tokens[i];			
		if(delimArray != null && i < delimArray.length)
			result = result + delimArray[i];

	}
	
	return result;
}

function listSetAt(list, position, value, delimiter, includeEmptyFields)
{
	_validateParameters(listSetAt.arguments.length, 3, "listSetAt");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
		
	var splitResult = _multiDelimSplit(list,delimiter,true,true);	
	var tokens = splitResult["tokens"];
	var delimArray = splitResult["delims"];	
	
	position = Math.floor(position);
	
	position = position - 1;
	
	if(position >= tokens.length )
		throw "Invalid List index";
		
	var index = -1;
	//---
	var result = "";
	if(includeEmptyFields)
	{
		for(var i=0;i<tokens.length;i++)
		{
			if(i === position)
				result = result + value;
			else
				result = result + tokens[i]; 
				
			if(i != tokens.length -1)
				result = result + (delimiter);
		}	
	}
	else
	{
		var idx = -1;
		var cfBehaviorOn = false;
		var isDelim = false;
		var didOneDelim = false;
		var temp;
		tokens = _splitWithDelims(list,delimiter,false);
		
		function _isValidDelim(val)
		{
			return delimiter.indexOf(val) >= 0;
		}
		
		for(var i=0;i<tokens.length;i++)
		{
			isDelim = false;
			
			if(!_isValidDelim(tokens[i]))
			{
				idx++;
			}
			else
				isDelim = true;
			
			
				
			if(idx === position)
			{
				result = result + value;
				idx++;
				cfBehaviorOn = true;
			}
			else
			{
				if(!isDelim && cfBehaviorOn)
					cfBehaviorOn = false;
					
				if (cfBehaviorOn && isDelim && !didOneDelim && position != tokens.length)
				{
					result = result + delimiter.charAt(0);
					didOneDelim = true;
				}
				else if(!cfBehaviorOn)
						result = result + tokens[i];
					
			}
				
		}
		
	}
		
		
	return result;
}

function listSort(list, sortType, sortOrder, delimiter, includeEmptyFields, localeSensitive)
{
	_validateParameters(listSort.arguments.length, 2, "listSort");
	
	if("undefined" == typeof delimiter)
		delimiter = ",";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = false;
	
	var tokens = _multiDelimSplit(list,delimiter,includeEmptyFields,false);
		
	arraySort(tokens,sortType, sortOrder,localeSensitive);
	
	var result = "";
	for(var i=0;i<tokens.length;i++)
	{
		if (i != 0) 
			result = result + delimiter[0];
			
		result = result + tokens[i];
	}
		
	return result;
	
}

function listValueCount(str, value, delim)
{
	_validateParameters(listValueCount.arguments.length, 2, "listValueCount");
	
	if("undefined" == typeof delim)
		var delim = ",";
	
	var result = _multiDelimSplit(str,delim);
		
	var count = 0;
	for(var i=0; i < result.length; i++)
	{
		if(result[i] == value)
			count++;
	}
			
	
	return count;
}

function listValueCountNoCase(str, value, delim)
{
	_validateParameters(listValueCountNoCase.arguments.length, 2, "listValueCountNoCase");
	
	if("undefined" == typeof delim)
		var delim = ",";
	
	var result = _multiDelimSplit(str,delim);
		
	var count = 0;
	for(var i=0; i < result.length; i++)
	{
		if(_compareStr(result[i], value, false) == 0)
			count++;
	}
			
	
	return count;
}

function replaceList(str, list1, list2, delim1, delim2)
{
	_validateParameters(replaceList.arguments.length, 3, "replaceList");
	
	if("undefined" == typeof delim1)
		var delim1 = ",";
	if("undefined" == typeof delim2)
		var delim2 = delim1;
	
	var tokens1 = _multiDelimSplit(list1, delim1, false);
	var tokens2 = _multiDelimSplit(list2, delim2, false);
	var elementToReplace = null;
	for(var i=0; i < tokens1.length;i++)
	{
		if(find(tokens1[i], str) > 0)
		{
			if(i < tokens2.length)
				str = replace(str,tokens1[i],tokens2[i], "all");
			else
				str = replace(str,tokens1[i],"", "all");
		}	
	}
	
	return str;
}

function listRemoveDuplicates(str,delim,ignoreCase)
{
	_validateParameters(listRemoveDuplicates.arguments.length, 1, "listRemoveDuplicates");
	
	if("undefined" == typeof delim)
		var delim = ",";
		
	if("undefined" == typeof ignoreCase)
		var ignoreCase = false;
	
	var result = _multiDelimSplit(str,delim);
		
	var index = 0;
	var itemArray = [];
	for(var i=0; i < result.length; i++)
	{
		var res = 0;
		if(ignoreCase)
			res = arrayFindNoCase(itemArray,result[i]);
		else
			res = arrayFind(itemArray, result[i]);
			
		if(res == 0)
		{
			//item not present, add to itemArray
			itemArray[index] = result[i];
			index++;			
		}
		
	}
	
	return arrayToList(itemArray);
}

function _multiDelimSplit(str, delim, includeEmptyFields, keepDelims)
{
	var regexStr = "[";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = true;
	
	for(var i = 0; i < delim.length; i++)
	{
		switch(delim[i])
		{
			case " ":
				regexStr = regexStr + "\\s|";
				break;
			default :
				regexStr = regexStr + delim[i] + "|";
		}
	}
	
	if(regexStr.length > 2 && regexStr.charAt(regexStr.length - 1) == "|")
		regexStr = regexStr.substring(0, regexStr.length -1);
		
	regexStr = regexStr +"]";
	
	var regex = new RegExp(regexStr,"g");
	var splitResult = null;
	var resultStrArray = str.split(regex);
	var delimArray = null;
	
	if(keepDelims)
		delimArray = str.match(regex);
	
	var tokenRemoveIndexes = new Array();
	
	if(! includeEmptyFields)
	{
		for(var i=0; i < resultStrArray.length; i++)
		{
			if(resultStrArray[i] == "")
			{

				resultStrArray.splice(i, 1);
				
				if(keepDelims && delimArray != null && delimArray.length > i )
					delimArray.splice(i,1);
					
				--i;
			}
		}
	}
	
	var finalResult = new Array(); 
	if (keepDelims) 
	{
		finalResult["tokens"] = resultStrArray;
		finalResult["delims"] = delimArray;
	}
	else
		finalResult = resultStrArray;

		
	return finalResult;	
	
}
function _splitWithDelims(str, delim, includeEmptyFields)
{
	var regexStr = "([";
	
	if("undefined" == typeof includeEmptyFields)
		includeEmptyFields = true;
	
	for(var i = 0; i < delim.length; i++)
	{
		switch(delim[i])
		{
			case " ":
				regexStr = regexStr + "\\s|";
				break;
			default :
				regexStr = regexStr + delim[i] + "|";
		}
	}
	
	if(regexStr.length > 2 && regexStr.charAt(regexStr.length - 1) == "|")
		regexStr = regexStr.substring(0, regexStr.length -1);
		
	regexStr = regexStr +"])";
	
	var regex = new RegExp(regexStr,"g");
	var splitResult = null;
	var resultStrArray = str.split(regex);
	
	
	var tokenRemoveIndexes = new Array();
	
	if(! includeEmptyFields)
	{
		for(var i=0; i < resultStrArray.length; i++)
		{
			if(resultStrArray[i] == "")
			{
				resultStrArray.splice(i, 1);
					
				--i;
			}
		}
	}
		
	return resultStrArray;	
	
}


