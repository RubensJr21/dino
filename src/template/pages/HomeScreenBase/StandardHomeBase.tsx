import { Kind } from '@src/lib/types'
import { Text, View } from 'react-native'

interface StandardHomeProps {
  kind: Kind
}

export default function StandardHomeBase({ kind }: StandardHomeProps) {
  return (
    <View className='w-100% bg-slate-700'>
      <Text>Standard Home Screen - {kind}</Text>
    </View>
  )
}