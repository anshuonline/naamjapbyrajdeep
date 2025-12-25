# Navigate to project directory
Set-Location "f:\Namejap html"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Pushing Updates to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Enhanced Maya Escape game - Added numbered power-ups (1️⃣2️⃣3️⃣🕉️), difficulty scaling from level 2+, improved gameplay balance, and bug fixes"

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " Push Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Repository: https://github.com/anshuonline/naamjapbyrajdeep.git" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
