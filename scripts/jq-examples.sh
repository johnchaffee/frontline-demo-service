#!/bin/sh

# Load environment variables from .env
# https://stackoverflow.com/a/30969768/179329
set -o allexport; source ../.env; set +o allexport

# JQ QUERIES
# As objects
curl --location --request POST 'https://api.zipwhip.com/conversation/get' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'session=40c85017-0973-41c6-b16e-79284a993f1e:377265507' \
--data-urlencode 'fingerprint=1514465037' \
--data-urlencode 'limit=2' | jq '.response["messages"][] | {body: .body, type: .type}'

# As objects in an Array
curl --location --request POST 'https://api.zipwhip.com/conversation/get' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'session=40c85017-0973-41c6-b16e-79284a993f1e:377265507' \
--data-urlencode 'fingerprint=1514465037' \
--data-urlencode 'limit=2' | jq '[.response["messages"][] | {body: .body, type: .type}]'

# As objects in a compact -c Array
curl --location --request POST 'https://api.zipwhip.com/conversation/get' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'session=40c85017-0973-41c6-b16e-79284a993f1e:377265507' \
--data-urlencode 'fingerprint=1514465037' \
--data-urlencode 'limit=2' | jq -c '[.response["messages"][] | {body: .body, type: .type}]'

# Export as plain text
curl --location --request POST 'https://api.zipwhip.com/conversation/get' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'session=40c85017-0973-41c6-b16e-79284a993f1e:377265507' \
--data-urlencode 'fingerprint=1514465037' \
--data-urlencode 'limit=2' | jq '.response["messages"][] | .type + " " + .body'

# Run if then statement
curl --location --request POST 'https://api.zipwhip.com/conversation/get' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'session=40c85017-0973-41c6-b16e-79284a993f1e:377265507' \
--data-urlencode 'fingerprint=1514465037' \
--data-urlencode 'limit=10' | jq '.response["messages"][] | if .type == "MO" then "MO " + .body else "ZO " + .body end' | sed 's/"//g'
