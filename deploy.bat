@echo off
echo Setting up project for GitHub deployment...

echo.
echo Step 1: Initializing Git repository...
"C:\Program Files\Git\bin\git.exe" init

echo.
echo Step 2: Adding all files...
"C:\Program Files\Git\bin\git.exe" add .

echo.
echo Step 3: Making initial commit...
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: My Project"

echo.
echo Step 4: Adding remote repository...
echo Please enter your GitHub repository URL (e.g., https://github.com/username/project-name.git):
set /p repo_url=

"C:\Program Files\Git\bin\git.exe" remote add origin %repo_url%

echo.
echo Step 5: Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo Deployment complete!
echo.
echo Note: You may need to enable GitHub Pages in your repository settings.
echo Go to your repository settings and set source to "Deploy from a branch" and select "main" branch.
echo.
pause 