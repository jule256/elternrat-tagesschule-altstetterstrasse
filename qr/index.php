<?php
/**
 * QR code target
 * 
 * logs the visit for statistics and redirects to the actual website
 *
 * privacy: no IP addresses are stored (GDPR/FADP friendly for a school site).
 * source: pass ?src=foo in the QR URL to distinguish channels (e.g. `?src=plakat`).
 */

declare(strict_types=1);

/* ------------------------------------------------------------------ *
 * log file path
 * ------------------------------------------------------------------ */
$scriptDir = realpath(__DIR__);
$siteRoot  = ($scriptDir !== false)
    ? dirname($scriptDir)
    : dirname(dirname($_SERVER['SCRIPT_FILENAME']));

$hostingParent = dirname($siteRoot);
$siteKey       = 'elternrat-altstetterstrasse.ch';

$dataDir = $hostingParent . '/' . $siteKey . '-data/qr';

$host = strtolower(trim((string)($_SERVER['HTTP_HOST'] ?? '')));
$env  = (strpos($host, 'testing.') === 0) ? 'testing' : 'www';

$logFile = $dataDir . '/visits-' . $env . '.csv';

/* ------------------------------------------------------------------ *
 * collect log data
 * ------------------------------------------------------------------ */
$utcTime   = gmdate('c');
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
$referer   = $_SERVER['HTTP_REFERER'] ?? '';
$source    = trim((string)($_GET['src'] ?? ''));
$sessionId = session_id();

/* ------------------------------------------------------------------ *
 * unique identifier
 * ------------------------------------------------------------------ */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if ($sessionId === '') {
    $sessionId = session_id();
}

/* ------------------------------------------------------------------ *
 * write csv
 * ------------------------------------------------------------------ */
$firstRun = !file_exists($logFile);
$row = [
    $utcTime,
    $userAgent,
    $referer,
    $source,
    $sessionId,
];

$line = implode(';', array_map(static function ($field): string {
    return '"' . str_replace('"', '""', (string)$field) . '"';
}, $row)) . "\n";

$ok = @mkdir($dataDir, 0755, true);
if ($ok || is_dir($dataDir)) {
    if ($firstRun) {
        @file_put_contents(
            $logFile,
            "utc_time;user_agent;referer;source;session_id\n",
            FILE_APPEND | LOCK_EX
        );
    }
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

/* ------------------------------------------------------------------ *
 * redirect
 * ------------------------------------------------------------------ */
header('Location: /', true, 302);
exit;
