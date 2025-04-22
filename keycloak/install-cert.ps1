# PowerShell script to install the self-signed certificate into Trusted Root Certification Authorities
# Run this script as Administrator to avoid access denied errors

$certPath = "$PSScriptRoot\certs\keycloak.crt"

if (-Not (Test-Path $certPath)) {
    Write-Error "Certificate file not found at $certPath"
    exit 1
}

Write-Output "Installing certificate from $certPath to Trusted Root Certification Authorities..."

try {
    $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2
    $cert.Import($certPath)

    $store = New-Object System.Security.Cryptography.X509Certificates.X509Store "Root", "LocalMachine"
    $store.Open("ReadWrite")
    $store.Add($cert)
    $store.Close()

    Write-Output "Certificate installed successfully. You may need to restart your browser."
} catch {
    Write-Error "Failed to install certificate. Please run this script as Administrator."
    exit 1
}
