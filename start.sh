#!/bin/bash

cd ~/myparcel-voice-assistant/pi
git pull origin pi-server
x-terminal-emulator -e yarn compile
x-terminal-emulator -e yarn start
x-terminal-emulator -e ssh -R myparcel.serveo.net:80:localhost:4000 serveo.net


x-terminal-emulator -e ~/ngrok/ngork http 4001