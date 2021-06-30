#!/bin/sh

ZIPWHIP_USER="Zipwhip User"
TWILIO_LANDLINE=+12068231284

MOBILE_NAME="John Mobile"
MOBILE_NUMBER=+12063996576
# FINGERPRINT=1514465037

# MOBILE_NAME="Lani Mobile"
# MOBILE_NUMBER=+12063693826
# FINGERPRINT=4229642799

# MOBILE_NAME="Alan Mobile"
# MOBILE_NUMBER=+14259222865
# FINGERPRINT=2147939485

# MOBILE_NAME="Ravi Angadi"
# MOBILE_NUMBER=+15712135596
# FINGERPRINT=2376915500

# MOBILE_NAME="John Lauer"
# MOBILE_NUMBER=+12065823770
# FINGERPRINT=52179751

# # ZIPWHIP
# ZIPWHIP_SESSION=f86b1a4c-b874-4e10-ada9-3d79d6b83ffc:377265507

# Create Conversation with Mobile Name
CONVERSATION=`twilio api:conversations:v1:conversations:create --friendly-name "$MOBILE_NAME" | grep "CH"`
echo CONVERSATION $CONVERSATION

CONVERSATION_SID=`echo "$CONVERSATION" | cut -c1-34`
echo CONVERSATION_SID $CONVERSATION_SID

CHAT_SERVICE_ID=`echo "$CONVERSATION" | cut -c37-70`
echo CHAT_SERVICE_ID $CHAT_SERVICE_ID

# Create SMS participant (John mobile)
twilio api:conversations:v1:conversations:participants:create --conversation-sid="$CONVERSATION_SID" --messaging-binding.address "$MOBILE_NUMBER" --messaging-binding.proxy-address "$TWILIO_LANDLINE"

# Create long-lived (24 hours in seconds) token for zipwhip user 
TOKEN=`twilio token:chat --chat-service-sid "$CHAT_SERVICE_ID" --identity "$ZIPWHIP_USER" --ttl 86400`
echo TOKEN: $TOKEN

# Create zipwhip user chat identity
ZIPWHIP_CHAT_ID=`twilio api:conversations:v1:conversations:participants:create --conversation-sid "$CONVERSATION_SID" --identity "$ZIPWHIP_USER" | grep "MB" | cut -c1-34`
echo ZIPWHIP_CHAT_ID $ZIPWHIP_CHAT_ID
