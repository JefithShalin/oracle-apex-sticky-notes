function renderNote(id, text, color, x, y, createdDate) {
  $('[data-id="' + id + '"]').remove();

  var safeColor = ['yellow','pink','blue','green','purple','orange'].indexOf(color) > -1
                  ? color : 'yellow';

  var $note = $('<div>')
    .addClass('sticky-note ' + safeColor)
    .attr('data-id', id)
    .css({ left: x + 'px', top: y + 'px' });

  var $header = $('<div>').addClass('note-header');
  var $dots   = $('<div>').addClass('note-drag-dots')
    .append('<span></span><span></span><span></span><span></span><span></span><span></span>');
  var $delBtn = $('<button>').addClass('note-delete')
    .attr('title', 'Delete note')
    .attr('type',  'button')
    .html('✕');
  $header.append($dots).append($delBtn);

  var $body = $('<div>')
    .addClass('note-body')
    .attr('contenteditable', 'true')
    .attr('spellcheck', 'false')
    .attr('role', 'textbox')
    .attr('aria-label', 'Sticky note text')
    .attr('aria-multiline', 'true');

  if (text && text !== 'New note...') {
    $body.text(text);
  }

  var $ts = $('<div>').addClass('note-timestamp');
  if (createdDate) { $ts.text(createdDate); }

  $note.append($header).append($body).append($ts);
  $('#notes-board').append($note);

  $note.draggable({
    containment : '#notes-board',
    handle      : '.note-header',
    cancel      : '.note-body, .note-timestamp',
    scroll      : false,
    start: function() {
      $(this).css('z-index', 100);
    },
    stop: function(e, ui) {
      $(this).css('z-index', 50);
      saveNote(
        id,
        $('[data-id="' + id + '"] .note-body').text(),
        Math.round(ui.position.left),
        Math.round(ui.position.top)
      );
    }
  });

  $body.on('click', function(e) {
    e.stopPropagation();
    $(this).focus();
    if (document.caretRangeFromPoint) {
      var range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  });

  $body.on('mousedown', function(e) { e.stopPropagation(); });
  $body.on('keydown',   function(e) { e.stopPropagation(); });

  $body.on('blur', function() {
    saveNote(
      id,
      $(this).text(),
      Math.round(parseInt($note.css('left'))),
      Math.round(parseInt($note.css('top')))
    );
  });

  $delBtn.on('click', function(e) {
    e.stopPropagation();
    $note.css({ opacity: '0', transform: 'scale(0.8)' });
    setTimeout(function() { deleteNote(id, $note); }, 180);
  });

  $note.on('mousedown', function() {
    $('.sticky-note').css('z-index', 10);
    $(this).css('z-index', 50);
  });
}
