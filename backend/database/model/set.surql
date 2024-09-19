DEFINE TABLE set SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select WHERE author = $auth.id OR $auth.id INSIDE (SELECT VALUE in FROM relationship WHERE out = id)
    FOR update WHERE author = $auth.id OR $auth.id INSIDE (SELECT VALUE in FROM relationship WHERE out = id AND role = "editor")
    FOR delete WHERE author = $auth.id
; 

DEFINE FIELD author ON TABLE set TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD name ON TABLE set TYPE string
  ASSERT string::len($value) > 0
;

DEFINE FIELD description ON TABLE set TYPE option<string>
;

DEFINE FIELD cards ON TABLE set TYPE array<record<card>>
;

DEFINE FIELD publication ON TABLE set TYPE option<record<publcation>>
;

DEFINE FIELD created ON TABLE set
  VALUE $before OR time::now()
  DEFAULT time::now() 
  READONLY;
DEFINE FIELD updated ON TABLE set
  VALUE time::now()
  DEFAULT time::now()
  READONLY;

DEFINE EVENT creature ON TABLE set WHEN $event = "CREATE" THEN {
  $this.cards =  (CREATE |card:3|)
};

DEFINE EVENT removal ON TABLE set WHEN $event = "DELETE" THEN {
  DELETE repetition WHERE out = $before.id; 
  DELETE gestalt WHERE out = $before.id; 
  DELETE folderTo WHERE out = $before.id;
  DELETE publication WHERE out = $before.id;
  DELETE $before.history;
  DELETE setTo WHERE in = $before.id;

  FOR $card IN $before.cards {
    DELETE $card;
  };
};
