import User from "../models/UserModels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const createToken = (_id: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
};

export const signUpUser = async (req: Request, res: Response) => {
  console.log("Signup request received:", req.body);

  const { name, account, email, password, confirmPassword } = req.body;

  try {
    const user = await User.signUp(
      name,
      account,
      email,
      password,
      confirmPassword
    );
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { name, email, account, token },
    });
    
    
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, email, name: user.name },
    });
  } catch (error) {
    console.error("Sign-in error:", error);

    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};



































































{/*<ScreenWrapper>
         <StatusBar hidden />
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />
          }
          activeDot={
            <View className="w-[15px] h-[5px] mx-1 bg-primary-300 rounded-full" />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="flex-1 ">
              <ImageBackground
                source={images.onboardingBgImg}
                resizeMode="cover"
                className="w-full h-[422px] justify-center items-center"
              >
                <Image
                  source={item.image}
                  className="w-[250px] h-[250px] mb-6"
                  resizeMode="contain"
                />
              </ImageBackground>

              <View className="px-2 ">
                <View className="items-start ">
                  <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                    {item.title}
                  </Text>

                  <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">
                    {item.description}
                  </Text>
                </View>

                <View className="my-3">
                  <Button
                    title={isLastSlide ? "Get Started" : "Next"}
                    buttonStyle="w-[145px] h-[50px]"
                    handleClick={handleGetStarted}
                  />
                </View>

                <Text className="mb-10">
                  Already have an account?
                  <Link
                    href={ROUTES.SIGN_IN}
                    className="text-primary-300 font-semibold"
                  >
                    Log in
                  </Link>
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
       </ScreenWrapper>



       <SafeAreaView className="h-full ">
             <ScrollView className="">
             <StatusBar hidden />
               <Swiper
                 ref={swiperRef}
                 loop={false}
                 dot={
                   <View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />
                 }
                 activeDot={
                   <View className="w-[15px] h-[5px] mx-1 bg-primary-300 rounded-full" />
                 }
                 onIndexChanged={(index) => setActiveIndex(index)}
               >
                 {onboarding.map((item) => (
                   <View key={item.id} className="flex-1 ">
                     <ImageBackground
                       source={images.onboardingBgImg}
                       resizeMode="cover"
                       className="w-full h-[422px] justify-center items-center"
                     >
                       <Image
                         source={item.image}
                         className="w-[250px] h-[250px] mb-6"
                         resizeMode="contain"
                       />
                     </ImageBackground>
       
                     <View className="px-2 ">
                       <View className="items-start ">
                         <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                           {item.title}
                         </Text>
       
                         <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">
                           {item.description}
                         </Text>
                       </View>
       
                       <View className="my-3">
                         <Button
                           title={isLastSlide ? "Get Started" : "Next"}
                           buttonStyle="w-[145px] h-[50px]"
                           handleClick={handleGetStarted}
                         />
                       </View>
       
                       <Text className="mb-10">
                         Already have an account?
                        
                         <Link
                           href={ROUTES.SIGN_IN}
                           className="text-primary-300 font-semibold"
                         >
                           Log in
                         </Link>
                       </Text>
                     </View>
                   </View>
                 ))}
               </Swiper>
             </ScrollView>
           </SafeAreaView>*/}
