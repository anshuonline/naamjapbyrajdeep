@echo off
echo ========================================
echo  GitHub Upload Script
echo ========================================
echo.
echo Step 1: Create a new repository on GitHub
echo.
echo 1. Go to: https://github.com/new
echo 2. Repository name: spiritual-tools
echo 3. Description: Collection of spiritual practice tools - Naam Jaap Counter and Brahmacharya Challenge
echo 4. Choose: Public
echo 5. DO NOT check "Add README" or any other files
echo 6. Click "Create repository"
echo.
echo Step 2: Copy your GitHub username
echo.
set /p username="Enter your GitHub username: "
echo.
echo Step 3: Connecting to GitHub and pushing...
echo.

cd /d "f:\Namejap html"

git remote add origin https://github.com/%username%/spiritual-tools.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo  Upload Complete!
echo ========================================
echo.
echo Your repository is now live at:
echo https://github.com/%username%/spiritual-tools
echo.
pause
