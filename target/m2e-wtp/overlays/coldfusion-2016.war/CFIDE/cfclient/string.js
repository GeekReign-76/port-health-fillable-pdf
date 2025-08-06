function asc(str)
{
	_validateParameters(asc.arguments.length, 1, "asc");
	if(str == "")
		return 0;
	
	return str.charCodeAt(0);
}

function chr(code)
{
	_validateParameters(chr.arguments.length, 1, "chr");
	
	if(code == 0)
		return "";
	
	return String.fromCharCode(code);
}

function cJustify(str, length)
{
	_validateParameters(cJustify.arguments.length, 2, "cJustify");	
	
	var prefix = Math.floor((length - len(str))/2);
	var suffix = (length - (len(str) + prefix));
	
	for(var i=0;i < prefix;i++)
	{
		str = " " + str;
	}
	
	for(var i=0;i < suffix;i++)
	{
		str = str + " ";
	}
	
	return str;
}

function compare(str1, str2)
{
	_validateParameters(compare.arguments.length, 2, "compare");
	
	return _compareStr(str1, str2, true);
}

function compareNoCase(str1, str2)
{
	_validateParameters(compareNoCase.arguments.length, 2, "compareNoCase");
	
	return _compareStr(str1, str2, false);
}

function _find(str, subString, start)
{
	return find(subString, str, start);
}
function find(subString, str, start)
{
	_validateParameters(find.arguments.length, 2, "find");
	
	if(typeof start == "undefined" || start < 1)
		start = 0;
	else
		start = start - 1;
	
	var tempStr = str.substring(start);
	
	var index = tempStr.search(____escapeRegExp(subString));
	
	if(index == -1)
		return 0; 
	
	return  Math.floor(index + 1 + start);
}

function _findnocase(str, subString, start)
{
	return findNoCase(subString, str, start);
}

function findNoCase(subString, str, start)
{
	_validateParameters(findNoCase.arguments.length, 2, "findNoCase");
	
	if(typeof start == "undefined" || start < 1)
		start = 0;
	else
		start = start - 1;
	
	var tempStr = str.substring(start).toLowerCase();
	
	var index = tempStr.search(____escapeRegExp(subString.toLowerCase()));
	
	if(index == -1)
		return 0; 
	
	return  Math.floor(index + 1 + start);
}

function _findoneof(str, subString, start)
{
	return findOneOf(subString, str, start);
}

function findOneOf(subString, str, start)
{
	_validateParameters(findOneOf.arguments.length, 2, "findOneOf");
	
	if(typeof start == "undefined" || start < 1)
		start = 0;
	else
		start = start - 1;
		
	var tempStr = str.substring(start);
	var minIndex = tempStr.length;
	var found = false;
	for(var i=0; i<subString.length;i++)
	{
		var index = tempStr.search(____escapeRegExp(subString[i]));
		if (index >= 0 && index < minIndex) 
		{
			minIndex = index;
			found = true;
		} 
	}
	
	if(found)
		return Math.floor(minIndex + start + 1);
	
	return 0;
	
}

function formatBaseN(_number, radix)
{
	_validateParameters(formatBaseN.arguments.length, 2, "formatBaseN");
	
	if (radix == 2) 
	{
	
		var number = new Number(_number);		
		
		var num = number.valueOf();
		var temp = Math.pow(2, 31);
		if (num > (temp * 2 - 1) || num < -temp) 
			return '';
		var arr = new Array(32);
		for (var i = 31; i >= 0; --i) 
		{
			arr[i] = (num & 1);
			num = num >>> 1;
		}
		var retStr =  arr.join('');
		var result = "";
		var notStarted = true;
		for(var i=0;i < retStr.length; i++)
		{
			if(retStr[i] == 0 && notStarted)
				continue;
			else
			{
				result = result + retStr[i];
				if(notStarted)
					notStarted = false;
			}
		}
		if(notStarted)
			result = "0";
		
		return result;
	}
	else
		return _number.toString(radix);
}

function _insert(str, subString, position)
{
	return insert(subString, str, position);
}

function insert(subString, str, position)
{
	_validateParameters(insert.arguments.length, 3, "insert");
	
	if(position < 0 || position > str.length)
		throw "position parameter must be less than or equal to length of second parameter which is now "+str+" and had length of "+str.length;
	
	return str.substr(0, position) + subString + str.substr(position);	
}

function isString(str)
{
	_validateParameters(isString.arguments.length, 1, "isString");
	
	if(typeof str == "string")
		return true;
		
	return false;
}

function jsStringFormat(str)
{
	_validateParameters(jsStringFormat.arguments.length, 1, "jsStringFormat");
	var result = "";
	for(var i=0; i<str.length;i++)
	{
		var c = str[i];
		
		switch(c)
		{
			case '\n':
			{
				result = result + "\\n";
				break;
			}
			case '\r':
			{
				result = result + "\\r";
				break;
			}
			case '\t':
			{
				result = result + "\\t";
				break;
			}
			case '\b':
			{
				result = result + "\\b";
				break;
			}
			case '\f':
			{
				result = result + "\\f";
				break;
			}
			case '"':
			{
				result = result + "\\\"";
				break;
			}
			case '\'':
			{
				result = result + "\\'";
				break;
			}
			case '\\':
			{
				result = result + "\\\\";
				break;
			}
			default:
			{
				result = result + c;
			}
		}
	}
	return result;
}

function lCase(str)
{
	_validateParameters(lCase.arguments.length, 1, "lCase");
	return str.toLowerCase();
}

function left(str, count)
{
	_validateParameters(left.arguments.length, 2, "left");
	return str.substring(0, count);
}

function len(str)
{
	_validateParameters(len.arguments.length, 1, "len");
	
	if(typeof str == "undefined")
		return 0;
	
	if(str == "" || asc(str[0]) == 0)
		return 0;
			
	return str.length;
}

function lJustify(str, length)
{
	_validateParameters(lJustify.arguments.length, 2, "lJustify");
	
	var result = new String(str);
	
	length = Math.floor(length);
	
	if(length > len(str))
	{
		var count = length - len(str);
		for(var i=0; i < count; i++)
		{
			result = result + " ";
		}
	}		
	
	return result;
}

function lTrim(str)
{
	_validateParameters(lTrim.arguments.length, 1, "lTrim");	
    
    return str.replace(/^\s+/g,'');
}

function rTrim(str)
{
	_validateParameters(rTrim.arguments.length, 1, "rTrim");	
	
    return str.replace(/\s+$/g,'');
}

function removeChars(str, start, count)
{
	_validateParameters(removeChars.arguments.length, 3, "removeChars");	
	
	start = --start;
	start = Math.floor(start);
	
	if(start < 0)
		throw "Second parameter start should be positive integer";
	
	if (start > str.length)
		throw "Second parameter start should be less than length of first parameter";
			
	if(start + count > str.length)
		return str.substring(0, start);		
	
	var result = str.substring(0,start);
	result = result + str.substring(start+count,str.length);
		
	return result;
}

function repeatString(str, count)
{
	_validateParameters(repeatString.arguments.length, 2, "repeatString");	
	
	var result = "";
	
	count = Math.floor(count);
	
	for(var i=0; i < count ; i++)
	{
		result = result + str;
	}
		
	return result;
}

function mid(str, start, count)
{
	_validateParameters(mid.arguments.length, 3, "mid");
	
	start = --start;	
	
	start = Math.floor(start);
	
	if (start < 0 || start > str.length)
		return "";	
		
	count = Math.floor(count);

	var result = "";
	var len = str.length;
	
	if(len > start + count)
		len = start + count;
		
	for(var i=start; i < len;i++)
	{
			result = result + str[i];
	}
	
    return result;
}

function paragraphFormat(str)
{
	_validateParameters(paragraphFormat.arguments.length, 1, "paragraphFormat");
	
	var result = "";
	var newLine = false;
	
	for (var i = 0; i < str.length; i++) 
	{
		var c = str[i];
		
		switch (c)
		{
			case '\n':
			{
				if (newLine) 
				{
					result = result + "<p>\r\n";
					newLine = false;
				}
				else 
				{
					result = result + " ";
					newLine = true;
				}
				
				break;
			}
			case '\r':
			{
				if(i + 1 < str.lenght)
				{
					if(str.charat(i+1) == '\r')
						newLine = false;
				}
				result = result + " ";
				break;
			}
			default:
			{
				result = result + c;
				newLine = false;
			}
		}
	}
	
    return str;
}

function spanExcluding(str, set)
{
	_validateParameters(spanExcluding.arguments.length, 2, "spanExcluding");
	
	for (var i = 0; i < str.length; i++) 
	{
		var c = str[i];
		
		if(find(c,set) > 0)
			return str.substring(0,i);
	}
	
    return str;
}

function right(str, count)
{
	_validateParameters(right.arguments.length, 2, "right");
	
	if(count >= str.length)
		return str;
	if(str == "")
		return str;
		
	return str.substring(str.length - count, str.length);
}

function rJustify(str, length)
{
	_validateParameters(rJustify.arguments.length, 2, "rJustify");
	
	var result = new String(str);
	
	if(length > str.length)
	{
		var count = length - str.length;
		for(var i=0; i < count; i++)
		{
			result = " " + result;
		}
	}		
	
	return result;
}

function spanIncluding(str, set)
{
	_validateParameters(spanIncluding.arguments.length, 2, "spanIncluding");
	
	var result = "";
	for (var i = 0; i < str.length; i++) 
	{
		var c = str[i];
		
		if (find(c, set) > 0) 
		{
			result = result + c;
		}
		else if(result.length >  0)
			break;
	}
	
    return result;
}

function stripCR(str)
{
	_validateParameters(stripCR.arguments.length, 1, "stripCR");
	
	var result = "";
	for (var i = 0; i < str.length; i++) 
	{
		if(str[i] != "\r")
			result = result + str[i];
	}
	
    return result;
}

function trim(str)
{
	_validateParameters(trim.arguments.length, 1, "trim");
	
	return str.replace(/^\s+|\s+$/g,'');
}

function uCase(str)
{
	_validateParameters(uCase.arguments.length, 1, "uCase");
	
	return str.toUpperCase();
}

function val(str)
{
	_validateParameters(val.arguments.length, 1, "val");
	
	var result = "";
	var number = 0;
	var gotDecimal = false;
	var foundNumber = false;
	var sign = 1;
	if (str.length > 0) 
	{
		if (str[0] == "-" || str[0] == "+")
		{
			if(str[0] == "-")
				sign = -1;
			str = str.substring(1);
		}
		 
		for (var i = 0; i < str.length; i++) 
		{
			if ((!isNaN(str[i]) && str[i] != " ") || (str[i] == "." && !gotDecimal)) 
			{
				if (str[i] == ".") 
					gotDecimal = true;
				result = result + str[i];
				foundNumber = true;
				
			}
			else 
				if (foundNumber || str[i] != " ") 
					break;
		}
		
		if (result != "") 
			number = new Number(result).valueOf();
	}
		
	return number*sign;
}

function reFind(expression, str, start, returnSubExpression)
{
	_validateParameters(reFind.arguments.length, 2, "reFind");
	
	return _refind(expression, str, start, returnSubExpression, false);
}

function reFindNoCase(expression, str, start, returnSubExpression)
{
	_validateParameters(reFindNoCase.arguments.length, 2, "reFindNoCase");
	
	return _refind(expression, str, start, returnSubExpression, true);
}

function reEscape(regexExpr)
{
	_validateParameters(reEscape.arguments.length, 1, "reEscape");
	
	return ____escapeRegExp(regexExpr);
}

function reverse(str)
{
	_validateParameters(reverse.arguments.length, 1, "reverse");
	
	var result = "";
	for(var i = str.length -1 ; i >=0 ; --i)
	{
		result = result + str[i];
	}
	
	return result;
}

function inputBaseN(str, radix)
{
	_validateParameters(inputBaseN.arguments.length, 2, "inputBaseN");
	return parseInt(str, radix);
}

function _refind(expression, str, start, returnSubExpression, ignoreCase)
{
	
	if("undefined" == typeof start || start < 1)
		start = 1;
		
	start = start -1;
	
	if("undefined" == typeof returnSubExpression)
		returnSubExpression = false;
		
	var searchString = str.substring(start);
	
	var adjustedRegex = _adaptPOSIXRegex(expression);
	var modifier = "";
	if(find("(?m)",adjustedRegex) > 0)
	{
		adjustedRegex = replace(adjustedRegex,"(?m)","");
		modifier = modifier + "m";
	}
	if(find("\\A",adjustedRegex) > 0)
		adjustedRegex = replace(adjustedRegex,"\\A","^");
	
	var pattern = new RegExp(adjustedRegex,modifier);
	
	if(ignoreCase)
	{
		modifier = modifier + "i";
		pattern = new RegExp(adjustedRegex, modifier);
	}
	
	searchResult = pattern.exec(searchString);
	if (searchResult != null) 
	{
	
		if (!returnSubExpression) 
			return Math.floor(searchResult["index"] + 1 + start);
		else 
		{
			var result = new Object();
			var lenArray = new Array();
			var posArray = new Array();
			if (searchResult == null) 
			{
				lenArray[0] = 0;
				posArray[0] = 0;
			}
			else
			{
				for(var i=0;i<searchResult.length;i++)
				{					
					lenArray[i] = searchResult[i].length;
					posArray[i] = Math.floor(searchResult["index"]  + 1 + start);					
				}
				
			}			
			result["len"] = lenArray;
			result["pos"] = posArray;
			
			return result;
		}
	}
	return 0;
	
	
}

function reMatch(expression, str)
{
	_validateParameters(reMatch.arguments.length, 2, "reMatch");
	
	return _ReMatch(expression, str, false);
}

function reMatchNoCase(expression, str)
{
	_validateParameters(reMatch.arguments.length, 2, "reMatch");
	
	return _ReMatch(expression, str, true);
}

function replace(str, subStr1, subStr2, scope)
{
	_validateParameters(replace.arguments.length, 3, "replace");
	
	if(typeof scope == "undefined")
		scope = "one";
		
	if(scope.toLowerCase() != "one" && scope.toLowerCase() != "all")
		throw "Invalid Scope";
	
	return _replace(str, subStr1, subStr2, scope, false);
}

function replaceNoCase(str, subStr1, subStr2, scope)
{
	_validateParameters(replaceNoCase.arguments.length, 3, "replaceNoCase");
	
	if(typeof scope == "undefined")
		scope = "one";
		
	if(scope.toLowerCase() != "one" && scope.toLowerCase() != "all")
		throw "Invalid Scope";
	
	return _replace(str, subStr1, subStr2, scope, true);
}

function reReplace(str, subStr1, subStr2, scope)
{
	_validateParameters(reReplace.arguments.length, 3, "reReplace");
	
	if(typeof scope == "undefined")
		scope = "one";
		
	if(scope.toLowerCase() != "one" && scope.toLowerCase() != "all")
		throw "Invalid Scope";
	
	return _rereplace(str, subStr1, subStr2, scope, false);
}

function reReplaceNoCase(str, subStr1, subStr2, scope)
{
	_validateParameters(reReplaceNoCase.arguments.length, 3, "reReplaceNoCase");
	
	if(typeof scope == "undefined")
		scope = "one";
		
	if(scope.toLowerCase() != "one" && scope.toLowerCase() != "all")
		throw "Invalid Scope";
	
	return _rereplace(str, subStr1, subStr2, scope, true);
}

function ____escapeRegExp(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

function _replace(str, subStr1, subStr2, scope, ignoreCase)
{
	var regExScope = "";
	if(scope.toLowerCase() == "all")
		regExScope = "g";
		
	if(ignoreCase)
		regExScope = regExScope + "i";
		
	var adjustedRegex = ____escapeRegExp(subStr1);
	
	var regEx = new RegExp(adjustedRegex, regExScope);
	return str.replace(regEx, subStr2);
	
	
	
}

function _rereplace(str, subStr1, subStr2, scope, ignoreCase)
{
	var regExScope = "";
	if(scope.toLowerCase() == "all")
		regExScope = "g";
		
	if(ignoreCase)
		regExScope = regExScope + "i";
		
	var adjustedRegex = _adaptPOSIXRegex(subStr1);
	if(adjustedRegex == subStr1)
	{
		//if there is regex of type [xyz] don't escape
		if(find("[",subStr1) == 0 && find("]",subStr1) == 0)			
			adjustedRegex = ____escapeRegExp(subStr1);//escape in case we have not adjusted posix notation
	}
	
	//adjust any $ in substitution string
	var regEx = new RegExp(____escapeRegExp("$"),"g");
	var subStr = subStr2.replace(regEx,"$$$$");
	subStr =  _adaptPOSIXRegex(subStr);
	
	var regEx = new RegExp(adjustedRegex, regExScope);
	return str.replace(regEx, subStr);
	
}

function _ReMatch(expression, str, ignoreCase)
{
	
	var pattern = new RegExp(expression,"g");
	
	if(ignoreCase)
		pattern = new RegExp(expression, "gi");
		
	var searchResult= pattern.exec(str);
	var result = new Array();
	var index = 0;
	while (searchResult != null) 
	{		
		result[index] = searchResult[0];
		++index;
		searchResult = pattern.exec(str);
	}
	
	return result;
}

function toString(obj)
{
	_validateParameters(toString.arguments.length, 1, "toString");
	
	if("object" != typeof obj)
		return obj.toString();
		
	return obj + "";
	
}

function wrap(str, limit, strip)
{
	_validateParameters(wrap.arguments.length, 2, "wrap");
	
	var result = "";
	var count = 0;
	for(var i=0; i < str.length; i++)
	{
		if((str[i] != "\n" && str[i] != "\r") || !strip)
		{
			result = result + str[i];
			if(str[i] != "\n" && str[i] != "\r")			
				++count;
			else
				count = 0;
		}
		
		if(count == limit)
		{
			count = 0;
			result = result + "\n";
		}
		
	}
		
	return result;
}


function _isAlphabetic(str)
{
	return /^[a-zA-Z]+$/.test(str);
}

function _compareStr(a, b, caseSensitive)
{
    if (caseSensitive) 
    {
        if (a < b) 
            return -1;
        if (a > b) 
            return 1;
        return 0;
    }
    else 
    {
        if (a.toLowerCase() < b.toLowerCase()) 
            return -1;
        if (a.toLowerCase() > b.toLowerCase()) 
            return 1;
        return 0;
    }
}

function _adaptPOSIXRegex(expression)
{
	var _expression = expression;
	var regEx = new RegExp("\\[\\[:space:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "\\s");
	
	regEx = new RegExp("\\[\\[:alnum:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[A-Za-z0-9]");
	
	regEx = new RegExp("\\[\\[:alpha:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[A-Za-z]");
	
	regEx = new RegExp("\\[\\[:blank:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[ \\t]");
	
	regEx = new RegExp("\\[\\[:cntrl:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[\\x00-\\x1F\\x7F]");
	
	regEx = new RegExp("\\[\\[:digit:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[0-9]");
	
	regEx = new RegExp("\\[\\[:graph:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[\\x21-\\x7E]");
	
	regEx = new RegExp("\\[\\[:lower:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[a-z]");
	
	regEx = new RegExp("\\[\\[:print:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[\\x20-\\x7E]");
	
	regEx = new RegExp("\\[\\[:punct:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, '[!"#$%&\'()\\[\\]*+,./:;<=>?@\^_`{|}~-]');		
	
	regEx = new RegExp("\\[\\[:upper:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[A-Z]");
	
	regEx = new RegExp("\\[\\[:xdigit:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[A-Fa-f0-9]");
	
	regEx = new RegExp("\\[\\[:word:\\]\\]", "gi");	
	_expression =  _expression.replace(regEx, "[A-Za-z0-9_]");
	
	regEx = new RegExp("\\\\Z", "g");	
	_expression =  _expression.replace(regEx, "$");	
	
	return _expression;
}

