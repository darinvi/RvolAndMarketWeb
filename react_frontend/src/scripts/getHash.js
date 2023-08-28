export default async function getHash(msg) {
        const encoded = new TextEncoder().encode(msg)
        const digested = await crypto.subtle.digest('SHA-256', encoded)
        const hash = Array.from(new Uint8Array(digested)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
        return hash
}
