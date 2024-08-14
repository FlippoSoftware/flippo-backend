DEFINE TABLE liked SCHEMAFULL TYPE RELATION IN user OUT publication
  PERMISSIONS
    FOR create WHERE $scope = 'user'
    FOR select, update, delete WHERE in = $auth.id
;