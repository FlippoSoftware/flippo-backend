DEFINE TABLE publication SCHEMAFULL TYPE RELATION IN user OUT fodler | set
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR update, delete WHERE author = $auth.id
;

DEFINE FIELD author ON TABLE publication TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD created ON TABLE publication TYPE datetime
  VALUE $before OR time::now()
  DEFAULT time::now()
;
DEFINE FIELD updated ON TABLE publication TYPE datetime
  VALUE time::now()
  DEFAULT time::now()
;

DEFINE EVENT created ON TABLE publication WHEN $event = 'CREATE' THEN {
  LET $table = record::tb(out);
  IF $table = 'folder' {
    FOR $set IN (SELECT ->folderTo->set[WHERE author = $after.in] FROM $after.out) {
      CREATE publication CONTENT {
        in: $after.in,
        out: $set.id,
      };
    }
  }
};

DEFINE EVENT removal ON TABLE publication WHEN $event = 'DELETE' THEN {
  DELETE relationship WHERE out = $before.out AND typeView = "like";
};