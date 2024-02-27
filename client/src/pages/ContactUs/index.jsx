import React from "react";
import { Helmet } from "react-helmet";
import { Button, TextArea, Input, Text, Img, Heading } from "../../components";
import Footer from "../../components/Footer";

export default function ContactUsPage() {
  return (
    <>
      <Helmet>
        <title>blog-app</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[105px] bg-white-A700">
        <header className="flex justify-center items-center w-full p-6 bg-white-A700">
          <div className="flex flex-row justify-between items-center w-full mx-auto max-w-[1114px]">
            <div className="flex flex-row justify-between items-center w-[69%]">
              <Img src="images/img_group_150.svg" alt="image" className="h-6" />
              <div className="flex flex-row justify-center w-[53%]">
                <div className="flex flex-col items-end justify-start w-full gap-px">
                  <div className="flex flex-row justify-between w-full">
                    <Heading as="h6" className="!text-indigo-200_01 tracking-[0.12px] text-center">
                      Home
                    </Heading>
                    <Heading as="h6" className="!text-indigo-200_01 tracking-[0.12px] text-center">
                      Podcast
                    </Heading>
                    <Heading as="h6" className="!text-indigo-200_01 tracking-[0.12px] text-center">
                      Blog
                    </Heading>
                    <Heading as="h6" className="!text-indigo-900_01 tracking-[0.12px] text-center">
                      About
                    </Heading>
                    <Heading as="h6" className="!text-indigo-200_01 tracking-[0.12px] text-center">
                      Contact
                    </Heading>
                  </div>
                  <div className="h-px w-[13%] mr-[100px] bg-indigo-900_01" />
                </div>
              </div>
            </div>
            <Img src="images/img_search.svg" alt="search_one" className="h-[30px] w-[30px]" />
          </div>
        </header>
        <div className="flex flex-row justify-center w-full max-w-[1103px]">
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-center justify-start w-full">
              <Heading size="xl" as="h1" className="!text-blue_gray-600">
                Contact us
              </Heading>
              <Text as="p" className="mt-[5px]">
                Complete the form to contact us
              </Text>
              <div className="flex flex-row justify-start items-start w-full mt-[39px] gap-[29px]">
                <div className="flex flex-col items-start justify-start w-[29%] gap-[19px]">
                  <Heading size="xl" as="h2" className="!text-blue_gray-600">
                    Info
                  </Heading>
                  <div className="flex flex-col items-start justify-start w-full gap-[18px]">
                    <div className="flex flex-row justify-start items-center gap-2.5">
                      <Img src="images/img_vector_blue_gray_600.svg" alt="vector_one" className="h-5 w-5" />
                      <Text as="p">01234567890</Text>
                    </div>
                    <div className="flex flex-row justify-start items-center ml-[3px] gap-2.5">
                      <Img src="images/img_mail_1.svg" alt="mailone_one" className="h-5 w-5" />
                      <Text as="p">hello@gmail.com</Text>
                    </div>
                    <div className="flex flex-row justify-start items-start ml-[3px] gap-[9px]">
                      <Img src="images/img_pin_1.svg" alt="pinone_one" className="h-5 mt-[5px]" />
                      <Text as="p" className="w-[92%] leading-[30px]">
                        Massachusetts Ave NW, Washington, DC 20036
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center w-[69%] mt-2 p-[26px] bg-white-A700 shadow-xl rounded-[10px]">
                  <div className="flex flex-col items-start justify-start w-full gap-[30px] my-[17px]">
                    <div className="flex flex-row justify-start gap-[25px]">
                      <Input type="text" name="name" placeholder="Your Name" className="w-[49%] font-light" />
                      <Input type="email" name="email" placeholder="Your Email" className="w-[49%] font-light" />
                    </div>
                    <Input name="your_subject" placeholder="Your Subject" className="w-full font-light" />
                    <TextArea
                      name="description"
                      placeholder="Description"
                      className="w-full text-gray-400 font-light"
                    />
                    <Button color="indigo_900_01" size="5xl" shape="round" className="!text-white-A700 min-w-[190px]">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full p-[33px] bg-gray-600_01" />
      </div>
    </>
  );
}
