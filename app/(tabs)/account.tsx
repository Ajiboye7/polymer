import { View, Text, TouchableOpacity, Image} from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransferHeader from '@/components/TransferHeader'
import CustomView from '@/components/CustomView'
import { icons, images } from '@/constants'

const Beneficiary = () => {
  const [selectedMode, setSelectMode] = useState <"newTransfer" | "beneficiary">( "beneficiary")
  return (
    <SafeAreaView className='flex-1'>
      
       <TransferHeader title='Local Transfer'/>
       <CustomView>
       <View className="flex flex-row justify-between items-center h-[100px] bg-primary-200 px-2 my-5 rounded-[25px]">
            <TouchableOpacity onPress={() => setSelectMode("newTransfer")}>
              <View
                className={` w-[166.5px] h-[80px] items-center justify-center rounded-[20px]  space-y-3 ${
                  selectedMode === "newTransfer" ? "bg-primary-300" : "bg-none"
                }`}
              >
                <Image
                  source={
                    selectedMode === "newTransfer"
                      ? icons.activeBank
                      : icons.inActiveBank
                  }
                />
                <Text
                  className={`text-[12px] font-gilroyBold  ${
                    selectedMode === "newTransfer"
                      ? "text-white"
                      : "text-secondary-600"
                  } `}
                >
                  New Transfer
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectMode("beneficiary")}>
              <View
                className={` w-[166.5px] h-[80px] items-center justify-center rounded-[20px] space-y-2 ${
                  selectedMode === "beneficiary" ? "bg-primary-300" : "bg-none"
                }`}
              >
                <Image
                  source={
                    selectedMode === "beneficiary"
                      ? icons.activeBeneficiary
                      : icons.inActiveBeneficiary
                  }
                />
                <Text
                  className={`text-[12px] font-gilroyBold  ${
                    selectedMode === "beneficiary"
                      ? "text-white"
                      : "text-secondary-600"
                  } `}
                >
                  Beneficiary
                </Text>
              </View>
            </TouchableOpacity>
          </View>
       </CustomView>
    </SafeAreaView>
     
    
  )
}

export default Beneficiary