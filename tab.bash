#!/bin/bash
osascript -e '
  tell application "Terminal"
  do script "cd ~/www/service/code-generator && npm install && npm run dev"
  activate
  end tell

  tell application "Terminal"
  do script "cd ~/www/appercut-ui && npm install && npm start"
  activate
  end tell


'