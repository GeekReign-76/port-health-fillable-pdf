#!/bin/bash

CFUSION_HOME=$(cd "$(dirname "$0")"; pwd)/..
J2EEJAR=$CFUSION_HOME/runtime/lib/servlet-api.jar
WEBINF=$CFUSION_HOME/wwwroot/WEB-INF

. $CFUSION_HOME/bin/findjava.sh

# Finally, call coldfusion.tools.MulticastSender
${_JAVACMD} -cp $J2EEJAR:$WEBINF/lib/cfmx_bootstrap.jar:$WEBINF/lib/cfx.jar -Dcoldfusion.classPath=$CFUSION_HOME/lib/updates,$CFUSION_HOME/lib coldfusion.tools.CommandLineInvoker MulticastSender 239.0.0.6 4000
