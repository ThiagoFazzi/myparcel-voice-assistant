#!/bin/bash

DATABASE_URL = 'postgres://myparcel:secret@localhost:5432/labels'
PORT = 8080

cd ~/myparcel-voice-assistant/pi
git pull origin pi-server
x-terminal-emulator -e yarn compile
x-terminal-emulator -e yarn start
x-terminal-emulator -e ssh -R myparcel.serveo.net:80:localhost:8080 serveo.net