<#
.SYNOPSIS
Exports the project directory tree and source code into a single Markdown file for AI context.
#>

$outputFile = "project_context.md"
$contentArray = @()

# 1. Write the Header
$contentArray += "# Project Context`n"

# 2. Write the Directory Tree (Excluding ignored folders)
$contentArray += "## Directory Structure`n"
$contentArray += "```text"

Function Get-Tree {
    param(
        [string]$Path = ".",
        [string]$Prefix = ""
    )
    
    $excludePatterns = @("node_modules", ".next", ".git", ".vscode", "public", "project_context.md")
    $items = Get-ChildItem -Path $Path -Exclude $excludePatterns | Sort-Object
    
    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq ($items.Count - 1))
        
        if ($isLast) {
            $connector = "\--- "
        } else {
            $connector = "+--- "
        }
        
        $line = $Prefix + $connector + $item.Name
        $global:contentArray += $line
        
        if ($item.PSIsContainer) {
            if ($isLast) {
                $addedPrefix = "     "
            } else {
                $addedPrefix = "|    "
            }
            $newPrefix = $Prefix + $addedPrefix
            Get-Tree -Path $item.FullName -Prefix $newPrefix
        }
    }
}

Get-Tree
$contentArray += "````n"

# 3. Write File Contents
$contentArray += "## Source Code`n"

$includeExtensions = @("*.ts", "*.tsx", "*.js", "*.jsx", "*.css", "*.json", "*.prisma", "*.md")
$excludeDirs = @("*node_modules*", "*.next*", "*.git*", "*public*")

$files = Get-ChildItem -Path . -Include $includeExtensions -Recurse | Where-Object {
    $path = $_.FullName
    $skip = $false
    foreach ($ex in $excludeDirs) {
        if ($path -like $ex) {
            $skip = $true
            break
        }
    }
    if ($_.Name -eq "project_context.md" -or $_.Name -eq "package-lock.json") {
        $skip = $true
    }
    return -not $skip
}

foreach ($file in $files) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
    
    $ext = $file.Extension.TrimStart('.')
    $lang = $ext
    if ($ext -eq "tsx" -or $ext -eq "ts") { $lang = "typescript" }
    elseif ($ext -eq "jsx" -or $ext -eq "js") { $lang = "javascript" }
    
    $global:contentArray += "### File: $($relativePath)"
    $global:contentArray += "````$lang"
    
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        if ($content) {
            $global:contentArray += $content
        }
    } catch {
        # ignore read errors
    }
    
    $global:contentArray += "`````n"
}

# Write everything to file at once
$global:contentArray | Out-File $outputFile -Encoding utf8 -Force
Write-Host "✅ Successfully generated context in: $outputFile" -ForegroundColor Green
