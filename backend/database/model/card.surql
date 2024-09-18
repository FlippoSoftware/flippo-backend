DEFINE TABLE card SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $access = 'user'
;

DEFINE FIELD set ON TABLE card TYPE record<set>;
DEFINE FIELD question ON TABLE card TYPE option<string>
;

DEFINE FIELD answer ON TABLE card TYPE option<string>
;

DEFINE FIELD extendedAnswer ON TABLE card TYPE option<string>
;

DEFINE FIELD created ON TABLE set
  VALUE $before OR time::now()
  DEFAULT time::now() 
  READONLY
;
DEFINE FIELD updated ON TABLE card TYPE datetime
  VALUE time::now()
  DEFAULT time::now() 
  READONLY
;

DEFINE FIELD state ON TABLE card TYPE string
  ASSERT $value INSIDE ['none', 'reserved', 'process', 'ready']
  DEFAULT 'none'
;

DEFINE FIELD editors ON TABLE card TYPE option<array<record<user>>>
  DEFAULT NULL
;

DEFINE EVENT removal ON TABLE card WHEN $event = 'DELETE' THEN {
  FOR $repetition in (SELECT VALUE id FROM repetition WHERE $before.id INSIDE cards) {
    UPDATE $repetition MERGE {
      cards: (RETURN array::remove($repetition.cards,  array::find_index($repetition.cards, $before.id)))
    };
  };

  FOR $gestalt in (SELECT VALUE id FROM gestalt WHERE $before.id INSIDE random_list) {
    UPDATE $gestalt MERGE {
      cards: (RETURN array::remove($gestalt.cards,  array::find_index($gestalt.cards, $before.id)))
    };
  };
}
;



