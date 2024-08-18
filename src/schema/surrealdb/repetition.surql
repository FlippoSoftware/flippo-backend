DEFINE TABLE repetition SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE owner = $auth.id;

DEFINE FIELD owner ON TABLE repetition TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;
DEFINE FIELD cards ON TABLE repetition TYPE array<record<card>>;


DEFINE EVENT removal ON TABLE repetition WHEN $event = 'DELETE' THEN {
  DELETE repetition_set WHERE in = $before;
}
;