#!/bin/bash
nom="tmp-6532gdET5mF6tps0"
path="/root/testGroupeMP3/files/tmp/$nom.mp3"
frequence=$(mp3info -p "%Q" $path)
duree=$(mp3info -p "%S" $path)
nbVal=$(frequence*duree)/400

audiowaveform -i $nom -b 8 -Z $nbVal -o "../json/$nom.json"

