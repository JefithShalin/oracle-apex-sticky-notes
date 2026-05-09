BEGIN
  UPDATE sticky_notes
  SET    note_text = APEX_APPLICATION.G_X02,
         pos_x     = TO_NUMBER(NVL(APEX_APPLICATION.G_X03, '60')),
         pos_y     = TO_NUMBER(NVL(APEX_APPLICATION.G_X04, '60'))
  WHERE  note_id   = TO_NUMBER(APEX_APPLICATION.G_X01)
  AND    created_by = SYS_CONTEXT('APEX$SESSION','APP_USER');
  COMMIT;
END;
