DEFINE TABLE repetition SCHEMAFULL TYPE RELATION IN user OUT set
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE in = $auth.id
;

DEFINE FIELD cards ON TABLE repetition TYPE array<record<card>>
;