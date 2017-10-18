#!/usr/bin/env bash

if [ -z "$1" ]
then
	FILES=$(find . -type f -regextype posix-extended         \
		-regex "^\./(src|test)/.*\.(scss|js|less)$"          \
		-not -regex ".*\/(\.|node_modules|scss\/bootstrap).*")
else
  # with Parameter
  FILES="$1"
fi


for f in $FILES
do
    echo "Processing:  $f"

    #for all javascript, typescript and json files
    #if [[ $f =~ \.(js|jsx|json|ts|tsx)$ ]]; then
    #    #prune whitespace
    #    sed -i 's/ *$//' $f
    #fi

    # only for typescript files
    if [[ $f =~ \.(js|json)$ ]]; then
        ./node_modules/.bin/js-beautify  --replace  $f
    fi
done

echo "done prettifying"
