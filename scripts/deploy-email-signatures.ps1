# ══════════════════════════════════════════════════════════════
# Lorann LLC — Exchange Online Email Signature Rules
# ══════════════════════════════════════════════════════════════
#
# Prerequisites (run once as admin):
#   Install-Module -Name ExchangeOnlineManagement -Force
#
# Steps:
#   1. Copy the 6 HTML files from public/email_signature/ to C:\sigs\
#   2. Open PowerShell as Administrator
#   3. Run this script
# ══════════════════════════════════════════════════════════════

Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline -UserPrincipalName admin@lorannllc.com

# ← Set this to wherever you copied the 6 HTML files
$sigDir = "C:\sigs"

$people = @(
  @{ Name="Michael Connolly"; Email="michael@lorannllc.com"; HtmlFile="$sigDir\michael-connolly-signature.html" },
  @{ Name="Paul Gerardi";     Email="paul@lorannllc.com";    HtmlFile="$sigDir\paul-gerardi-signature.html" },
  @{ Name="Fred Onemma";      Email="fred@lorannllc.com";    HtmlFile="$sigDir\fred-onemma-signature.html" },
  @{ Name="Joanne Iadarola";  Email="joanne@lorannllc.com";  HtmlFile="$sigDir\joanne-iadarola-signature.html" },
  @{ Name="Bill Woods";       Email="bill@lorannllc.com";    HtmlFile="$sigDir\bill-woods-signature.html" },
  @{ Name="Caryn Trazi";      Email="caryn@lorannllc.com";   HtmlFile="$sigDir\caryn-trazi-signature.html" }
)

foreach ($p in $people) {
  # Read HTML and convert root-relative image paths to absolute URLs
  # (Outlook / Exchange needs full https:// URLs — relative paths don't work in email)
  $html = (Get-Content -Path $p.HtmlFile -Raw) -replace '/email_signature/img', 'https://www.lorannllc.com/email_signature/img'

  $ruleName = "Email Signature - " + $p.Name

  # Safe to re-run — removes the old rule first if it exists
  if (Get-TransportRule -Identity $ruleName -ErrorAction SilentlyContinue) {
    Remove-TransportRule -Identity $ruleName -Confirm:$false
    Write-Host "  Removed old rule: $ruleName" -ForegroundColor Yellow
  }

  New-TransportRule `
    -Name                              $ruleName `
    -From                              $p.Email `
    -ApplyHtmlDisclaimerText           $html `
    -ApplyHtmlDisclaimerLocation       Append `
    -ApplyHtmlDisclaimerFallbackAction Wrap

  Write-Host "  Created: $ruleName" -ForegroundColor Green
}

Write-Host ""
Write-Host "All 6 signature rules deployed to Exchange Online!" -ForegroundColor Cyan
