#!/bin/bash

# chkconfig: 345 90 14
# description: starts the ColdFusion MX server


PATH=/usr/xpg4/bin:/bin:/sbin:/usr/bin:/usr/sbin:$PATH
CFUSION_HOME=$(cd "$(dirname "$0")"; pwd)/..
IS_RUNNING="false"
IS_MAC="false"

CLASSPATH=$CFUSION_HOME/lib/wsproxyconfig.jar
. $CFUSION_HOME/bin/findjava.sh
JVM_ARGS="-server -Xms256m -Xmx512m"

CLASSPATH=$CLASSPATH:$JAVA_CLASSPATH
JAVA_LIBRARY_PATH=$JAVA_LIBRARYPATH
JAVA_EXECUTABLE=$_JAVACMD


ID=`id -u`

if [ "`uname`" = "Darwin" ]; then
  # nothing, on OSX we don't care about the user name.  We assume that the user running it has permission to do everything
  IS_MAC="true" 
elif [ ! $ID -eq 0 ]; then
	echo "You must be root to invoke wsproxyconfig."
	exit 1
fi

wsproxyconfig() {

	eval $CFSTART

}

case `uname` in

	SunOS)
		OS=Solaris
		LD_LIBRARY_PATH="$CFUSION_HOME/lib:$CFUSION_HOME/lib/_solaris/bin:$JAVA_LIBRARY_PATH"
                ARGS=$*
		CFSTART='LD_LIBRARY_PATH=$LD_LIBRARY_PATH; export LD_LIBRARY_PATH; cd $CFUSION_HOME/bin; $JAVA_EXECUTABLE -classpath $CLASSPATH $JVM_ARGS coldfusion.tagext.net.websocket.server.proxy.ui.WSProxyConfigurationFrame $ARGS'
	;;

	Darwin)
		OS=Darwin
		LD_LIBRARY_PATH="$CFUSION_HOME/lib:$JAVA_LIBRARY_PATH"
		ARGS=$*
		CFSTART='LD_LIBRARY_PATH=$LD_LIBRARY_PATH; export LD_LIBRARY_PATH;cd $CFUSION_HOME/bin; $JAVA_EXECUTABLE -classpath $CLASSPATH $JVM_ARGS coldfusion.tagext.net.websocket.server.proxy.ui.WSProxyConfigurationFrame $ARGS'
	;;

	Linux)
		OS=Linux
		LD_LIBRARY_PATH="$CFUSION_HOME/lib:$CFUSION_HOME/lib/_ilnx21/bin:$JAVA_LIBRARY_PATH"
		ARGS=$*
		CFSTART='export LD_LIBRARY_PATH=$LD_LIBRARY_PATH; cd $CFUSION_HOME/bin; $JAVA_EXECUTABLE -classpath $CLASSPATH $JVM_ARGS coldfusion.tagext.net.websocket.server.proxy.ui.WSProxyConfigurationFrame $ARGS'

	;;

	*)
		echo "Your OS: `uname` is unsupported"
		echo "exiting"
		exit 1
	;;

esac

ARG=$1

[ -z "$ARG" ] && ARG=usage

wsproxyconfig

exit 0

