#!/bin/sh

# # frontline:Fred <-> sms:John Mobile
# CHAT_USER_IDENTITY=fred.chaffee@me.com
# MOBILE_USER="John Chaffee Mobile"
# MOBILE_NUMBER=+12063996576

# frontline:Fred <-> sms:Lani Mobile
CHAT_USER_IDENTITY=fred.chaffee@me.com
MOBILE_USER="Lani Chaffee"
MOBILE_NUMBER=+12063693826

# Create a new conversation
# twilio api:conversations:v1:conversations:create \
#   --friendly-name "My First Conversation"

CONVERSATION_SID=`twilio api:conversations:v1:conversations:create --friendly-name "$MOBILE_USER" | grep "CH" | cut -c1-34`
echo CONVERSATION_SID $CONVERSATION_SID

# Fetch the new conversation
# twilio api:conversations:v1:conversations:fetch \
#   --sid "$CONVERSATION_SID"

CHAT_SERVICE_SID=`twilio api:conversations:v1:conversations:fetch --sid $CONVERSATION_SID | grep "IS" | cut -c1-34`
echo CHAT_SERVICE_SID $CHAT_SERVICE_SID

# Add a Chat participant
twilio api:conversations:v1:conversations:participants:create \
  --conversation-sid "$CONVERSATION_SID" \
  --identity "$CHAT_USER_IDENTITY"

# Add an SMS Participant
  twilio api:conversations:v1:conversations:participants:create \
  --conversation-sid "$CONVERSATION_SID" \
  --messaging-binding.address "$MOBILE_NUMBER" \
  --messaging-binding.proxy-address "$TWILIO_SMS_NUMBER"