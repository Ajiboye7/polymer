import home from "@/assets/icons/home.png";
import card from "@/assets/icons/card.png";
import payment from "@/assets/icons/send-2.png";
import profile from "@/assets/icons/Group 6.png";
import accessBank from "@/assets/icons/Access Bank svg.png";
import check from "@/assets/icons/fa_check.png";
import cancel from "@/assets/icons/foundation_x.png";
import arrowLeft from "@/assets/icons/Arrow Left.png";
import user from "@/assets/icons/user-octagon.png";
import add from "@/assets/icons/add.png";
import live from "@/assets/icons/Frame 14115.png";
import gtBank from "@/assets/icons/GUARANTY Trust Bank - jpeg.png";
import sterling from "@/assets/icons/image 6.png";
import mtn from "@/assets/icons/MTN Nigeria - jpeg.png";
import setting from "@/assets/icons/information.png";
import opay from "@/assets/icons/OPay - png.png";
import facebook from "@/assets/icons/path16.png";
import tick from "@/assets/icons/shield-tick.png";
import send from "@/assets/icons/send-2.png";
import rotateLeft from "@/assets/icons/rotate-left.png";
import eye from "@/assets/icons/Group.png";
import nigeria from "@/assets/icons/Vector (1).png";
import america from "@/assets/icons/Group 1.png";
import instagram from "@/assets/icons/Instagram.png";
import quote from "@/assets/icons/glass.png";
import icon from "@/assets/icons/icon.png";
import nin from "@/assets/icons/external-drive.png"
import bvn from "@/assets/icons/finger-cricle.png"
import light from "@/assets/icons/sun.png"
import caution from "@/assets/icons/grammerly.png"
import businessOwner from "@/assets/icons/Group 160.png"
import regularUser from "@/assets/icons/user-tick.png"
import rates from "@/assets/icons/arrange-circle-2.png"
import send2 from "@/assets/icons/Frame 34 (1).png"
import dropDown from "@/assets/icons/arrow-square-down.png"
import exchange from "@/assets/icons/Exchange Button.png"
import ring from "@/assets/icons/Group 2086.png"
import arrowSquareRight from "@/assets/icons/arrow-square-right.png"
import copy from "@/assets/icons/copy.png"
import share from "@/assets/icons/share.png"



import barCode from "@/assets/images/bar-code-svgrepo-com.png"
import faceScan from "@/assets/images/face scan.png"
import oops from "@/assets/images/Frame 14135.png"
import warning from "@/assets/images/Group 2098.png"
import splash from "@/assets/images/splash.png"
import onboarding1 from"@/assets/images/Group 45.png"
import onboarding2 from"@/assets/images/Frame 14119.png"
import onboarding3 from"@/assets/images/Group 2076.png"
import onboardingBgImg from "@/assets/images/Frame 1.png"
import animation from "@/assets/images/Animation - 1734593298170.gif"
import oppsRetry from "@/assets/images/Group 1484576906.png"
import exclamation from "@/assets/images/Group 1484576908.png"
import balanceBg from "@/assets/images/My Balamce.png"
import fundAccountBg from "@/assets/images/Background Art.png"



import OnboardingAnimation1 from "@/assets/animations/Animation - 1734593298170.json";
import OnboardingAnimation2 from "@/assets/animations/onboarding2.json";
import OnboardingAnimation3 from "@/assets/animations/onboarding3.json";


export const icons= {
    home,
    card,
    payment,
    profile,
    accessBank,
    check,
    cancel,
    arrowLeft,
    user,
    add,
    live,
    gtBank,
    sterling,
    mtn,
    setting,
    opay,
    facebook,
    tick,
    send,
    rotateLeft,
    eye,
    nigeria,
    instagram,
    quote,
    icon,
    nin,
    bvn,
    light,
    caution,
    businessOwner,
    regularUser,
    rates,
    send2,
    dropDown, 
    exchange,
    america,
    ring,
    arrowSquareRight,
    copy,
    share,
}


export const images ={
    barCode,
    faceScan,
    oops,
    warning,
    splash,
    onboarding1,
    onboarding2,
    onboarding3,
    onboardingBgImg,
    animation,
    oppsRetry,
    exclamation,
    balanceBg,
    fundAccountBg,
}


export const animations = {
    OnboardingAnimation1,
    OnboardingAnimation2,
    OnboardingAnimation3,
}



export const onboarding = [
    {
      id: 1,
      title: "Make International payments with Ease",
      description:
        "Polymer makes the process of making payments internationally seamless. Cross-border transactions  are now simpler, swift and secure.",
      image: images.onboarding1,
    },
    {
      id: 2,
      title: "Receive Global payments",
      description:
        "Effortlessly receive global payments with Polymer, ensuring a secure and streamlined solution for funds from across the world.",
      image: images.onboarding2,
    },
    {
      id: 3,
      title: "Military-Grade Security",
      description:
        "Your data sleeps behind a vault of code. Untouched, Unbreachable. Signup and sleep tight.",
      image: images.onboarding3,
    },
  ];


  
  export const transactions =[
    {
      id: 1,
      title: "Airtime purchase",
      amount:"-₦5,000.50",
      time:"Today 03:09 PM",
      image:icons.mtn,
      type: "debit"
      
    },

    {
      id: 2,
      title: "Sent to GTBank",
      amount:"-₦55,610.75",
      time:"Today 11:37 AM",
      image:icons.gtBank,
      type: "debit"
    },

    {
      id: 3,
      title: "Recieved from Access Bank",
      amount:"+₦205,000.00",
      time:"Today 08:30 PM",
      image:icons.accessBank,
      type: "credit"

    },

    {
      id: 4,
      title: "Sent to Opay",
      amount:"-₦23,010.75",
      time:"Today 08:30 PM",
      image:icons.opay,
      type: "debit"
    },
  ]

  
  export  const currencies = [
    {
      name: "US Dollar",
      short: "USD",
      rate: "1,280.00",
      symbol: "$",
      icon: icons.america,
    },
    {
      name: "Canadian Dollar",
      short: "CAD",
      rate: "981.28",
      symbol: "$",
      icon: icons.gtBank,
    },
    {
      name: "British Pound",
      short: "GBP",
      rate: "1,652.05",
      symbol: "£",
      icon: icons.opay,
    },
    {
      name: "Euro",
      short: "EUR",
      rate: "1,412.01",
      symbol: "€",
      icon: icons.mtn,
    },
    {
      name: "Chinese Yuan",
      short: "CNY",
      rate: "197.70",
      symbol: "¥",
      icon: icons.nigeria,
    },
  ];