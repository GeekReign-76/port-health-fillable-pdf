function isBoolean(obj)
{
	_validateParameters(isBoolean.arguments.length, 1, "isBoolean");
	
	if(obj == null || "undefined" == typeof obj)
		return false;
		
	if(typeof obj == "boolean" || obj instanceof Boolean)
		return true;
	
	return false;
}

function isDefined(obj)
{
	_validateParameters(isDefined.arguments.length, 1, "isDefined");
	
	if(obj == null || "undefined" == typeof obj)
		return false;
		
	var keys = obj.split(".");
	var tempObj = null;
	var defined = true;
	
	for(var i=0; i<keys.length;i++)
	{		
		var temp = keys[i];
		if(typeof temp == "string")
			temp = temp.toLowerCase();
		
		if(i == 0)
		{
			
			if("undefined" == typeof window[temp])
			{
				defined = false;
				break;
			}
			else
				tempObj = window[temp];
		}
		else
		{
			if (! temp in tempObj) 
			{
				defined = false;
				break;
			}
			else
				tempObj = tempObj[temp];
		}		
	}
	
	return defined;
}

function isNull(obj)
{
	_validateParameters(isNull.arguments.length, 1, "isNull");
	
	if(obj == null || "undefined" == typeof obj)
		return true;
	else
	{
		var result = eval(obj);
		
		if(result == null || "undefined" == typeof result)
			return true;
	}
	
	return false;
}

function isNumeric(obj)
{
	_validateParameters(isNumeric.arguments.length, 1, "isNumeric");
	
	if(obj == null || "undefined" == typeof obj || obj instanceof Array)
		return false;
	
	return ! isNaN(obj);
}

function isSimpleValue(obj)
{
	_validateParameters(isSimpleValue.arguments.length, 1, "isSimpleValue");
	
	if(obj == null || "undefined" == typeof obj)
		return false;
	else
	{
		if(typeof obj == "date" || typeof obj == "number" || typeof obj == "string" ||
			typeof obj == "boolean")
			return true;
	}
	
	return false;
}

function isValid(type, value, min, max)
{
	_validateParameters(isValid.arguments.length, 2, "isValid");
	
	var i,digit,sum=0;
	
		switch(type.toLowerCase())
		{
			case "any": 	return (typeof value !== 'undefined');//isSimpleValue(value);
			case "array": 	return isArray(value);
			case "date": 	return isDate(value);
			case "boolean":	return isBoolean(value);
			case "email": 	return isValid("regex",value,/(^[a-z0-9]([a-z_\.0-9]*)@([a-z_\.0-9]*)([.][a-z]{2,4})$)/i);
			case "eurodate":return isDate(value);
			case "float": 	return isNumeric(value);
			case "guid": 	return isValid("regex",value,/(^[0-9-a-fA-F]{8}-([0-9-a-fA-F]{4}-){3}[0-9-a-fA-F]{12}$)/);
			case "integer": return isValid("regex",value,/(^-?\d\d*$)/);
			case "numeric": return isNumeric(value);
			case "range": 	return (((value*1) >= min) && ((value*1) <= max))? true:false;
			case "regex": 	return value.toString().match(min) ? true:false;
			case "regular_expression": 	isValid("regex",value,min);
			case "social_security_number": 	return isValid("ssn",value);
			case "ssn": 	return isValid("regex",value,/^([0-9]\d{2}|7[0-9]\d|77[0-9])([ \-]?)(\d{2})\2(\d{4})$/);
			case "string": 	return isString(value);
			case "struct": 	return isStruct(value);
			case "telephone":return isValid("regex",value,/^(\([1-9]\d{2}\)\s?|[1-9]\d{2}[\.\-])?\d{3}[\.\-]\d{4}$/);
			case "time": 	return isDate(value);
			case "url": 	return isValid("regex",value,/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i);
			case "uuid": 	return isValid("regex",value,/(^[0-9-a-fA-F]{8}-[0-9-a-fA-F]{4}-[0-9-a-fA-F]{4}-[0-9-a-fA-F]{16}$)/);
			case "variablename": return isValid("regex",value,/(^[a-zA-Z_][0-9a-zA-Z_]*$)/);
			case "zipcode": return isValid("regex",value,/(^\d{5}$)|(^\d{5}-\d{4}$)/);
			case "creditcard": 
				if(!isValid("range",value.length,13,16))
					return false;
				for (i=(2-(value.length % 2)); i<=value.length; i+=2)
				{
					sum += parseInt(value.charAt(i-1),10);
				}
				for (i=(value.length % 2) + 1; i<value.length; i+=2)
				{
					digit = parseInt(value.charAt(i-1),10) * 2;
					sum += (digit < 10)? digit : (digit-9); 
				}
				return ((sum % 10) === 0) ? true : false;			
		}
	
	
}


function decimalFormat(number)
{
	_validateParameters(decimalFormat.arguments.length, 1, "decimalFormat");

	var num = number.toFixed(2); 
	return _addCommas(num);
}

function dollarFormat(number)
{
	_validateParameters(dollarFormat.arguments.length, 1, "dollarFormat");

	var num = number.toFixed(2); 
	var decFormat = _addCommas(Math.abs(number));
	decFormat = "$" + decFormat;
	if(number < 0)
		decFormat = "(" + decFormat + ")";
		
	return decFormat;
}


function htmlEditFormat(str)
{
	_validateParameters(htmlEditFormat.arguments.length, 1, "htmlEditFormat");
	
	var result = "";
	
	for(var i =0; i<str.length; i++)
	{
		switch(str[i])
		{
			case '"':
			{
				result = result + '&quot;';
				break;
			}
			case '&':
			{
				result = result +  '&amp;';
				break;
			}
			case '>':
			{
				result = result + '&gt;';
				break;
			}
			case '<':
			{
				result = result + '&lt;';
				break;
			}
			default:
			{
				result = result + str[i];
				break;
			}
		}
	}
	
	return result;
	
}

function htmlCodeFormat(str)
{
	_validateParameters(htmlCodeFormat.arguments.length, 1, "htmlCodeFormat");
	
	return "<pre>" + htmlEditFormat(str) + "</pre>";
	
}

function numberFormat(number,mask)
{
	_validateParameters(numberFormat.arguments.length, 1, "numberFormat");
	
	return decimalFormat(number);
	
}

function createUUID()
{
    var d = new Date().getTime(); //get timestamp
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(singleChar) 
	{
        var num = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (singleChar == 'x' ? num : (num&0x7|0x8)).toString(16).toUpperCase();
    });
    return uuid;
};

function _addCommas(number)
{
	number += '';
	var tokens = number.split('.');
	token1 = tokens[0];
	var token2 = tokens.length > 1 ? '.' + tokens[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(token1)) 
	{
		token1 = token1.replace(rgx, '$1' + ',' + '$2');
	}
	return token1 + token2;
}

function getBaseTagList()
{
	return cfclient.getCustomTagList();
}

function getBaseTagData(tagname, number)
{
	return cfclient.getCustomTagData(tagname, number);
}

function _setCFQueryProperties(aQuery, columns, data,length,recordCount,columnList,currentRow)
{
	  aQuery["COLUMNS"] = columns;
	  aQuery["DATA"]= data;
	  aQuery["__QUERY__"] = true;
	  aQuery["length"] = length;
	  aQuery["recordCount"] = length;
	  aQuery["columnList"] = columnList;
	  aQuery["currentRow"] = currentRow;	 
}

function _toCFQueryRowFormat(q1)
{
	  var len = q1.length, i;
	  var first = true;
	  var aQuery = new Object();
	  var queryRows = [];
	  var colList = [];
	  for (i = 0; i < len; i++) 
	  {
	  	var aRow = q1.item(i);
	  	var aRecord = [];
		for(var key in aRow)
		{
			if(aRow.hasOwnProperty(key))
			{
				aRecord.push(aRow[key]);
				if(first)
				{
					colList.push(key);
				}
			}
		}
		first = false;	
		queryRows.push(aRecord);
	  }		
	  _setCFQueryProperties(aQuery,colList,queryRows,q1.length,q1.length,colList,queryRows[0]);	  
	  return aQuery;
}

function _toCFQueryColumnFormat(qResult)
{
	  var q1 = qResult.rows;
	  var len = q1.length, i;
	  var first = true;
	  var aQuery = new Object();
	  var queryCols = {};
	  var colList = [];
	  for (i = 0; i < len; i++) 
	  {
	  	var aRow = q1.item(i);
		for(var key in aRow)
		{
			if(aRow.hasOwnProperty(key))
			{
				if(first)
				{
					colList.push(key);
					queryCols[key] = [];
				}
				queryCols[key].push(aRow[key]);
			}
		}
		first = false;	
	  }	
      var firstRow = [];
      for (i = 0; i < colList.length; i++) 
      {
            var colName = colList[i];
            firstRow.push(queryCols[colName][0]);
      } 	  
     
	  _setCFQueryProperties(aQuery,colList,queryCols,q1.length,q1.length,colList,firstRow);
	   aQuery["ROWCOUNT"]= q1.length;
	  return aQuery;
}

function _queryRowToColumnFormat(qry)
{
	if(qry.hasOwnProperty("ROWCOUNT") || qry.hasOwnProperty("rowcount"))
	{
		return qry;
	}
	else
	{
	  var len = qry.length;
	  var first = true;
	  var queryCols = {};
	  var data = qry["DATA"];
	  var colList = qry["columnList"];	  
	  for (var i = 0; i < len; i++) 
	  {
	  	var aRow = data[i];
	  	for (var j = 0; j < aRow.length; j++) 
		{
		 	if(first)
			{
				queryCols[colList[j]] = [];
			}
			queryCols[colList[j]].push(aRow[j]);
		}
		first = false;
	  }		
	  qry["DATA"]= queryCols;
	  qry["ROWCOUNT"]= qry.length;
      var firstRow = [];
      for (var i = 0; i < colList.length; i++) 
      {
            var colName = colList[i];
            firstRow.push(queryCols[colName][0]);
      } 	  
	  qry["currentRow"] = firstRow;
	  return qry;
	}
}

function _getQueryRow(qry, rowNum)
{
	var qRow = new Object();
	for (var i = 0; i < qry.columnList.length; i++) 
	{
		var colName= qry.columnList[i];
		qRow[colName] = qry["DATA"][colName][rowNum];
	}
	return qRow;
}

function isQuery(q1)
{
	return typeof q1 !== 'undefined' && q1.hasOwnProperty("__QUERY__");
}


