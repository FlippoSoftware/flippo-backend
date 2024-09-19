DEFINE TABLE setTo SCHEMAFULL TYPE RELATION IN set OUT tag
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE in.author = $auth.id
;