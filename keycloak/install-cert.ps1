# Script PowerShell per installare il certificato autofirmato nelle Autorità di certificazione radice attendibili
# Eseguire questo script come Amministratore per evitare errori di accesso negato

$certPath = "$PSScriptRoot\certs\keycloak.crt"

if (-Not (Test-Path $certPath)) {
    Write-Error "File del certificato non trovato in $certPath"
    exit 1
}

Write-Output "Installazione del certificato da $certPath nelle Autorità di certificazione radice attendibili..."

try {
    $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2
    $cert.Import($certPath)

    $store = New-Object System.Security.Cryptography.X509Certificates.X509Store "Root", "LocalMachine"
    $store.Open("ReadWrite")
    $store.Add($cert)
    $store.Close()

    Write-Output "Certificato installato con successo. Potrebbe essere necessario riavviare il browser."
} catch {
    Write-Error "Installazione del certificato fallita. Eseguire questo script come Amministratore."
    exit 1
}
