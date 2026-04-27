param(
  [string]$TaskName = 'Naukri Profile Update Hourly',
  [string]$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path,
  [ValidateSet('Password', 'S4U', 'Interactive')]
  [string]$LogonType = 'Password',
  [System.Management.Automation.PSCredential]$Credential,
  [switch]$RunNow
)

$ErrorActionPreference = 'Stop'

$runnerPath = Join-Path $ProjectRoot 'scripts\run-naukri-update.ps1'
if (-not (Test-Path -LiteralPath $runnerPath)) {
  throw "Could not find scheduled task runner at $runnerPath"
}

$powershellPath = (Get-Command powershell.exe -ErrorAction Stop).Source
$taskArguments = "-NoProfile -ExecutionPolicy Bypass -File `"$runnerPath`" -ProjectRoot `"$ProjectRoot`""

$action = New-ScheduledTaskAction `
  -Execute $powershellPath `
  -Argument $taskArguments `
  -WorkingDirectory $ProjectRoot

$trigger = New-ScheduledTaskTrigger `
  -Once `
  -At (Get-Date).AddMinutes(1) `
  -RepetitionInterval (New-TimeSpan -Hours 1) `
  -RepetitionDuration (New-TimeSpan -Days 3650)

$settings = New-ScheduledTaskSettingsSet `
  -StartWhenAvailable `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -WakeToRun `
  -MultipleInstances IgnoreNew

$userId = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name

if ($LogonType -eq 'Password') {
  if (-not $Credential) {
    $Credential = Get-Credential `
      -UserName $userId `
      -Message 'Enter your Windows password so Task Scheduler can run this job when you are not logged in.'
  }

  Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -User $Credential.UserName `
    -Password $Credential.GetNetworkCredential().Password `
    -RunLevel Limited `
    -Force | Out-Null
}
else {
  $principal = New-ScheduledTaskPrincipal `
    -UserId $userId `
    -LogonType $LogonType `
    -RunLevel Limited

  Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Force | Out-Null
}

Write-Host "Registered scheduled task: $TaskName"
if ($LogonType -eq 'Password') {
  Write-Host "It starts in about 1 minute and repeats every 1 hour, even when this Windows user is not logged in."
  Write-Host "Task Scheduler stores the credential securely; the password is not written to this script."
  Write-Host "The automation runs headless in the background because no desktop session is available."
}
elseif ($LogonType -eq 'S4U') {
  Write-Host "It starts in about 1 minute and repeats every 1 hour, even when this Windows user is not logged in."
  Write-Host "S4U mode does not store your password, but Windows may block network/encrypted-resource access."
  Write-Host "The automation runs headless in the background because no desktop session is available."
}
else {
  Write-Host "It starts in about 1 minute and repeats every 1 hour while this Windows user is logged in."
}
Write-Host "Logs will be written to: $(Join-Path $ProjectRoot 'logs')"

if ($RunNow) {
  Start-ScheduledTask -TaskName $TaskName
  Write-Host "Started scheduled task now."
}
