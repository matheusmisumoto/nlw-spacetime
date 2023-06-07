import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import Stripes from '../assets/stripes.svg'
import { api } from '../lib/api'
const StyledStripes = styled(Stripes)

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Ubuntu_700Bold,
  })

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/8dea7a8cf0a3b666c929',
  }

  const [request, response, signWithGitHub] = useAuthRequest(
    {
      clientId: '8dea7a8cf0a3b666c929',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'livenotes',
      }),
    },
    discovery,
  )

  async function handleGitHubOAuth(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data
    console.log(token)

    await SecureStore.setItemAsync('token', token)

    router.push('/notes')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleGitHubOAuth(code)
    }
  }, [response])

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 px-10 py-10">
      <StyledStripes className="absolute left-2" />
      <View className="flex-1 items-center justify-center gap-6">
        <Text className="text-center font-title text-4xl leading-tight text-gray-50">
          My Live Notes
        </Text>
        <Text className="px-8 text-center font-body text-base leading-relaxed text-gray-100">
          Crie anotações em tempo real de palestras, cursos e eventos!
        </Text>
        <TouchableOpacity className="rounded-full bg-green-500 px-5 py-2">
          <Text
            disabled={!request}
            className="font-alt text-sm uppercase text-black"
            onPress={() => signWithGitHub()}
          >
            Nova anotação
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito durante o NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
