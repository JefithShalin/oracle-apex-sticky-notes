function addNote(color) {
  var offset = ($('.sticky-note').length * 22) % 300;
  var posX   = 60 + offset;
  var posY   = 60 + offset;

  apex.server.process('ADD_NOTE', {
    x01: '',
    x02: color || 'yellow',
    x03: String(posX),
    x04: String(posY)
  }, {
    dataType: 'text',
    success: function(data) {
      var newId = $.trim(data);
      if (newId && !isNaN(newId)) {
        renderNote(parseInt(newId), '', color || 'yellow', posX, posY, 'Just now');
        setTimeout(function() {
          $('[data-id="' + newId + '"] .note-body').focus();
        }, 250);
      } else {
        console.error('ADD_NOTE: unexpected response:', data);
      }
    },
    error: function(xhr, s, e) { console.error('addNote error:', s, e); }
  });
}

function deleteNote(id, $el) {
  apex.server.process('DELETE_NOTE', { x01: String(id) }, {
    dataType: 'text',
    success: function() { $el.remove(); },
    error: function(xhr, s, e) { console.error('deleteNote error:', s, e); }
  });
}

function saveNote(id, text, x, y) {
  apex.server.process('UPDATE_NOTE', {
    x01: String(id),
    x02: text || '',
    x03: String(x),
    x04: String(y)
  }, {
    dataType: 'text',
    error: function(xhr, s, e) { console.error('saveNote error:', s, e); }
  });
}
