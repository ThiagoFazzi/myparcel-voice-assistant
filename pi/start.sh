#!/bin/bash

cd ~/
git clone https://github.com/JoyceTerra/myparcel-voice-assistant.git
cd ~/myparcel-voice-assistant/pi
x-terminal-emulator -e yarn start
x-terminal-emulator -e ssh -R myparcel.serveo.net:80:localhost:8080 serveo.net