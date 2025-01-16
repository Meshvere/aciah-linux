#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

uri="file://"$DIR"/exemple.html?screenReader="
if [ `pgrep orca` ]
	then
		uri=$uri"true"
	else
		uri=$uri"false"
fi
echo $uri
firefox "$uri"

