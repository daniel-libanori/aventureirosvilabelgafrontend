import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { IntroductionModal } from "../chapterEdit/introductionModal";
import { useLayoutEffect, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { AddExplorationPointModal } from "./addExplorationPointModal";
import { getChapter } from "../../api/chapterAPI";
import { getMap } from "../../api/mapAPI";
import {
  deleteExplorationPoint,
  getChapterExplorationPoints,
} from "../../api/explorationPointAPI";
import { DeleteIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Background from "../../components/background";
import Header from "../../components/header";
import styled from "styled-components";
import { BsBook } from "react-icons/bs";
import { HelpModal } from "../../components/helpModal";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { ImEvil } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FinalModal } from "../chapterEdit/finalModal";
import { ChapterNameModal } from "../chapterEdit/chapterNameModal";
import { LuText } from "react-icons/lu";
import { getPdf } from "../../api/pdfAPI";
import { PdfDownloadModalModal } from "../../components/pdfDownloadModal";

export function Chapter() {
  const { isOpen, onOpen, onClose } = useDisclosure(); //IntroductionModal

  const {
    isOpen: isOpenHelp,
    onOpen: onOpenHelp,
    onClose: onCloseHelp,
  } = useDisclosure();
  const {
    isOpen: isOpenFinal,
    onOpen: onOpenFinal,
    onClose: onCloseFinal,
  } = useDisclosure();
  const {
    isOpen: isOpenChapterName,
    onOpen: onOpenChapterName,
    onClose: onCloseChapterName,
  } = useDisclosure();

  const [helpDataKey, setHelpDataKey] = useState("");
  const { chapterId, bookId } = useParams();
  const navigate = useNavigate();

  const [chapterData, setChapterData] = useState({});
  const [mapData, setMapData] = useState({});
  const [linhasMap, setLinhasMap] = useState(1);
  const [colunasMap, setColunasMap] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [expPointArr, setExpPointArr] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(0);

  const [selectedExplorationPoint, setSelectedExplorationPoint] = useState({});
  const [updateOrAddExpPointModalType, setUpdateOrAddExpPointModalType] =
    useState("add"); //add or update

  const {
    isOpen: isOpenPdf,
    onOpen: onOpenPdf,
    onClose: onClosePdf,
  } = useDisclosure();

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!!mapData?.mapImagebase64) {
      const img = new Image();
      img.src = mapData?.mapImagebase64;

      img.onload = () => {
        setImageWidth(img.width);
        setImageHeight(img.height);
      };
    }
  }, [mapData?.mapImagebase64]);

  const getData = async () => {
    const chps = await getChapter(chapterId);
    const mps = await getMap(chps.data.mapId);
    const expPts = await getChapterExplorationPoints(chapterId, "position");

    const newExpPtsArr = [];
    await Object.keys(expPts.data).forEach((key) => {
      const newKey = convertKeyToPosition(key, mps.data.xMapSize);
      const newObj = {};
      newObj[newKey] = expPts.data[key];
      newExpPtsArr.push(newObj);
    });

    await setExpPointArr(newExpPtsArr);
    await setChapterData(chps.data);
    await setMapData(mps.data);

    await setLinhasMap(mps.data.yMapSize);
    await setColunasMap(mps.data.xMapSize);
  };

  function convertKeyToPosition(key, numColumns) {
    const [x, y] = key.split("-").map(Number);
    return (y - 1) * numColumns + x;
  }

  const generatePDF = async (bookId) => {
    const response = await getPdf(bookId);
    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
    onOpenPdf();
  };

  return (
    <Background editchapter>
      <Header />
      {isOpen && (
        <IntroductionModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          chapterData={chapterData}
        />
      )}
      {isOpenFinal && (
        <FinalModal
          isOpen={isOpenFinal}
          onOpen={onOpenFinal}
          onClose={onCloseFinal}
          chapterData={chapterData}
        />
      )}
      {isOpenChapterName && (
        <ChapterNameModal
          isOpen={isOpenChapterName}
          onOpen={onOpenChapterName}
          onClose={onCloseChapterName}
          chapterData={chapterData}
        />
      )}
      {isOpenPdf && (
        <PdfDownloadModalModal
          isOpen={isOpenPdf}
          onOpen={onOpenPdf}
          onClose={onClosePdf}
        />
      )}
      <HelpModal
        isOpen={isOpenHelp}
        onOpen={onOpenHelp}
        onClose={onCloseHelp}
        helpDataKey={helpDataKey}
      />

      <Card
        mb={[, , , 100, 300]}
        boxShadow="0px 5px 10px rgba(0, 0, 0, 0.5)"
        w={[, , , "90vw", "60vw"]}
        position={"absolute"}
        top={[, , , 100, 100]}
      >
        <ArrowBackIcon
          pos={"absolute"}
          boxSize={12}
          top={2}
          color={"#888"}
          cursor={"pointer"}
          onClick={() => navigate("..", { relative: "path" })}
        />

        <Flex
          direction="column"
          align="center"
          justify="space-evenly"
          h="100%"
          p={50}
        >
          <Flex w="100%" direction="column">
            <Text fontSize="5xl">{chapterData.name}</Text>
            <Text fontSize="2xl" mt={-3}>
              Visão Geral do Capítulo
            </Text>
          </Flex>

          <Flex direction="column" w="100%" justify="center">
            <Flex h="1px" w="100%" bgColor="black"></Flex>

            <Flex direction="column" w="100%" justify="center" mt={5}>
              <Text fontSize="lg" mb={2} fontWeight="600">
                Escolha uma das opções abaixo para adicionar ou editar
              </Text>
              <CreateUpdateIntroductionButton
                onClick={onOpenChapterName}
                borderColor="#3450ed"
                bgColor="#687efc"
              >
                <QuestionOutlineIcon
                  cursor="pointer"
                  position="absolute"
                  boxSize={5}
                  top={3}
                  right={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHelpDataKey("chapterEdit");
                    onOpenHelp();
                  }}
                />

                <Icon as={LuText} mr={5} w={10} h={10} />
                <Flex direction="column" justify="center">
                  <Text fontSize="2xl">Editar Título do Capítulo</Text>
                </Flex>
              </CreateUpdateIntroductionButton>
              <CreateUpdateIntroductionButton
                onClick={onOpen}
                borderColor="#3fb54b"
                bgColor="#63e06f"
              >
                <QuestionOutlineIcon
                  cursor="pointer"
                  position="absolute"
                  boxSize={5}
                  top={3}
                  right={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHelpDataKey("chapterEdit");
                    onOpenHelp();
                  }}
                />

                <Icon
                  as={
                    !chapterData.introduction
                      ? MdOutlineCheckBoxOutlineBlank
                      : MdOutlineCheckBox
                  }
                  mr={5}
                  w={10}
                  h={10}
                />
                <Flex direction="column" justify="center">
                  <Text fontSize="2xl">
                    Adicionar/Editar Introdução do Capítulo
                  </Text>
                  <Text fontSize="md" mt={-2}>
                    (Optional)
                  </Text>
                </Flex>
              </CreateUpdateIntroductionButton>
              <CreateUpdateIntroductionButton
                bgColor={"#ac5eff"}
                borderColor={"#9037f0"}
                onClick={onOpenFinal}
              >
                <QuestionOutlineIcon
                  cursor="pointer"
                  position="absolute"
                  boxSize={5}
                  top={3}
                  right={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHelpDataKey("chapterEdit");
                    onOpenHelp();
                  }}
                />

                <Icon
                  as={
                    !chapterData.final
                      ? MdOutlineCheckBoxOutlineBlank
                      : MdOutlineCheckBox
                  }
                  mr={5}
                  w={10}
                  h={10}
                />
                <Flex direction="column" justify="center">
                  <Text fontSize="2xl">Adicionar/Editar Final do Capítulo</Text>
                  <Text fontSize="md" mt={-2}>
                    (Optional)
                  </Text>
                </Flex>
              </CreateUpdateIntroductionButton>

              <CreateUpdateIntroductionButton
                borderColor="#e31ed9"
                bgColor="#fc68f5"
                onClick={() =>
                  navigate(`../${chapterId}/edit`, {
                    relative: "path",
                  })
                }
              >
                <QuestionOutlineIcon
                  cursor="pointer"
                  position="absolute"
                  boxSize={5}
                  top={3}
                  right={3}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHelpDataKey("chapterEdit");
                    onOpenHelp();
                  }}
                />

                <Icon as={MdModeEditOutline} mr={5} w={10} h={10} />
                <Flex direction="column" justify="center">
                  <Text fontSize="2xl">Ir para mapa de edição de seções</Text>
                </Flex>
              </CreateUpdateIntroductionButton>

              <CreateUpdateIntroductionButton
                onClick={() => generatePDF(bookId)}
                bgColor={"#ff5e5e"}
                borderColor={"#f03737"}
              >
                <Flex direction="column" justify="center">
                  <Text fontSize="xl">Gerar Arquivo PDF do Livro</Text>
                </Flex>
              </CreateUpdateIntroductionButton>
            </Flex>

            {/* <Flex direction="column" w="100%" justify="center" mt={5}>
              <Text fontSize="lg" mb={2} fontWeight="600">
                Adicione, edite ou remova marcadores:
              </Text>
              <Flex>
                <CreateUpdatePointButton
                  onClick={onOpen}
                  borderColor="#f0ac37"
                  bgColor="#fcbb4c"
                  flex="1"
                >
                  <QuestionOutlineIcon
                    cursor="pointer"
                    position="absolute"
                    boxSize={5}
                    top={3}
                    right={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHelpDataKey("chapterEdit");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={MdOutlineExplore} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Ponto de Exploração
                  </Text>
                </CreateUpdatePointButton>
                <CreateUpdatePointButton
                  onClick={onOpen}
                  borderColor="#3450ed"
                  bgColor="#687efc"
                  flex="1"
                >
                  <QuestionOutlineIcon
                    cursor="pointer"
                    position="absolute"
                    boxSize={5}
                    top={3}
                    right={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHelpDataKey("chapterEdit");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={IoPerson} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Pessoa
                  </Text>
                </CreateUpdatePointButton>
                <CreateUpdatePointButton
                  onClick={onOpen}
                  borderColor="#ed3434"
                  bgColor="#fc4c4c"
                  flex="1"
                >
                  <QuestionOutlineIcon
                    cursor="pointer"
                    position="absolute"
                    boxSize={5}
                    top={3}
                    right={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHelpDataKey("chapterEdit");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={ImEvil} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Inimigo
                  </Text>
                </CreateUpdatePointButton>
                <CreateUpdatePointButton
                  onClick={onOpen}
                  borderColor="#e31ed9"
                  bgColor="#fc68f5"
                  flex="1"
                >
                  <QuestionOutlineIcon
                    cursor="pointer"
                    position="absolute"
                    boxSize={5}
                    top={3}
                    right={3}
                    onClick={(e) => {
                      e.stopPropagation();
                      setHelpDataKey("chapterEdit");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={MdModeEditOutline} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Editar ou Excluir Marcador
                  </Text>
                </CreateUpdatePointButton>
              </Flex>
            </Flex> */}
          </Flex>
        </Flex>
      </Card>
    </Background>
  );
}

const CreateUpdatePointButton = styled(Flex)`
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  border-width: 5px;
  border-style: dashed;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 30px;
  line-height: 32px;
  font-weight: 500;
  margin-right: 20px;
  margin-bottom: 30px;
  position: relative;
`;

const CreateUpdateIntroductionButton = styled(Flex)`
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  border-width: 5px;
  border-style: dashed;
  align-items: center;
  flex-direction: row;
  color: white;
  font-size: 30px;
  line-height: 32px;
  font-weight: 500;
  margin-right: 20px;
  margin-bottom: 10px;
  position: relative;
`;
