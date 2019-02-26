$oldName = Read-Host "Please enter a old name"
$newName = Read-Host "Please enter a new name"

Write-Host "Renaming files from " $oldName " to " $newName   
$files = Get-ChildItem $projectpath -include *.ts, *.js, *.json, *.xml, *.html, * -Filter *$oldName* -Recurse | Where {$_.FullName -notlike "*\node_modules\*"}

$files |
    Sort-Object -Descending -Property { $_.FullName } |
    Rename-Item -newname { $_.name -replace $oldName, $newName } -force

Write-Host "Renaming files was successful"

Write-Host "Replacing content in files..."
$files = Get-ChildItem $projectpath -File -include *.ts, *.js, *.json, *.xml, *.html, * -Recurse | Where {$_.FullName -notlike "*\node_modules\*"}

foreach($file in $files) 
{ 
    ((Get-Content $file.fullname) -creplace $oldName, $newName) | set-content $file.fullname -Encoding UTF8
}

Write-Host "Renaming complete!" -ForegroundColor Green

Write-Host "Done!" -ForegroundColor Green
