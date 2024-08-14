DEFINE TABLE publication SCHEMAFULL
  PERMISSIONS
    FOR create WHERE $scope = 'user'
    FOR update, delete WHERE owner = $auth.id
;

DEFINE FIELD author ON TABLE publication TYPE record<user>
  VALUE $before OR $auth.id
  DEFAULT $auth.id
;

DEFINE FIELD source ON TABLE publication TYPE record<set | folder>
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
  IF meta::tb(source) = 'folder' {
    $this.content = CREATE ONLY folder CONTENT {
      author: $this.source.author,
      name: $this.source.name,
    };

    FOR $set IN (SELECT ->folder_set->set FROM folder WHERE id = $this.source.id AND out.author = $this.author) {
      $copy_set = CREATE ONLY publication CONTENT {
        author: $set.author,
        source: $set,
      };
    }
  }
};

DEFINE EVENT removal ON TABLE publication WHEN $event = 'DELETE' THEN {
  DELETE liked WHERE out = $before;
  DELETE folder_publication WHERE out = $before;
  DELETE $before.content;
};
