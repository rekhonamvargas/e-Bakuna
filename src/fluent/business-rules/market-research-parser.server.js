(function executeRule(current, previous) {
  // Recursion guard: if already parsing in this transaction, exit.
  if (current.parsing_guard == true) {
    return;
  }

  // Only attempt parsing when we have at least something to parse.
  var subject = (current.email_subject || '').toString();
  var body = (current.raw_body || '').toString();
  var text = (subject + '\n' + body).trim();

  if (!text) {
    current.status = 'new';
    return;
  }

  current.parsing_guard = true;

  // Minimal parsing heuristic (safe default):
  // - topic = subject (fallback to first line of body)
  // - summary = first 200 chars of body
  var firstBodyLine = body.split(/\r?\n/)[0] || '';
  var topic = subject || firstBodyLine;
  current.topic = (topic || '').toString().substring(0, 255);

  var summary = body;
  if (summary.length > 200) {
    summary = summary.substring(0, 200) + '…';
  }
  current.summary = summary;

  current.status = 'parsed';

  // Clear guard before commit so it does not persist as true.
  current.parsing_guard = false;
})(current, previous);
