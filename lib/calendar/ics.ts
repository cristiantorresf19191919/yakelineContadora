/**
 * Dependency-free helpers to turn tax deadlines into calendar events.
 *
 * - buildIcsCalendar: RFC 5545 compliant VCALENDAR string (all-day events).
 * - downloadIcs: triggers a .ics file download in the browser.
 * - googleCalendarUrl: "Add to Google Calendar" template URL.
 */

export type IcsEvent = {
  title: string;
  date: Date;
  description?: string;
};

const WHATSAPP_AGENDA = "Agenda con Yakeline: https://wa.me/573207269417";

/** Escape text per RFC 5545 section 3.3.11 (backslash, comma, semicolon, newline). */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Format a Date as a local all-day value: YYYYMMDD. */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/** Return a new Date offset by whole days (handles month/year rollover). */
function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/** Format a Date as a UTC timestamp: YYYYMMDDTHHMMSSZ (used for DTSTAMP). */
function formatDateTimeUtc(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/** Deterministic, ASCII-safe slug used to keep UIDs stable across downloads. */
function slugify(value: string): string {
  // Strip combining diacritical marks (U+0300–U+036F) left after NFD normalization.
  const combiningMarks = new RegExp("[\\u0300-\\u036f]", "g");
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(combiningMarks, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Stable UID derived from the event date + title, so re-imports dedupe. */
function buildUid(event: IcsEvent): string {
  const slug = slugify(event.title) || "evento";
  return `${formatDate(event.date)}-${slug}@yakelincontadora.com`;
}

/** Description that always appends the WhatsApp booking note. */
function buildDescription(event: IcsEvent): string {
  const note = event.description?.trim();
  return note ? `${note}\n\n${WHATSAPP_AGENDA}` : WHATSAPP_AGENDA;
}

/**
 * Fold a content line to <= 75 OCTETS (UTF-8) per RFC 5545 section 3.1, using
 * CRLF + single-space continuation. Multibyte characters (e.g. Spanish accents)
 * are never split across a fold boundary; the leading continuation space counts
 * toward the 75-octet limit of its physical line.
 */
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let currentOctets = 0;
  let isContinuation = false;

  for (const char of line) {
    const charOctets = encoder.encode(char).length;
    // Continuation lines reserve one octet for the leading space.
    const limit = isContinuation ? 74 : 75;
    if (currentOctets + charOctets > limit) {
      parts.push(isContinuation ? ` ${current}` : current);
      current = "";
      currentOctets = 0;
      isContinuation = true;
    }
    current += char;
    currentOctets += charOctets;
  }
  parts.push(isContinuation ? ` ${current}` : current);

  return parts.join("\r\n");
}

export function buildIcsCalendar(events: IcsEvent[]): string {
  const dtstamp = formatDateTimeUtc(new Date());

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Yakeline Contadora//Calendario Tributario 2026//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${buildUid(event)}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${formatDate(event.date)}`,
      `DTEND;VALUE=DATE:${formatDate(addDays(event.date, 1))}`,
      `SUMMARY:${escapeText(event.title)}`,
      `DESCRIPTION:${escapeText(buildDescription(event))}`,
      "TRANSP:TRANSPARENT",
      // Reminder 3 days before the deadline.
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(event.title)}`,
      "TRIGGER:-P3D",
      "END:VALARM",
      // Reminder 1 day before the deadline.
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(event.title)}`,
      "TRIGGER:-P1D",
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}

export function downloadIcs(filename: string, ics: string): void {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function googleCalendarUrl(event: IcsEvent): string {
  const start = formatDate(event.date);
  const end = formatDate(addDays(event.date, 1));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: buildDescription(event),
    location: "Colombia",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
