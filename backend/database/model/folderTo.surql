DEFINE TABLE folderTo SCHEMAFULL TYPE RELATION IN folder OUT set
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, update, delete WHERE in.author = $auth.id
;