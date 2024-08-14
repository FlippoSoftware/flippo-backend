DEFINE TABLE history SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $scope = 'user'
;

DEFINE FIELD owner ON history TYPE record<set>
;

DEFINE FIELD actions ON history TYPE array<object>
  ASSERT array::len($value) <= 4 
;
/* action = {
              editor: record<user>,
              type: create | update | learning | publicated,
              date: datetime
            } 
*/