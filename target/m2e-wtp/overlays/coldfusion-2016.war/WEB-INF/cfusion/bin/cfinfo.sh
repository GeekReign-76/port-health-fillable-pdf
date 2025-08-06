#!/bin/bash

CFUSION_HOME=$(cd "$(dirname "$0")"; pwd)/..

#
# This sets _JAVACMD.
#
. $CFUSION_HOME/bin/findjava.sh

# Call coldfusion.tools.CfinfoMain with the found settings
${_JAVACMD} -DCFUSION_HOME=$CFUSION_HOME -cp $CFUSION_HOME/lib/updates/*:$CFUSION_HOME/lib/* coldfusion.tools.CfinfoMain \
	$1 \
	$2 \
	$3
echo Base Version:
${_JAVACMD} -DCFUSION_HOME=$CFUSION_HOME -cp $CFUSION_HOME/lib/cfusion.jar coldfusion.tools.CfinfoMain \
	-baseinfo \
	$1 \
	$2 \
	$3
