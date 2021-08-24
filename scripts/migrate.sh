#!/bin/sh

# Load environment variables from .env
# https://stackoverflow.com/a/30969768/179329
set -o allexport; source ../.env; set +o allexport


echo "\033[0;32m=== START MIGRATE ===\033[0m"

./delete-all-conversations.sh
./create-conversation.sh

CONVERSATION_SID=`twilio api:conversations:v1:conversations:list -o json | jq 'sort_by(.dateCreated) | last | .sid' | cut -c2-35`
echo "CONVERSATION_SID: \033[0;32m$CONVERSATION_SID\033[0m"

# Create pseudo mobile user chat identity (for importing message history)
PSEUDO_MOBILE_CHAT_ID=`twilio api:conversations:v1:conversations:participants:create \
--conversation-sid "$CONVERSATION_SID" \
--identity "$MOBILE_NAME" | grep "MB" | cut -c1-34`
echo PSEUDO_MOBILE_CHAT_ID: "$PSEUDO_MOBILE_CHAT_ID"

# Add Web Agent and generate token
./add-chat-participants.sh
./generate-token.sh

# Import message history
MESSAGES=`curl --location \
--request POST "https://api.zipwhip.com/conversation/get" \
--header "Content-Type: application/x-www-form-urlencoded" \
--data-urlencode "session=$ZIPWHIP_SESSION" \
--data-urlencode "fingerprint=$FINGERPRINT" \
--data-urlencode "limit=10" | jq '.response["messages"] | reverse[] | .type + " " + .body' | sed 's/"//g'`
echo "MESSAGES: \n$MESSAGES"

# Loop through each line and create an incoming or outgoing message with the appropriate user
while IFS= read -r line; do
  direction=`echo $line | cut -c1-2`
  # body=`echo $line | cut -c4-`
  body=`echo $line | sed 's/^MO //g' | sed 's/^ZO //g'`
  # echo "LINE: $line"
  # echo "DIRECTION: $direction"
  # echo "BODY: $body"
  if [[ $direction = "MO" ]]
  then
    # echo "INCOMING"
    twilio api:conversations:v1:conversations:messages:create \
    --conversation-sid "$CONVERSATION_SID" \
    --author "$MOBILE_NAME" \
    --body "$body"
    # create incoming message
  else
    # echo "OUTGOING"
    twilio api:conversations:v1:conversations:messages:create \
    --conversation-sid "$CONVERSATION_SID" \
    --author "$IDENTITY" \
    --body "$body"
  fi
done <<< "$MESSAGES"

# Remove pseudo user
twilio api:conversations:v1:conversations:participants:remove \
--conversation-sid "$CONVERSATION_SID" \
--sid "$PSEUDO_MOBILE_CHAT_ID"

# Add real mobile participant
./add-mobile-participant.sh

echo "\033[0;32m=== END MIGRATE ===\033[0m"
