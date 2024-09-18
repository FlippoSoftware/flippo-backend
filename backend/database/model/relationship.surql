DEFINE TABLE relationship SCHEMAFULL TYPE RELATION IN user OUT folder | set
  PERMISSIONS
    FOR create WHERE $access = 'user'
    FOR select, delete WHERE in.id = $auth.id OR out.author = $auth.id 
    FOR update WHERE out.author = $auth.id
;

DEFINE FIELD viewType ON TABLE relationship TYPE string
;  # viewType: "like" | "person" | "publication" | "available"

DEFINE FIELD role ON TABLE relationship TYPE string
; # role: "observer" | "editor" | "owner"