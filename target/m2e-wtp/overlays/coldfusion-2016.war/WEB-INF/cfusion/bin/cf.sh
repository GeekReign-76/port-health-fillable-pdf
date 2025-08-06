#!/bin/sh

# For EAR/WAR JEE deployments, you will need to modify it to point J2EEJAR to the appropriate JAR file paths as per your application server.

# this should point to the directory with ColdFusions lib directory.
# if this is blank, this is probably a J2EE deployment and this should point
# to the /WEB-INF/cfusion directory
CFUSION_HOME=$(cd "$(dirname "$0")"; pwd)/..

# This needs to point at the JAR file with the J2EE class files in it.
# It defaults to a value that is valid for the server install, but for
# a J2EE install you will need to modify it to point to the appropriate JAR file.
J2EEJAR=$CFUSION_HOME/runtime/lib/servlet-api.jar:$CFUSION_HOME/runtime/lib/jsp-api.jar:$CFUSION_HOME/runtime/lib/el-api.jar

#Following is the example for JBoss library path. Change it and uncomment it as per your Application server's JAR paths. 
#J2EEJAR=/opt/jboss-as-7.1.1.Final/modules/javax/servlet/api/main/jboss-servlet-api_3.0_spec-1.0.0.Final.jar:/opt/jboss-as-7.1.1.Final/modules/javax/servlet/jsp/api/main/jboss-jsp-api_2.2_spec-1.0.0.Final.jar:/opt/jboss-as-7.1.1.Final/modules/javax/el/api/main/jboss-el-api_2.2_spec-1.0.0.Final.jar

# This needs to point to the WEB-INF directory for ColdFusion.
if [ -d "$CFUSION_HOME/wwwroot/WEB-INF" ]; then
  WEBINF=$CFUSION_HOME/wwwroot/WEB-INF
else
  WEBINF=$CFUSION_HOME/..
fi


. $CFUSION_HOME/bin/findjava.sh


/bin/sh -c "${_JAVACMD} -Dcoldfusion.classPath=$CFUSION_HOME/lib/updates:$CFUSION_HOME/lib:$CFUSION_HOME/lib/axis2 -Dcoldfusion.libPath=$CFUSION_HOME/lib -cp $CFUSION_HOME/lib/updates/*:$CFUSION_HOME/lib/*:$WEBINF/lib/*:$J2EEJAR coldfusion.tools.CLIInvoker CLI $*"
