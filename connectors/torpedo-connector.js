export async function sendToTorpedo(payload) {
  return { ok: true, reference: payload.reference || null };
}
