#!/bin/bash


# this should point to the directory with ColdFusions lib directory.
# if this is blank, this is probably a J2EE deployment and this should point
# to the /WEB-INF/cfusion directory
CFUSION_HOME=$(cd "$(dirname "$0")"; pwd)/..
WEBINF=$CFUSION_HOME/wwwroot/WEB-INF

. $CFUSION_HOME/bin/findjava.sh

${_JAVACMD} -cp $CFUSION_HOME/lib/updates/*:$CFUSION_HOME/lib/*:$CFUSION_HOME/runtime/lib/*:$WEBINF/lib/* coldfusion.graph.XMLToJSON $1 $CFUSION_HOME/
