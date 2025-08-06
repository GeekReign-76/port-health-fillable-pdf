function abs(number)
{
	_validateParameters(abs.arguments.length, 1, "abs");
	
	return Math.abs(number);
}

function aCos(number)
{
	_validateParameters(aCos.arguments.length, 1, "aCos");
	
	if(number < -1 || number > 1)
		throw number+" must be within range ( -1 : 1 )"
	
	return Math.acos(number);
}

function aSin(number)
{
	_validateParameters(aSin.arguments.length, 1, "aSin");
	
	if(number < -1 || number > 1)
		throw number+" must be within range ( -1 : 1 )"
	
	return Math.asin(number);
}

function atn(number)
{
	_validateParameters(atn.arguments.length, 1, "atn");
	return Math.atan(number);
}

function bitAND(number1, number2)
{
	_validateParameters(bitAND.arguments.length, 2, "bitAND");
	return number1 & number2;
}

function bitMaskClear(number, start, len)
{
	_validateParameters(bitMaskClear.arguments.length, 3, "bitMaskClear");
	
	if(start > 31 || start < 0)
		throw "Invalid argument: start should be within 0 and 31";
		
	if(len > 31 || len < 0)
		throw "Invalid argument: length should be within 0 and 31";
		
	return number & ~ ( ( ( 1 << len ) - 1 ) << start );
}

function bitMaskRead(number, start, len)
{
	_validateParameters(bitMaskRead.arguments.length, 3, "bitMaskRead");
	
	if(start > 31 || start < 0)
		throw "Invalid argument: start should be within 0 and 31";
		
	if(len > 31 || len < 0)
		throw "Invalid argument: length should be within 0 and 31";
		
	return ( number >> start ) & ( ( 1 << len ) - 1 );
}

function bitMaskSet(number, mask, start, len)
{
	_validateParameters(bitMaskSet.arguments.length, 4, "bitMaskSet");
	
	if(start > 31 || start < 0)
		throw "Invalid argument: start should be within 0 and 31";
		
	if(len > 31 || len < 0)
		throw "Invalid argument: length should be within 0 and 31";
		
	var m = ( ( 1 << len ) - 1 ) << start; 
    mask &= ( ( 1 << len ) - 1 ); 
    return ( number & ~m ) | ( mask << start );
}

function bitNOT(number)
{
	_validateParameters(bitNOT.arguments.length, 1, "bitNOT");
	
	return ~number;
}

function bitOR(number1, number2)
{
	_validateParameters(bitOR.arguments.length, 2, "bitOR");
	
	return number1 | number2;
}

function bitShln(number, count)
{
	_validateParameters(bitShln.arguments.length, 2, "bitShln");
	
	return number << count;
}

function bitShrn(number, count)
{
	_validateParameters(bitShrn.arguments.length, 2, "bitShrn");
	
	return number >>> count;
}

function bitXOR(number1, number2)
{
	_validateParameters(bitXOR.arguments.length, 2, "bitXOR");
	
	return number1 ^ number2;
}

function ceiling(number)
{
	_validateParameters(ceiling.arguments.length, 1, "ceiling");
	
	return Math.ceil(number);
}

function cos(number)
{
	_validateParameters(cos.arguments.length, 1, "cos");
	
	return Math.cos(number);
}

function decrementValue(number)
{
	_validateParameters(decrementValue.arguments.length, 1, "decrementValue");
	
	return fix(number) - 1;
}

function exp(number)
{
	_validateParameters(exp.arguments.length, 1, "exp");
	
	return Math.exp(number);
}

function fix(number)
{
	_validateParameters(fix.arguments.length, 1, "fix");
	
	return number == 0.0 ? 0.0 : (number > 0 ? Math.floor(number) : Math.ceil(number));
}

function incrementValue(number)
{
	_validateParameters(incrementValue.arguments.length, 1, "incrementValue");
	
	return fix(number + 1);
}

function int(number)
{
	_validateParameters(int.arguments.length, 1, "int");
	
	return Math.floor(number);
}

function log(number)
{
	_validateParameters(log.arguments.length, 1, "log");
	
	return Math.log(number);
}

function log10(number)
{
	_validateParameters(log10.arguments.length, 1, "log10");
	
	return Math.log(number)/ Math.LN10;
}

function max(number1, number2)
{
	_validateParameters(max.arguments.length, 2, "max");
	
	return number1 >= number2 ? number1 : number2;
}

function min(number1, number2)
{
	_validateParameters(min.arguments.length, 2, "min");
	
	return number1 <= number2 ? number1 : number2;
}

function pi()
{
	return 3.14159265358979;
}

function rand()
{
	return Math.random();
}

function randomize(number)
{
	_validateParameters(randomize.arguments.length, 1, "randomize");
	
	return Math.floor((Math.random() * number) + 1);
}

function randRange(number1, number2)
{
	_validateParameters(randRange.arguments.length, 2, "randRange");
	
	return Math.floor(Math.random()*(number2-number1+1)+number1);
}

function round(number)
{
	_validateParameters(round.arguments.length, 1, "round");
	
	return Math.round(number);
}

function sgn(number)
{
	_validateParameters(sgn.arguments.length, 1, "sgn");
	
	if(number > 0)
		return 1;
	else if(number < 0)
		return -1;
		
	return 0;
}

function sin(number)
{
	_validateParameters(sin.arguments.length, 1, "sin");
	
	return Math.sin(number);
}

function sqr(number)
{
	_validateParameters(sqr.arguments.length, 1, "sqr");
	
	return Math.sqrt(number);
}

function tan(number)
{
	_validateParameters(tan.arguments.length, 1, "tan");
	
	return Math.tan(number);
}
