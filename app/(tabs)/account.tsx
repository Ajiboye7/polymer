{/*import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmailHeader from '@/components/EmailHeader'

const BusinessVerificationSuccessfulEmail = () => {
  return (
<SafeAreaView className=' px-4 pt-3 '>
  <EmailHeader 
  text='Polymer business'
  />

</SafeAreaView>
  )
}

export default BusinessVerificationSuccessfulEmail*/}


import React from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { VictoryPie } from 'victory-native';

const screenWidth = Dimensions.get('window').width;

// Define types for chart data
interface PieChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface ChartData {
  x: string;
  y: number;
}

{/*const AnalyticsScreen = () => {
  const debitCreditData = [
    { x: 'Debit', y: 40 },
    { x: 'Credit', y: 60 },
  ];
}*/}

const AnalyticsScreen: React.FC = () => {
  const debitCreditData: PieChartData[] = [
    { name: 'Debit', amount: 400, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Credit', amount: 600, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  ];

  const monthlyData: number[] = [400, 500, 600, 700, 650, 800]; // Example monthly data

  return (
    <ScrollView className='px-4'>
      <View>
        <Text className="text-lg font-bold mb-3">Bar Chart</Text>
        <BarChart
  data={{
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: monthlyData }],
  }}
  width={screenWidth - 32}
  height={220}
  yAxisLabel="$"
  yAxisSuffix="" // Provide a suffix to avoid TypeScript error
  chartConfig={{
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5,
  }}
  style={{ marginVertical: 8, borderRadius: 16 }}
/>

        <Text className="text-lg font-bold mt-5 mb-3">Pie Chart</Text>
        
        <VictoryPie
        data={debitCreditData}
        colorScale={['red', 'green']}
        innerRadius={50}
        padAngle={3} // Creates space between segments
        labels={({ datum }: { datum: ChartData }) => `${datum.x}: ${datum.y}%`}
        style={{
          labels: { fill: 'white', fontSize: 12, fontWeight: 'bold' },
        }}
      />
         
        <PieChart
          data={debitCreditData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        <Text className="text-lg font-bold mt-5 mb-3">Line Chart</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{ data: monthlyData }],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#022173',
            backgroundGradientFrom: '#1c92d2',
            backgroundGradientTo: '#f2fcfe',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>
    </ScrollView>
  );
};

export default AnalyticsScreen;
