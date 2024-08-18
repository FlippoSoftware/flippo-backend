DEFINE TABLE set SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select WHERE author = $auth.id OR fn::viewingIsAllowed(access_settings, 'view') OR 
      (IF (SELECT * FROM liked WHERE in = $auth.id AND out = $this.id LIMIT 1) {RETURN TRUE;})
    FOR update WHERE author = $auth.id OR fn::viewingIsAllowed(access_settings, 'edit') 
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

DEFINE FIELD count_cards ON TABLE set TYPE number
  VALUE array::len(cards)
  DEFAULT array::len(cards)
;

DEFINE FIELD history ON TABLE set TYPE record<history>
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
  DELETE tag_set WHERE out = $before;
  DELETE repetition WHERE repetition_set->set = $before; 
  DELETE gestalt WHERE gestalt_set->set = $before; 
  DELETE folder_to WHERE out = $before;
  DELETE access WHERE resource = $before;
  DELETE $before.history;
  DELETE $before.publcation;

  FOR $card IN $before.cards {
    DELETE $card;
  };
};
