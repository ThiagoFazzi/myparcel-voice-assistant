# MyParcel.com voice assistant 

## Introduction

  The purpose of this project is to use an Alexa Echo device as a voice assistant for label printing in order to simplify every day work for small webshop owners and warehouse employees. 

  By a simple voice command Alexa should retrieve all details neccessary for label printing from a list of today's orders and send it to a local printer, which then starts the printing process. 

## Table of Contents

 - [ Alexa Skill](#alexa-skill)
    - [ Intents and Utterances](#intents-and-utterances)
    - [ AWS Lambda](#aws-lambda)

- [Raspberry Pi](#raspberry-pi)
  - [Web Server](#web-server)
  - [Print Server](#print-server)
  - [Tunnel](#tunnel)

## Alexa Skill

### Intents and Utterances

### AWS Lambda

## Raspberry Pi

  The Pi is the _web_ and _printer_ server and we needed a single point for Amazon Web Services to connect to.

### Web Server

  The webserver is needed because Alexa has built in limtations.

  - Alexa will stop executing code if you didn't instruct her to say anything within 3 seconds.
  - Any POST or GET request may not exceed 24kb, if it does exceed that limit it will stop immidiatly.

  The web server should actually be moved to a static domain, for example: `alexa.sendmyparcel.com`.

### Print server

  We initially wanted the Pi to be just __a simple print server__. Since the printer is connected with a USB cable there needs to be a computer.

  We installed a __CUPS__ server and the drivers for this specific printer, which are in the __/drivers__ folder. Because the drivers for this printer are over 10 years old you cannot use the drivers from the Dymo website as they do not compile for the latest C++ compiler.

  In order to install the drivers for this printer execute the following commands:

  ```
  cd ./drivers
  patch -Np1 -i cups-ppd-header.patch
  sudo ./configure
  sudo make
  sudo make install
  ```

  Now go to the web interface for CUPS: `http://localhost:631/admin` and click `add printer`, login and the printer should be enlisted.

  It would be possible for the end-user to hook up this server to their current computer, but that would require the end-user to install the printer drivers and the printer should be accessible from outside the firewall. 
  
  This either requires opening ports on the router (insecure) or they should tunnel into a server, maybe `printers.sendmyparcel.com`

### Tunnel

  Since Alexa is running on AWS and the printer is behind a firewall, the free alternative for us was to use __ngrok__. 
  Each time it starts up it gives us a public domain name, eg `https://427bc2fa.ngrok.io`

  The command: `~/ngrok/ngrok http 4001` initiates the tunnel and ngrok forwards the http request to port 4001 in the Pi where our web server is running.

  Alexa is currently hardcoded to connect to that domain address, but this tunnel should not be needed when you want to use this software.
  Simply move the server to run on `alexa.sendmyparcel.com` or add endpoints to the current API specifically for Alexa.

  However a tunnel service is needed for the printers of your end-users. Serveo has software and a guide to host one `http://serveo.net/#self-host`.
  A simple script is then needed for the end-users printer to tunnel in (can be a simple boot script) and you should link their tunnel to their account.

  You should be able to immidiatly tunnel in to port `631` where the __CUPS__ server should be running so you can immidiatly communicate through the `Internet Printing Protocol (IPP)` from your own server.



