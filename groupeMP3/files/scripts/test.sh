#!/bin/bash
pwd=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
parent_path=$(dirname $pwd)
ffmpeg -i "$parent_path$1.mp3" "$parent_path$1.jpg"
