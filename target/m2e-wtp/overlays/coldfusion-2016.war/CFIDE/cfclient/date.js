function createDate(_Year, _Month, _Day)
{
	_validateParameters(createDate.arguments.length, 3, "createDate");
	
	if(_Month < 1 || _Month > 12)
		throw "Invalid Day Month combination";
		
	if(_Day < 1 || _Day > 31)
		throw "Invalid Day of Month";
		
	if(_Year >=0 && _Year <= 29)
		_Year = parseInt(_Year) + 2000; //add 2000 to match CF behavior as by default JS dates start from 1900
	else if (_Year > 29 && _Year <= 99)
		_Year = parseInt(_Year) + 1900;
	
	_Month = _Month - 1;
	
	var retDate = new Date(_Year, _Month, _Day);
	
	if(day(retDate) != _Day && month(retDate) != _Month)
		throw "Invalid Day and Month combination";
		
	return retDate;	
	
}

function createDateTime(Year, Month, Day, Hour, Minutes, Seconds)
{
	_validateParameters(createDateTime.arguments.length, 6, "createDateTime");
	
	if(Month < 1 || Month > 12)
		throw "Invalid Day Month combination";
		
	if(Day < 1 || Day > 31)
		throw "Invalid Day of Month";
		
	if(Year >=0 && Year <= 29)
		Year = parseInt(Year) + 2000; //add 2000 to match CF behavior as by default JS dates start from 1900
	else if (Year > 29 && Year <= 99)
		Year = parseInt(Year) + 1900;
	
	Month = Month - 1;
	
	if(Hour < 0 || Hour > 23)
		throw "Invalid Hour value";
	if(Minutes < 0 || Minutes > 59)
		throw "Invalid mintute value";
	if(Seconds < 0 || Seconds > 59)
		throw "Invalid Second value";
	
	return new Date(Year, Month, Day, Hour, Minutes, Seconds);
}

function createTime(Hour, Minutes, Seconds)
{
	_validateParameters(createTime.arguments.length, 3, "createTime");
	
	if(Hour < 0 || Hour > 23)
		throw "Invalid Hour value";
	if(Minutes < 0 || Minutes > 59)
		throw "Invalid mintute value";
	if(Seconds < 0 || Seconds > 59)
		throw "Invalid Second value";
	
	return new Date(1899, 11, 30, Hour, Minutes, Seconds);
}

function createTimespan(Days, Hour, Minutes, Seconds)
{
	_validateParameters(createTimespan.arguments.length, 4, "createTimespan");
	
	return Days + ( ( Seconds / 60 + Minutes ) / 60 + Hour ) / 24 ;
}

function _dateadd(date, dp, _number)
{
	return dateAdd(dp, _number, date);
}

function dateAdd(dp, _number, date)
{
	_validateParameters(dateAdd.arguments.length, 3, "dateAdd");	
	
	var number = new Number(_number);
		
	var Year = datePart("yyyy",date);
	var Month = datePart("m",date);
	var Day = datePart("y",date);
	var DayOfMonth = date.getDate();
	var Hours = date.getHours();
	var Minutes = date.getMinutes();
	var Seconds = date.getSeconds();
	
	var DaysInYear = 365;
	if(isLeapYear(Year))
		DaysInYear = 366;
			
	var _dp = dp.toLowerCase();
	if(_dp == "l" || _dp == "s" || _dp == "n" || _dp == "h" || _dp == "ww" || _dp == "d" || _dp == "y")
		return new Date(new Date(date).setMilliseconds( _getMilliSecondsForDatePart(_dp,number)));
	else if(_dp == "yyyy")
		Year = Year + number;
	else if(_dp == "m")
	{		
		var offset = Month + number;
		if(offset <0 )
			Year = -(Math.floor(-offset/12)) + Year;
		else
			Year = Math.floor(offset/12) + Year;
			
		Month = offset%12;
	}
	else if(_dp == "q")
	{
		var qToAdd = number*3;
		return dateAdd("m",qToAdd,date);
	}
	else if(_dp == "w")
	{
		var DayOfWeek = dayOfWeek(date);
		var retDate = new Date(date.getTime());

	    var _Day = retDate.getDay();
		var offset = 0;
		if(number >= 0)
		{
			offset = DayOfWeek - 2;
			if(offset >= 5)
				offset -= 7;
		}
		else
		{
			offset = -(6 - DayOfWeek); 
            if (offset <= -5)
                offset += 7;  
		}
		
		retDate = dateAdd("d", -offset, retDate);
		if(DayOfWeek == 1 || DayOfWeek == 7)
		{
			offset = 0;
			if(number > 0)
				number -= 1;
			else if (number < 0)
				number += 1;
		}
		number += offset;
		
		if(number < 0)
			offset = -(Math.floor(-number/5))*7 + (number % 5);
		else
			offset = Math.floor(number/5)*7 + (number % 5);
			
		retDate = dateAdd("d", offset, retDate);
	
	    return retDate;
	}
		
	return new Date(Year, Month -1, DayOfMonth, Hours, Minutes, Seconds);
	
	
	function _getMilliSecondsForDatePart(dPart, number)
	{
		switch(dPart)
		{
			case "l":
				return number;
			case "s":
				return number * 1000;
			case "n":
				return number * 1000 * 60;
			case "h":
				return number * 1000 * 3600;
			case "ww":
				return number * 86400000 * 7;
			case "d":
				return number * 3600000 * 24;	
			case "y":
				return number * 3600000 * 24;
			
		}
	}	
	
}

function dateCompare(date1, date2, datePart)
{
	_validateParameters(dateCompare.arguments.length, 2, "dateCompare");
	
	if("undefined" == typeof datePart)
		datePart = "s";
		
	var part1 = date1;
	var part2 = date2;
	
	var compareLevel = getCompareLevel(datePart);
	var result = 0;
	
	for (var currentLevel = 1; currentLevel <= compareLevel; currentLevel++) 
	{
		if (currentLevel == 1) 
		{
			part1 = date1.getFullYear();
			part2 = date2.getFullYear();
		}
		else if (currentLevel == 2)
		{
			part1 = date1.getMonth();
			part2 = date2.getMonth();
		}
		else if (currentLevel == 3)
		{
			part1 = date1.getDate();
			part2 = date2.getDate();
		}
		else if (currentLevel == 4)
		{
			part1 = date1.getHours();
			part2 = date2.getHours();
		}
		else if (currentLevel == 5)
		{
			part1 = date1.getMinutes();
			part2 = date2.getMinutes();
		}
		else if (currentLevel == 6)
		{
			part1 = date1.getSeconds();
			part2 = date2.getSeconds();
		}
		
		result = checkParts(part1, part2);
		if (result == 0 && compareLevel > currentLevel) 
			continue;
		else 
			return result;
	}
	
	return result;
	
	
	function checkParts(part1, part2)
	{
		if (part1 > part2) 
			return 1;
		else 
			if (part1 < part2) 
				return -1;
			else 
				return 0;
	}
	
	
	function getCompareLevel(datePart)
	{
	
	
		switch (datePart.toLowerCase())
		{
			case "s":
			{
				part1 = date1.getSeconds();
				part2 = date2.getSeconds();
				return 6;
			}
			case "n":
			{
				part1 = date1.getMinutes();
				part2 = date2.getMinutes();
				return 5;
			}
			case "h":
			{
				part1 = date1.getHours();
				part2 = date2.getHours();
				return 4;
			}
			case "d":
			{
				part1 = date1.getDate();
				part2 = date2.getDate();
				return 3;
			}
			case "m":
			{
				part1 = date1.getMonth();
				part2 = date2.getMonth();
				return  2;
			}
			case "yyyy":
			{
				part1 = date1.getFullYear();
				part2 = date2.getFullYear();
				return 1;
			}
			default:
				return 6;
		}
		
	}	
	
	
}

function _dateconvert(date, conversionType)
{
	return dateConvert(conversionType, date);
}

function dateConvert(conversionType, date)
{
	_validateParameters(dateConvert.arguments.length, 2, "dateConvert");
	
	if(conversionType.toLowerCase() == "localtoutc")
		return new Date(date.toUTCString());
	else if(conversionType.toLowerCase() == "utctolocal")
		return new Date(date.toLocaleDateString());
	
	return date;
}

function _datediff(date2, datePart, date1)
{
	return dateDiff(datePart, date1, date2);
}

function dateDiff(datePart, date1, date2)
{
	_validateParameters(dateDiff.arguments.length, 3, "dateDiff");
	
	var timeDiff = date2.getTime() - date1.getTime();
	var sign = (timeDiff < 0) ? -1 : 1;
	timeDiff = Math.abs(timeDiff);	
	var result = 0;
	switch(datePart.toLowerCase())
	{
		case "s":
		{			
			result = Math.floor(timeDiff / (1000));
			break;
		}
		case "n":
		{
			result =  Math.floor(timeDiff / (1000 * 60));
			break;
		}
		case "h":
		{
			result =  Math.floor(timeDiff / (1000 * 60 * 60));
			break;
		}
		case "d":
		{
			result =  Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			break;
		}
		case "w":
		{
			result =  Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
			break;
		}
		case "ww":
		{
			result = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
			break;
		}
		case "m":
		{
			var hoursDiff= date2.hour() - date1.hour();
			if(hoursDiff > 0)
				hoursDiff = -1;
			else if(hoursDiff < 0)
				hoursDiff = 1;
			var nYears  = date2.getUTCFullYear() - date1.getUTCFullYear();
			return (date2.month() - (date1.month()+ hoursDiff) + (nYears!=0 ? nYears*12 : 0));
		}
		case "q":
		{
			result = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 31 * 3));
			break;
		}
		case "y":
		{
			result = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			break;
		}
		case "yyyy":
		{
			result = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 31 * 12));
			break;
		}
		
	}	
	
	return result * sign;
}

function dateFormat(d, mask)
{
	_validateParameters(dateFormat.arguments.length, 1, "dateFormat");
	
	return _dateformat(d, mask);
}
function _dateformat(d, mask, formatType)
{   
	if("undefined" == typeof formatType)
		formatType = "dateFormat";
		
   var _mask = mask;   
  
    if ("undefined" == typeof _mask) 
    {
		if(formatType == "DateTimeFormat")
   			_mask = "dd-mmm-yyyy hh:nn:ss";
		else if(formatType == "TimeFormat")
			_mask = "hh:nn tt";
		else
			_mask = "dd-mmm-yy";
    }   						
	else if (_mask.toLowerCase() == "short") 
	{
		if(formatType == "DateTimeFormat")
			_mask = "m/D/yy hh:nn tt";
		else if (formatType == "TimeFormat")
			_mask = "h:nn tt";
		else
			_mask = "m/D/yy";
	}
	else if (_mask.toLowerCase() == "medium")
	{ 
		if(formatType == "DateTimeFormat")
			_mask = "mmm D, yyyy hh:nn:ss tt";
		else if (formatType == "TimeFormat")
			_mask = "h:nn:ss tt";
		else
			_mask = "mmm D, yyyy";
	}
	else if (_mask.toLowerCase() == "long")
	{ 
		if(formatType == "DateTimeFormat")
			_mask = "mmmm D, yyyy hh:nn:ss tt Z";
		else if (formatType == "TimeFormat")
			_mask = "h:nn:ss tt Z";
		else
			_mask = "mmmm D, yyyy";
	} 
	else if (_mask.toLowerCase() == "full")
	{ 
							
		if(formatType == "DateTimeFormat")
			_mask = "dddd, mmmm D, yyyy hh:nn:ss tt Z";
		else if (formatType == "TimeFormat")
			_mask = "h:nn:ss tt Z";
		else
			_mask = "dddd, mmmm D, yyyy";
	}
   
    var m, makeZero;
    
    if (!(d instanceof Date)) 
    {
        d = new Date(d);
    }
    
    makeZero = function(value, length)
    {
        var i;
        if (!length) 
        {
            length = 2;
        }
        value = String(value);
        for (i = 0, zeros = ''; i < (length - value.length); i++) 
        {
            zeros += '0';
        }
        return zeros + value;
    };
		
	_mask = _mask.replace(new RegExp("k","g"),"H");
	_mask = _mask.replace(new RegExp("K","g"),"h");
	_mask = _mask.replace(new RegExp("nn","g"),"n");
	_mask = _mask.replace(new RegExp("a","g"),"tt");
	_mask = _mask.replace(new RegExp("G","g"),"z");	
	_mask = _mask.replace(new RegExp("H","g"),"%");
	_mask = _mask.replace(new RegExp("F","g"),";");
	_mask = _mask.replace(new RegExp("T","g"),"#");	
	_mask = _mask.toLowerCase();
	_mask = _mask.replace(new RegExp("%","g"),"H");
	_mask = _mask.replace(new RegExp(";","g"),"F");
	_mask = _mask.replace(new RegExp("#","g"),"T");
	
	if(formatType == "TimeFormat")
	{
		_mask = _mask.replace(new RegExp("m","g"),"M");
	}
    
    return _mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|e{1,4}|D{1}|w{1}|F{1}|m{1,4}|n{1,2}|y{1}|yy(?:yy)?|gg|([hHMstT])\1?|[lLZz])\b/g, function($0)
    {
		
        switch ($0)
        {
            case 'd':
                return d.getDate();
            case 'dd':
                return makeZero(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
			case 'e':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
            case 'eeee':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
			case 'F':
                {
					var _DayOfMonth = d.getDate();
					var count = 0;
				
					while(_DayOfMonth >= 1)
					{
						_DayOfMonth = _DayOfMonth - 7;
						count++;
					}
					
					return count;
				}
			case 'gg':
                return "AD";
            case 'm':
                return d.getMonth() + 1;
            case 'mm':
                return makeZero(d.getMonth() + 1);
            case 'mmm':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'mmmm':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
			case 'y':
                return String(d.getFullYear()).substr(2);
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
             case 'h':
                return (d.getHours() % 12);
            case 'hh':
                return d.getHours() === 0 ? "12": makeZero(d.getHours() % 12 );
            case 'H':
                return d.getHours();
            case 'HH':
                return makeZero(d.getHours());
            case 'M':
                return d.getMinutes();
            case 'MM':
                return makeZero(d.getMinutes());
			case 'n':
                return makeZero(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return makeZero(d.getSeconds());
            case 'l':
			{
				if(d.getMilliseconds() == 0)
					return 0;
				return makeZero(d.getMilliseconds(), 3);
			}
            case 'tt':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 't':
                return d.getHours() < 12 ? 'a' : 'p';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'T':
                return d.getHours() < 12 ? 'A' : 'P';
			case 'w':
                return week(d);
            case 'z':
                {
					var Now = d.toString();
					var timeZone = Now.indexOf('(') > -1 ?
					Now.match(/\([^\)]+\)/)[0].match(/[A-Z]/g).join('') :
					Now.match(/[A-Z]{3,4}/)[0];
					if (timeZone == "GMT" && /(GMT\W*\d{4})/.test(Now))
						 timeZone = RegExp.$1;
						 
					return timeZone;
				}
            // Return quoted strings with the surrounding quotes removed
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
}

function _datepart(date1, dp)
{
	return datePart(dp,date1);
}

function datePart(dp,date1)
{
	_validateParameters(datePart.arguments.length, 2, "datePart");
	
	if("undefined" == typeof dp)
		dp = "s";
		
	var part1 = date1.getSeconds();
	switch(dp.toLowerCase())
	{
		case "s":
		{
			part1 = date1.getSeconds();
			break;
		}
		case "n":
		{
			part1 = date1.getMinutes();
			break;
		}
		case "h":
		{
			part1 = date1.getHours();
			break;
		}
		case "d":
		{
			part1 = date1.getDate();
			break;
		}
		case "m":
		{
			part1 = date1.getMonth() + 1;
			break;
		}
		case "y":
		{
			var first = new Date(date1.getFullYear(), 0, 1);
			part1 = Math.round(((date1 - first) / 1000 / 60 / 60 / 24) + .5, 0);
			break;
		}
		case "yyyy":
		{
			part1 = date1.getFullYear();
			break;
		}
		case "w":
		{
			part1 = dayOfWeek(date1);
			break;
		}
		case "ww":
		{
			part1 = week(date1);
			break;
		}
		case "q":
		{
			part1 = quarter(date1);
			break;
		}
		
	}	
	
	return part1;
}

function day(date)
{
	_validateParameters(day.arguments.length, 1, "day");
	
	return date.getDate();
}

function dayOfWeek(date)
{
	_validateParameters(dayOfWeek.arguments.length, 1, "dayOfWeek");
	
	return date.getDay() + 1;
}

function dayOfWeekAsString(date)
{
	_validateParameters(dayOfWeekAsString.arguments.length, 1, "dayOfWeekAsString");
	
	if (date >= 1 && date <= 7) 
	{
	
		var Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return Days[date -1];
	}
	else
		throw date + " must be within range (1-7).";
	
}

function dayOfYear(date)
{
	_validateParameters(dayOfYear.arguments.length, 1, "dayOfYear");
	
	var first = new Date(date.getFullYear(), 0, 1);
	return Math.round(((date - first) / 1000 / 60 / 60 / 24) + .5, 0);
}

function daysInMonth(date)
{
	_validateParameters(daysInMonth.arguments.length, 1, "daysInMonth");
	
	return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
}

function daysInYear(date)
{
	_validateParameters(daysInYear.arguments.length, 1, "daysInYear");
	
	var Year = date.getFullYear();
	
	if(Year % 4 === 0 && (Year % 100 !== 0 || Year % 400 === 0)) 
        return 366;
    else
	    return 365;
}

function firstDayOfMonth(date)
{
	_validateParameters(firstDayOfMonth.arguments.length, 1, "firstDayOfMonth");
	
	date.setDate(1);
	
	var first = new Date(date.getFullYear(), 0, 1);
	return Math.round(((date - first) / 1000 / 60 / 60 / 24) + .5, 0);
}

function getHTTPTimeString(date)
{
	_validateParameters(getHTTPTimeString.arguments.length, 1, "getHTTPTimeString");
	
	return date.toUTCString();
}

function getTickCount()
{
	return new Date().getTime();
}

function getTimezoneInfo()
{
	var result = new Object();
	var date = new Date();
	var offset = date.getTimezoneOffset();	
	var correction = 1;
	if(offset < 0)
		correction = -1;
	result["utcTotalOffset"] = offset * 60;
	result["utcHourOffset"] = correction * Math.floor(Math.abs(offset/60));
	result["utcMinuteOffset"] = offset % 60;
	result["isDSTOn"] = false;
	
	return result;
}

function hour(date)
{
	_validateParameters(hour.arguments.length, 1, "hour");
	
	return date.getHours();
}

function isDate(date)
{
	_validateParameters(isDate.arguments.length, 1, "isDate");
	
	if(date instanceof Date)
		return true;		

	if(typeof date === "string")
	{
		if(/^[0-9a-zA-Z]*$/.test(date))
			return false;
			
		var d = parseDateTime(date + "");
	
		if(d == "Invalid Date")
			return false;
			
		if(d instanceof Date)
			return true;
	}
	
	return false;
}

function isLeapYear(yr)
{
    _validateParameters(isLeapYear.arguments.length, 1, "isLeapYear");
    
    if ((parseInt(yr) % 4) == 0) 
    {
        if (parseInt(yr) % 100 == 0) 
        {
            if (parseInt(yr) % 400 != 0) 
                return "false";
            if (parseInt(yr) % 400 == 0) 
                return "true";

        }
        if (parseInt(yr) % 100 != 0) 
            return "true";
    }
    if ((parseInt(yr) % 4) != 0) 
        return "false";

}

function isNumericDate(obj)
{
    _validateParameters(isNumericDate.arguments.length, 1, "isNumericDate");
    
	if(obj instanceof Date)
		return true;
		
	if(!isNaN(obj))
		return true;
	else if(obj instanceof String)
	{
		var date = parseInt(obj);
		if(! isNan(date))
			return true;
	}
   
   
   return false;

}

function minute(date)
{
    _validateParameters(minute.arguments.length, 1, "minute");
    
	return date.getMinutes();
}

function month(date)
{
    _validateParameters(month.arguments.length, 1, "month");
    
	return date.getMonth() + 1;
}

function monthAsString(date)
{
	_validateParameters(monthAsString.arguments.length, 1, "monthAsString");
	
	if (date >= 1 && date <= 31) 
	{
	
		var Months = ["January", "February", "March", "April", "May", "June", "July",
		"August", "September", "October", "November", "December"];
		return Months[date -1];
	}
	else
		throw date + " must be within range (1-31).";
	
}

function now()
{
	return new Date();
}

function parseDateTime(str, conversiontype)
{
	_validateParameters(parseDateTime.arguments.length, 1, "parseDateTime");
	
	var parsedDate = Date.parse(str);
	
	var date = new Date(parsedDate);
	
	if(typeof conversiontype == "undefined")
		conversiontype = "standard";
		
	if(conversiontype.toLowerCase() == "pop")
	{
		date = new Date(date.getTime() + date.getTimezoneOffset()*60*1000); 
	}	
	return date;
}

function quarter(date)
{
    _validateParameters(quarter.arguments.length, 1, "quarter");
    
	return Math.ceil((date.getMonth() + 1 )/3);
}

function second(date)
{
    _validateParameters(second.arguments.length, 1, "second");
    
	return date.getSeconds();
}

function timeFormat(d, mask)
{
    _validateParameters(timeFormat.arguments.length, 1, "timeFormat");
   		
	return _dateformat(d, mask, "TimeFormat");
}

function week(date)
{
    _validateParameters(week.arguments.length, 1, "week");
    
	var start = new Date(date.getFullYear(),0,1);
	return Math.ceil((((date - start) / 86400000) + start.getDay()+1)/7);
}

function year(date)
{
    _validateParameters(year.arguments.length, 1, "year");
    
	return date.getFullYear();	
}

function dateTimeFormat(d, mask)
{
    _validateParameters(dateTimeFormat.arguments.length, 1, "dateTimeFormat");
    
	if("undefined" == typeof mask)
		mask = "dd-mmm-yyyy HH:nn:ss";
		
	return _dateformat(d, mask, "DateTimeFormat");
}
