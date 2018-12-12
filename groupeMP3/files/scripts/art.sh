#!/bin/bash
pwd=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
parent_path=$(dirname $pwd)
ffmpeg -i "$parent_path$1.mp3" "$parent_path$1.jpg"

frequence=$(mp3info -p "%Q" "$parent_path$1.mp3")
duree=$(mp3info -p "%S" "$parent_path$1.mp3")
nbVal=$(((frequence*duree)/400))

audiowaveform -i $nom -b 8 -Z $nbVal -o "$parent_path$1.json"
