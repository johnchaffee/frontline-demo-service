#!/bin/sh

# Load environment variables from .env
# https://stackoverflow.com/a/30969768/179329
set -o allexport; source ../.env; set +o allexport

echo "\033[0;32m=== CREATE-CONVERSATION ===\033[0m"
echo "CONVERSATION: \033[0;32m$MOBILE_NAME\033[0m"
CONVERSATION=`twilio api:conversations:v1:conversations:create \
--friendly-name "$MOBILE_NAME" \
-o json`
# echo $CONVERSATION | jq
