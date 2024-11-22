export const useAuth = () => {
  const config = useRuntimeConfig()
  const token = useState('spotify_token', () => null)
  const user = useState('spotify_user', () => null)

  const login = () => {
    const scope = 'user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-top-read'
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.public.spotifyClientId,
      scope,
      redirect_uri: config.public.spotifyRedirectUri,
    })

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`
  }

  const handleCallback = async (code) => {
    try {
      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.public.spotifyRedirectUri,
      })

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            `${config.public.spotifyClientId}:${config.public.spotifyClientSecret}`
          )}`,
        },
        body: params.toString(),
      })

      const data = await response.json()
      token.value = data.access_token

      // Fetch user profile
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      
      user.value = await userResponse.json()
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  return {
    token,
    user,
    login,
    handleCallback,
    logout,
    isAuthenticated: computed(() => !!token.value)
  }
}
