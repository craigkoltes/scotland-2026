@echo off
setlocal

echo Adding all changes...
git add .

echo Committing with message...
git commit -m "Automated update from push-to-github.bat"

echo Pushing to GitHub...
git push origin main

echo Done!
endlocal
pause 