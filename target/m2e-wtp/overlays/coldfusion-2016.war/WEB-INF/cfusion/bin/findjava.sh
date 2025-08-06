#!/bin/bash
# Look for a workable Java executable.


_JAVACMD=""

# first try standalone jre
if [ -x $CFUSION_HOME/../jre/bin/java ]
then
	_JAVACMD=$CFUSION_HOME/../jre/bin/java
         JAVA_HOME=$CFUSION_HOME/../jre
    #For 64-bit Solaris Java VM load the path from sparc9 directory
    if [ -x $CFUSION_HOME/../jre/bin/sparcv9/java ]
       then
	 _JAVACMD=$CFUSION_HOME/../jre/bin/sparcv9/java
    fi

# Incase of Mac installation jre path is different 
elif [ -x $CFUSION_HOME/../jre/Contents/Home/jre/bin/java ]
then
	_JAVACMD=$CFUSION_HOME/../jre/Contents/Home/jre/bin/java
         JAVA_HOME=$CFUSION_HOME/../jre/Contents/Home/jre

# Incase Mac installation if jre path is changed later 
elif [ -x $CFUSION_HOME/../jre/Contents/Home/bin/java ]
then
	_JAVACMD=$CFUSION_HOME/../jre/Contents/Home/bin/java
         JAVA_HOME=$CFUSION_HOME/../jre/Contents/Home

# standalone but CFUSION_HOME not defined and in scripts directory
elif [ -x ../../jre/bin/java ]
then
	_JAVACMD=../../jre/bin/java
    JAVA_VER=$($_JAVACMD -version 2>&1 | sed 's/java version "\(.*\)\.\(.*\)\..*"/\1\2/; 1q')
	[ "$JAVA_VER" -ge 17 ] || echo "$_JAVACMD is not a supported version of Java. Set JAVA_HOME environment variable to 1.7 or later."
# pointed to by JAVA_HOME
elif [ "$JAVA_HOME" != "" -a -x "$JAVA_HOME/bin/java" ]
then
	_JAVACMD=$JAVA_HOME/bin/java
    JAVA_VER=$($_JAVACMD -version 2>&1 | sed 's/java version "\(.*\)\.\(.*\)\..*"/\1\2/; 1q')
	if [ "$JAVA_VER" -lt 17 ]
	then
	    echo "$_JAVACMD is not a supported version of Java. Set JAVA_HOME environment variable to Java 1.7 or later."
		exit 1
	fi
# in the system path
else
	type java > /dev/null 2>&1 
	if [ $? -eq 0 ]
	then
		_JAVACMD=java
	    JAVA_VER=$($_JAVACMD -version 2>&1 | sed 's/java version "\(.*\)\.\(.*\)\..*"/\1\2/; 1q')
	    if [ "$JAVA_VER" -lt 17 ]
		then
		    echo "Java in the system path is not a supported. Set java in the system path or set JAVA_HOME environment variable to Java 1.7 or later."
			exit 2
		fi
	fi
fi

if [ -z "${_JAVACMD}" ]
then
	echo ""
	echo "Unable to find java command. Please set the JAVA_HOME environment variable."
	echo ""
	exit 3
fi


