function loadNotes() {
  $('#notes-board').empty();
  apex.server.process('LOAD_NOTES', {}, {
    dataType: 'text',
    success: function(data) {
      var trimmed = $.trim(data);
      if (!trimmed || trimmed.length === 0) { return; }
      var notes;
      try {
        notes = JSON.parse(trimmed);
      } catch(e) {
        console.error('LOAD_NOTES parse error:', e, '| Raw:', trimmed);
        apex.message.showErrors([{
          type    : 'error',
          location: 'page',
          message : 'Could not load notes. Check browser console for details.'
        }]);
        return;
      }
      if (!Array.isArray(notes)) { return; }
      notes.forEach(function(n) {
        renderNote(
          n.id,
          n.text  || '',
          n.color || 'yellow',
          n.x     || 60,
          n.y     || 60,
          n.created_date || ''
        );
      });
    },
    error: function(xhr, status, err) {
      console.error('LOAD_NOTES AJAX error:', status, err);
    }
  });
}
