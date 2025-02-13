import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailHeader from '@/components/EmailHeader'
import EmailContent from '@/components/EmailContent'
import Button from '@/components/Button'
import { icons } from '@/constants'

const BusinessVerificationErrorEmail = () => {
  return (
   <SafeAreaView className='px-4 mt-3'>
    <EmailHeader 
    text='Polymer business'
    />
    <EmailContent 
    headerText='Business Verification'
    message='Error verifying  email .......'
    icon={icons.verificationError}
    />
    <Button
        title="Try again"
        buttonStyle="h-[49.77px] bg-primary-200"
      />
   </SafeAreaView>
  )
}

export default BusinessVerificationErrorEmail