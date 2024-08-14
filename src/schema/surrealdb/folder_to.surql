DEFINE TABLE folder_to SCHEMAFULL TYPE RELATION IN folder OUT set | access | publication
  PERMISSIONS
    FOR create WHERE $scope = 'user'
    FOR select, update, delete WHERE in.author = $auth.id
;