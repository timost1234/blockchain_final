import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as MinusIcon } from "feather-icons/dist/icons/minus.svg";
import Skeleton from "@yisheng90/react-loading";

import { useTranslation } from "react-i18next";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:mt-8 lg:flex-row md:items-center max-w-screen-xl mx-auto`;
const LeftColumn = tw.div`relative h-96 lg:w-1/3 lg:pr-12 flex flex-col`;
const RightColumn = tw.div`relative h-96 lg:w-2/3 mt-12 lg:mt-0 flex flex-col`;

const SmallTitle = tw.p`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`;
const TmpContainer = tw.dt`flex flex-col h-full justify-between items-center`;

const FAQSContainer = tw.dl``;
const FAQ = tw.div`cursor-pointer mt-4 select-none border lg:border-0 px-8 py-4 lg:p-0 rounded-lg lg:rounded-none`;
const Question = tw.dt`flex justify-between items-center`;
const CommonText = tw.span`text-lg lg:text-xl font-semibold`;
const SciText = tw.span`text-secondary-100 italic text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = styled.span`
  ${tw`ml-2 bg-primary-500 text-gray-100 p-1 rounded-full group-hover:bg-primary-700 group-hover:text-gray-200 transition duration-300`}
  svg {
    ${tw`w-4 h-4`}
  }
`;
const Answer = motion.custom(
  tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`
);

const PreviewImage = tw.img`mt-4 h-full rounded-md`;

const Actions = styled.div`
  ${tw`flex flex-row w-full mb-8 lg:mb-0 lg:justify-end`}
  .action {
    ${tw`text-center sm:w-48 mt-4 py-2 tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

const SkeletonContainer = tw.div`h-40 flex flex-col mt-4 w-full justify-between`;

const Skeletons = (
  <SkeletonContainer>
    <Skeleton height="40px" />
    <Skeleton height="40px" />
    <Skeleton height="40px" />
  </SkeletonContainer>
);

const preidctHandler = async (base64) => {
  try {
    const response = await fetch(
      "http://localhost:5000/v1/models/wood-iz_224-dr_0.3-lr_0.01:classify/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examples: [{ image: { b64: base64 } }],
        }),
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

const mapStateToProps = (state) => {
  return {
    imageURL: state.imageURL,
    result: state.result,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putImage: (url) => dispatch({ type: "PUTIMAGE", imageURL: url }),
    putResult: (result) => dispatch({ type: "PUTRESULT", result: result }),
    resetAll: () => dispatch({ type: "RESETALL" }),
    setError: () => dispatch({ type: "SETERROR" }),
  };
};

const ShowResult = (props) => {
  const { t } = useTranslation();

  const defaultFaqs = [
    {
      id: "MaSx",
      sciName: "Melia azedarach",
      commonName: "Chinaberry Tree",
      discriptsion:
        "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system.",
    },
    {
      id: "PcSx",
      sciName: "Pistacia chinensis",
      commonName: "Chinese pistache",
      discriptsion:
        "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system.",
    },
    {
      id: "TgSx",
      sciName: "Tectona grandis",
      commonName: "Teak",
      discriptsion:
        "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system.",
    },
    {
      id: "UpSx",
      sciName: "Ulmus parvifolia",
      commonName: "Chinese Elm",
      discriptsion:
        "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system.",
    },
    {
      id: "ZsSx",
      sciName: "Zelkova serrata",
      commonName: "Japanese Elm",
      discriptsion:
        "Yes, it is, if you have a membership with us. Otherwise it is charged as per the menu. Some limits do apply as to how much items can be included in your lunch. This limit is enough for any one person and merely exists to discourage abusal of the system.",
    },
  ];

  const primaryActionText = "Try Another Image";
  const secondaryActionText = "Reset";

  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      props.resetAll();
      props.putImage(reader.result);

      try {
        const base64result = reader.result.split(",")[1];
        preidctHandler(base64result).then((response) =>
          props.putResult(response.result)
        );
      } catch {
        props.setError();
      }
    };
    reader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const resetHandler = () => {
    props.resetAll();
  };

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <SmallTitle>{t("quickAdd.yourImage")}</SmallTitle>
          <PreviewImage src={props.imageURL} alt="Preview" />
        </LeftColumn>
        <RightColumn>
          <SmallTitle>Prediction Results</SmallTitle>

          <TmpContainer>
            {!props.result && Skeletons}
            {props.error && "ERROR!"}
            {props.result && !props.error && (
              <FAQSContainer>
                {props.result.map((result, index) => (
                  <FAQ
                    key={index}
                    onClick={() => {
                      toggleQuestion(index);
                    }}
                    className="group"
                  >
                    <Question>
                      <CommonText>
                        {
                          defaultFaqs.find((species) => species.id == result[0])
                            .commonName
                        }
                        <SciText>
                          {" "}
                          (
                          {
                            defaultFaqs.find(
                              (species) => species.id == result[0]
                            ).sciName
                          }
                          )
                        </SciText>
                      </CommonText>

                      <QuestionToggleIcon>
                        {activeQuestionIndex === index ? (
                          <MinusIcon />
                        ) : (
                          <PlusIcon />
                        )}
                      </QuestionToggleIcon>
                    </Question>
                    <Answer
                      variants={{
                        open: { opacity: 1, height: "auto", marginTop: "16px" },
                        collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                      }}
                      initial="collapsed"
                      animate={
                        activeQuestionIndex === index ? "open" : "collapsed"
                      }
                      transition={{
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      {
                        defaultFaqs.find((species) => species.id == result[0])
                          .discriptsion
                      }
                    </Answer>
                  </FAQ>
                ))}
              </FAQSContainer>
            )}

            <Actions>
              <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
              />
              <button
                onClick={pickImageHandler}
                className={"action primaryAction"}
              >
                {t("quickAdd.tryAnother")}
              </button>
              <button
                onClick={resetHandler}
                className={"action secondaryAction"}
              >
                {t("quickAdd.Reset")}
              </button>
            </Actions>
          </TmpContainer>
        </RightColumn>
      </TwoColumn>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowResult);
