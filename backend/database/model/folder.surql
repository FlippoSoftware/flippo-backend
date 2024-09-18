DEFINE TABLE folder SCHEMAFULL
  PERMISSIONS
    FOR create WHERE  $access = 'user'
    FOR select WHERE author = $auth.id OR $auth.id INSIDE (SELECT VALUE in FROM relationship WHERE out = id)
    FOR update WHERE author = $auth.id OR $auth.id INSIDE (SELECT VALUE in FROM relationship WHERE out = id AND role = "editor")
    FOR delete WHERE author = $auth.id
;

DEFINE FIELD author ON TABLE folder TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD name ON TABLE folder TYPE string
  ASSERT string::len($value) > 0
;

DEFINE FIELD created ON TABLE set
  VALUE $before OR time::now()
  DEFAULT time::now() 
  READONLY;
DEFINE FIELD updated ON TABLE set
  VALUE time::now()
  DEFAULT time::now()
  READONLY;

DEFINE EVENT removal ON TABLE folder WHEN $event = 'DELETE' THEN {
  DELETE folderTo WHERE in = $before.id;
};
