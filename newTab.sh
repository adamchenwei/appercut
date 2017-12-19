#!/bin/sh
# NOT WORKING ATM, ITS FOR iTerm
osascript <<END
  tell application "iTerm"
      set myterm to (make new terminal)
      tell myterm
          launch session "Default"
          tell the last session
              ls -lA
          end tell
      end tell
  end tell
END