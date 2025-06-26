@echo off
echo Setting up Confidence Builder for GitHub deployment...

echo.
echo Step 1: Initializing Git repository...
"C:\Program Files\Git\bin\git.exe" init

echo.
echo Step 2: Adding all files...
"C:\Program Files\Git\bin\git.exe" add .

echo.
echo Step 3: Making initial commit...
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Confidence Builder website"

echo.
echo Step 4: Adding remote repository...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/craigkoltes/needle-website.git

echo.
echo Step 5: Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo Deployment complete!
echo Your website should be available at: https://craigkoltes.github.io/needle-website/
echo.
echo Note: You may need to enable GitHub Pages in your repository settings.
echo Go to: https://github.com/craigkoltes/needle-website/settings/pages
echo Set source to "Deploy from a branch" and select "main" branch.
echo.
pause 