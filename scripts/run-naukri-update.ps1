param(
  [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [string]$LogDirectory = (Join-Path $ProjectRoot 'logs')
)

$ErrorActionPreference = 'Stop'

$scriptPath = Join-Path $ProjectRoot 'scripts\open-naukri.js'
if (-not (Test-Path -LiteralPath $scriptPath)) {
  throw "Could not find Naukri automation script at $scriptPath"
}

New-Item -ItemType Directory -Force -Path $LogDirectory | Out-Null

$timestamp = Get-Date -Format 'yyyy-MM-dd_HH-mm-ss'
$logFile = Join-Path $LogDirectory "naukri-update-$timestamp.log"

Push-Location $ProjectRoot
try {
  $node = (Get-Command node -ErrorAction Stop).Source

  "[$(Get-Date -Format o)] Starting Naukri automation" | Tee-Object -FilePath $logFile
  "Windows identity: $([System.Security.Principal.WindowsIdentity]::GetCurrent().Name)" | Tee-Object -FilePath $logFile -Append
  "Working directory: $ProjectRoot" | Tee-Object -FilePath $logFile -Append
  "Node executable: $node" | Tee-Object -FilePath $logFile -Append
  & $node $scriptPath 2>&1 | Tee-Object -FilePath $logFile -Append
  $exitCode = $LASTEXITCODE
  "[$(Get-Date -Format o)] Finished Naukri automation with exit code $exitCode" | Tee-Object -FilePath $logFile -Append

  exit $exitCode
}
finally {
  Pop-Location
}
