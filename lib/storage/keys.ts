enum Prefixes {
  SIGNING_KEY_SECURE_STORE = "ss_key_",
}

export function getPassSSKey(session_id: string) {
  return Prefixes.SIGNING_KEY_SECURE_STORE + session_id;
}
