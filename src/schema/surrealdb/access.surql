DEFINE TABLE access SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $scope = 'user'
    FOR select WHERE user = $auth.id OR resource.author = $auth.id  
    FOR update, delete WHERE resource.author = $auth.id  
;

DEFINE FIELD user ON TABLE access TYPE record<user>
;

DEFINE FIELD permission ON TABLE access TYPE string
  ASSERT $value INSIDE ['view', 'edit']
  DEFAULT 'view'
;

DEFINE FIELD resource ON TABLE access TYPE record<set | folder>
;

DEFINE EVENT removal ON TABLE access WHEN $event = 'DELETE' THEN {
  DELETE folder_access WHERE out = $before;
};