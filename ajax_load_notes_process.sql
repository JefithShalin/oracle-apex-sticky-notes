DECLARE
BEGIN
  OWA_UTIL.MIME_HEADER('application/json', FALSE);
  OWA_UTIL.HTTP_HEADER_CLOSE;

  APEX_JSON.OPEN_ARRAY;
  FOR r IN (
    SELECT note_id,
           note_text,
           color,
           pos_x,
           pos_y,
           TO_CHAR(created_date, 'DD Mon YYYY HH24:MI') AS created_date
    FROM   sticky_notes
    WHERE  created_by = SYS_CONTEXT('APEX$SESSION','APP_USER')
    ORDER  BY created_date
  ) LOOP
    APEX_JSON.OPEN_OBJECT;
    APEX_JSON.WRITE('id',           r.note_id);
    APEX_JSON.WRITE('text',         NVL(r.note_text, ''));
    APEX_JSON.WRITE('color',        NVL(r.color, 'yellow'));
    APEX_JSON.WRITE('x',            NVL(r.pos_x, 60));
    APEX_JSON.WRITE('y',            NVL(r.pos_y, 60));
    APEX_JSON.WRITE('created_date', NVL(r.created_date, ''));
    APEX_JSON.CLOSE_OBJECT;
  END LOOP;
  APEX_JSON.CLOSE_ARRAY;
END;
