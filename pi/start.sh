#!/bin/bash

cd ~/myparcel-voice-assistant/pi
git pull origin pi-server
x-terminal-emulator -e yarn compile
x-terminal-emulator -e yarn start
x-terminal-emulator -e autossh -M 0 -R myparcel.serveo.net:80:localhost:4000 serveo.net