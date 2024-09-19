DEFINE TABLE tag SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE owner = $auth.id
;

DEFINE FIELD name ON TABLE tag TYPE string 
  ASSERT string::len($value) > 0
;

DEFINE FIELD owner ON TABLE tag TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD created ON TABLE set
  VALUE $before OR time::now()
  DEFAULT time::now() 
  READONLY;
DEFINE FIELD updated ON TABLE set
  VALUE time::now()
  DEFAULT time::now()
  READONLY;

DEFINE EVENT removal ON TABLE tag WHEN $event = "DELETE" THEN {
  DELETE setTo WHERE out = $before.id;
};