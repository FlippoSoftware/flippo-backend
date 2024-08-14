DEFINE TABLE folder SCHEMAFULL
  PERMISSIONS
    FOR create WHERE  $scope = 'user'
    FOR select WHERE author = $auth.id OR fn::viewingIsAllowed(access_settings, 'view') OR 
      (IF (SELECT * FROM liked WHERE in = $auth.id AND out = $this.id LIMIT 1) {RETURN TRUE;})
    FOR update WHERE author = $auth.id OR fn::viewingIsAllowed(access_settings, 'edit') 
    FOR delete WHERE author = $auth.id
;

DEFINE FIELD author ON TABLE folder TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD name ON TABLE folder TYPE string
  ASSERT string::len($value) > 0
;

DEFINE FIELD created ON TABLE set
  VALUE $before OR time::now()
  DEFAULT time::now() 
  READONLY;
DEFINE FIELD updated ON TABLE set
  VALUE time::now()
  DEFAULT time::now()
  READONLY;

DEFINE EVENT removal ON TABLE folder WHEN $event = 'DELETE' THEN {
  DELETE folder_set WHERE in = $before;
  DELETE folder_available WHERE in = $before;
  DELETE folder_publication WHERE in = $before;
};
