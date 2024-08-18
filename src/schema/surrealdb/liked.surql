DEFINE TABLE liked SCHEMAFULL TYPE RELATION IN user OUT publication
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE in = $auth.id
;