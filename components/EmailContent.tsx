import { View, Text } from 'react-native'
import React from 'react'
import { EmailContentProps } from '@/types/types'

const EmailContent = ({containerStyle, headerText, message, footerText, messageStyle, link}:EmailContentProps) => {
  return (
    <View className="mt-10 mb-5">
        <View className={`space-y-4  ${containerStyle}`}>
          <Text className="text-[14px] font-bold">
           {headerText}
          </Text>
          <Text className={`text-[12px] leading-[17.4px] font-gilroyMedium ${messageStyle}`}>
            {message}
          </Text>
          <Text className='text-[12px] text-primary-200'>{link}</Text>
          <Text className="text-[12px] font-bold">
          Thank you for choosing Polymer.
          </Text>
        </View>
      </View>
  )
}

export default EmailContent