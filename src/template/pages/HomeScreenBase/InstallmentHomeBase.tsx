import { Kind } from '@src/lib/types'
import { Text, View } from 'react-native'

interface InstallmentHomeProps {
  kind: Kind
}

export default function InstallmentHomeBase({ kind }: InstallmentHomeProps) {
  return (
    <View>
      <Text>Installment Home Screen - {kind}</Text>
    </View>
  )
}