//myParcel.com credentials

export interface Credential{
    grant_type: String
    client_id: String
    client_secret: String
    scope: String
}

export const credentialKeys: Credential  = {
  "grant_type": "",
  "client_id": "",
  "client_secret": "",
  "scope": "*"
}
