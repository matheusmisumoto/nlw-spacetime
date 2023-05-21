import { StatusBar } from 'expo-status-bar'
import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter'
import { Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import Stripes from './assets/stripes.svg'
const StyledStripes = styled(Stripes)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Ubuntu_700Bold,
  })

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
          <Text className="font-alt text-sm uppercase text-black">
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
