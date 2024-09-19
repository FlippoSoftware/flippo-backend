DEFINE TABLE gestalt SCHEMAFULL TYPE RELATION IN user OUT set
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE in = $auth.id;

DEFINE FIELD type ON TABLE gestalt TYPE string
  ASSERT $value INSIDE ['list', 'random']
  DEFAULT "list"
;

DEFINE FIELD state ON TABLE gestalt TYPE string
  ASSERT $value INSIDE ['normal', 'repetition']
  DEFAULT "normal"
;

DEFINE FIELD listIndex ON TABLE gestalt TYPE number
  VALUE IF $value > -1 { RETURN $value } ELSE { RETURN 0 }
  DEFAULT 0
;

DEFINE FIELD repetitionIndex ON TABLE gestalt TYPE number
  VALUE IF $value > -1 { RETURN $value } ELSE { RETURN 0 }
  DEFAULT 0
;

DEFINE FIELD randomList ON TABLE gestalt TYPE option<array<record<card>>>
;