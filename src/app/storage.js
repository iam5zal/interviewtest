
export function saveToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('SESSION_TOKEN', token)
  }
}
export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('SESSION_TOKEN')
  }
}
