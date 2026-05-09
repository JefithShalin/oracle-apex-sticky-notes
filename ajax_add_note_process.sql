DECLARE
  v_id NUMBER;
BEGIN
  INSERT INTO sticky_notes (note_text, color, pos_x, pos_y, created_by, created_date)
  VALUES (
    APEX_APPLICATION.G_X01,
    NVL(APEX_APPLICATION.G_X02, 'yellow'),
    TO_NUMBER(NVL(APEX_APPLICATION.G_X03, '60')),
    TO_NUMBER(NVL(APEX_APPLICATION.G_X04, '60')),
    SYS_CONTEXT('APEX$SESSION','APP_USER'),
    SYSDATE
  ) RETURNING note_id INTO v_id;
  COMMIT;
  HTP.P(v_id);
END;
