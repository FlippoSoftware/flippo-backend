DEFINE TABLE gestalt SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE owner = $auth.id;

DEFINE FIELD owner ON TABLE gestalt TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD type ON TABLE gestalt TYPE string
  ASSERT $value INSIDE ['list', 'random']
  DEFAULT "list"
;

DEFINE FIELD state ON TABLE gestalt TYPE string
  ASSERT $value INSIDE ['normal', 'repetition']
  DEFAULT "normal"
;

DEFINE FIELD list_index ON TABLE gestalt TYPE number
  VALUE IF $value > -1 { RETURN $value } ELSE { RETURN 0 }
  DEFAULT 0
;

DEFINE FIELD repetition_index ON TABLE gestalt TYPE number
  VALUE IF $value > -1 { RETURN $value } ELSE { RETURN 0 }
  DEFAULT 0
;

DEFINE FIELD random_list ON TABLE gestalt TYPE option<array<record<card>>>
;

DEFINE EVENT removal ON TABLE gestalt WHEN $event = 'DELETE' THEN {
  DELETE gestalt_set WHERE in = $before;
}
;