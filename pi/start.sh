#!/bin/bash

DATABASE_URL = 'postgres://myparcel:secret@localhost:5432/labels'
PORT = 8080

cd ~/
rm -rf myparcel-voice-assistant
git clone https://github.com/JoyceTerra/myparcel-voice-assistant.git
cd ~/myparcel-voice-assistant/pi
x-terminal-emulator -e yarn start
x-terminal-emulator -e ssh -R myparcel.serveo.net:80:localhost:8080 serveo.net