import { Kind } from '@src/lib/types'
import { Text, View } from 'react-native'

interface RecurringHomeProps {
  kind: Kind
}

export default function RecurringHomeBase({ kind }: RecurringHomeProps) {
  return (
    <View>
      <Text>Recurring Home Screen - {kind}</Text>
    </View>
  )
}