import { Button, Img, Text } from "components"

const HomeSection = () => {
  return (
    <>
        <div className="flex flex-row justify-center w-[93%]">
        <div className="flex flex-col items-center justify-start w-full">
            <div className="flex flex-row justify-start items-start w-full gap-[43px]">
            <Img src="images/img_brand_1.svg" alt="brandone_one" className="h-[61px] w-[61px] mt-[66px]" />
            <div className="flex flex-col items-center justify-start w-4/5 mb-9 gap-[30px]">
                <p className="text-center text-[48px] fw-bold text-gray-600_01">
                Social Media for Blogs and podcasts, hope you enjoy 
                </p>
                <Text size="lg" as="p" className="w-[78%] !text-gray-600 text-center leading-[35px]">
                Increase your knowledge by reading new things and listening new things. 
                Share your voice & thoughts to the world.
                </Text>
            </div>
            <Img src="images/img_blog_1.svg" alt="blogone_one" className="h-[61px] w-[61px] mt-[205px]" />
            </div>
            <div className="flex flex-row justify-start w-[51%] mt-[-4px] gap-[25px]">
            <Button
                color="indigo_900_01"
                size="4xl"
                className="!text-white-A700 tracking-[0.12px] shadow-sm min-w-[221px] rounded-[35px]"
            >
                Login
            </Button>
            <Button
                color="indigo_200"
                size="4xl"
                variant="outline"
                className="tracking-[0.12px] min-w-[271px] rounded-[35px]"
            >
                Create Account
            </Button>
            </div>
        </div>
        </div>
    </>
  )
}

export default HomeSection