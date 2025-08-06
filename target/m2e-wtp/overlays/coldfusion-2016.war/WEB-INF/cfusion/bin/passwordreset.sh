#!/bin/bash

CFUSION_HOME=$(cd "$(dirname "$0")"; pwd)/..

#
# This sets _JAVACMD.
#
. $CFUSION_HOME/bin/findjava.sh

${_JAVACMD} -cp cf-passwordreset.jar com.adobe.coldfusion.passwordreset.PasswordReset
