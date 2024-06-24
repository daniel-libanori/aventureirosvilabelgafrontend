import {
  Text,
  Button,
  Input,
  Select,
  Textarea,
  HStack,
  useNumberInput,
  NumberInput,
  NumberInputField,
  useDisclosure,
  Icon,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  Box,
  Divider,
} from "@chakra-ui/react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createNewExplorationPoint,
  deleteExplorationPoint,
  updateExplorationPoint,
} from "../../api/explorationPointAPI";
import { HelpModal } from "../../components/helpModal";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { MdOutlineExplore } from "react-icons/md";
import { ImEvil } from "react-icons/im";
import { IoPerson } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import styled from "styled-components";
import { getAllEnemies } from "../../api/enemyAPI";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import EnemyI01 from "../../assets/enemy/I01.jpg";
import EnemyI02 from "../../assets/enemy/I02.jpg";
import EnemyI03 from "../../assets/enemy/I03.jpg";
import EnemyI04 from "../../assets/enemy/I04.jpg";
import { FaFlag } from "react-icons/fa";
import { updateChapter } from "../../api/chapterAPI";

export function AddExplorationPointModal({
  isOpen,
  onOpen,
  onClose,
  x,
  y,
  expPointArr,
  type,
  selectedExplorationPoint,
  chapterData,
}) {
  const [introduction, setIntroduction] = useState("");
  const [text, setText] = useState("");
  const { chapterId } = useParams();
  const [preRequisiteExpPoints, setPreRequisiteExpPoints] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [explorationPointType, setExplorationPointType] = useState("text");
  const navigate = useNavigate();
  const {
    isOpen: isOpenHelp,
    onOpen: onOpenHelp,
    onClose: onCloseHelp,
  } = useDisclosure();
  const [helpDataKey, setHelpDataKey] = useState("");
  const [formatedExpPointArr, setFormatedExpPointArr] = useState([]);

  const [step, setStep] = useState(type === "update" ? 2 : 1);

  const [expPointEnemyOrPerson, setExpPointEnemyOrPerson] = useState(""); // expPoint | enemy | person

  // Fight

  const [enemyDataArr, setEnemyDataArr] = useState([
    {
      id: 1,
      name: "I01",
      lifePoints: 1,
      attackPoints: 1,
      created_at: "2024-05-08T05:44:53.430Z",
    },
    {
      id: 2,
      name: "I02",
      lifePoints: 1,
      attackPoints: 1,
      created_at: "2024-05-08T05:44:57.259Z",
    },
    {
      id: 3,
      name: "I03",
      lifePoints: 1,
      attackPoints: 1,
      created_at: "2024-05-08T05:45:01.359Z",
    },
    {
      id: 4,
      name: "I04",
      lifePoints: 1,
      attackPoints: 1,
      created_at: "2024-05-08T05:45:25.099Z",
    },
  ]);
  const [enemyArr, setEnemyArr] = useState([]);
  const [numberInputValue, setNumberInputValue] = useState(1);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      value: numberInputValue,
      min: 1,
      max: 5,
      precision: 0,
    });

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  //challanges
  const [diceAmount, setDiceAmount] = useState(1);
  const [diceMinimumValue, setDiceMinimumValue] = useState(1);
  const [diceSuccessAmout, setDiceSuccessAmout] = useState(1);

  //challanges and fight
  const [successText, setSuccessText] = useState("");
  const [failText, setFailText] = useState("");

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();

  const input = getInputProps();

  const [selectedTab, setSelectedTab] = useState(0);

  const [enemiesNumber, setEnemiesNumber] = useState(1);

  useLayoutEffect(() => {
    const getEnemiesData = async () => {
      const enemies = await getAllEnemies();
      setEnemyDataArr(enemies?.data);
    };
    //getEnemiesData();
  }, []);

  useLayoutEffect(() => {
    const newExpPointArr = expPointArr
      .map((item) => item[Object.keys(item)[0]])
      .flat();
    setFormatedExpPointArr(newExpPointArr);
    if (type === "update") {
      setEnemyArr(JSON.parse(selectedExplorationPoint.enemiesArray));
      setNumberInputValue(
        JSON.parse(selectedExplorationPoint.enemiesArray).length
      );

      setName(selectedExplorationPoint.name);
      setCode(selectedExplorationPoint.code);
      setIntroduction(selectedExplorationPoint.introduction);
      setText(selectedExplorationPoint.text);
      setPreRequisiteExpPoints(selectedExplorationPoint.previousRelation);
      setExpPointEnemyOrPerson(selectedExplorationPoint.expPointEnemyOrPerson);

      setExplorationPointType(selectedExplorationPoint.type);
      setDiceAmount(parseInt(selectedExplorationPoint.diceAmout));
      setDiceMinimumValue(
        parseInt(selectedExplorationPoint.diceMinValueToSuccess)
      );
      setDiceSuccessAmout(
        parseInt(selectedExplorationPoint.diceAmoutToSuccess)
      );
      setSuccessText(selectedExplorationPoint.successText);
      setFailText(selectedExplorationPoint.failText);
    }
  }, []);

  const onCreatePress = async () => {
    if (type === "add") {
      const res = await createNewExplorationPoint(
        chapterId,
        name,
        code,
        x,
        y,
        introduction,
        text,
        preRequisiteExpPoints.map((e) => e.id),
        [],
        explorationPointType,
        successText,
        failText,
        parseInt(diceAmount),
        parseInt(diceMinimumValue),
        parseInt(diceSuccessAmout),
        JSON.stringify(enemyArr),
        expPointEnemyOrPerson
      );
    } else if (type === "update") {
      const res = await updateExplorationPoint(
        selectedExplorationPoint.id,
        name,
        code,
        x,
        y,
        introduction,
        text,
        preRequisiteExpPoints.map((e) => e.id),
        [],
        explorationPointType,
        successText,
        failText,
        parseInt(diceAmount),
        parseInt(diceMinimumValue),
        parseInt(diceSuccessAmout),
        JSON.stringify(enemyArr),
        expPointEnemyOrPerson
      );
    }
    navigate(0);
    onClose();
  };

  function contarAteNumero(numero) {
    if (numero == 0) return [1];

    const resultado = [];
    for (let i = 1; i <= numero; i++) {
      resultado.push(i);
    }
    return resultado;
  }

  function contarLetrasAteNumero(numero) {
    const resultado = [];
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 1; i <= numero; i++) {
      let atual = i - 1;
      let contagem = "";

      do {
        contagem = alfabeto[atual % 26] + contagem;
        atual = Math.floor(atual / 26) - 1;
      } while (atual >= 0);

      resultado.push(contagem);
    }

    return resultado[resultado.length - 1];
  }

  const returnEnemyImage = (id) => {
    switch (id) {
      case "I01":
        return EnemyI01;
      case "I02":
        return EnemyI02;
      case "I03":
        return EnemyI03;
      case "I04":
        return EnemyI04;
      default:
        return EnemyI01;
    }
  };

  const handleDelete = async () => {
    const res = await deleteExplorationPoint(selectedExplorationPoint.id);
    navigate(0);
  };

  const handleNewStartPoint = async () => {
    const res = await updateChapter(
      chapterData.id,
      chapterData.name,
      chapterData.introduction,
      chapterData.bookId,
      chapterData.mapId,
      chapterData.final,
      y,
      x
    );
    navigate(0);
  };

  return (
    <>
      <HelpModal
        isOpen={isOpenHelp}
        onOpen={onOpenHelp}
        onClose={onCloseHelp}
        helpDataKey={helpDataKey}
      />

      {isOpenDelete && (
        <AlertDialog isOpen={isOpenDelete} onClose={onCloseDelete}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Deletar Seção
              </AlertDialogHeader>

              <AlertDialogBody>
                Você tem certeza? Essa ação não poderá ser desfeita.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onCloseDelete}>Cancelar</Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Deletar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />

        {step === 1 && (
          <ModalContent>
            <Flex direction="column" w="100%" justify="center" mt={5}>
              <Text fontSize="lg" mb={2} ml={5} fontWeight="600" maxW={500}>
                O que você deseja adicionar ao seu capítulo?
              </Text>
              <Flex justify="center">
                <CreateUpdatePointButton
                  onClick={() => {
                    setStep(2);
                    setExpPointEnemyOrPerson("expPoint");
                  }}
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
                      setHelpDataKey("addExplorationPoint");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={MdOutlineExplore} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Ponto de Exploração
                  </Text>
                </CreateUpdatePointButton>
                <CreateUpdatePointButton
                  onClick={() => {
                    setStep(2);
                    setExpPointEnemyOrPerson("person");
                  }}
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
                      setHelpDataKey("addPersonDialog");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={IoPerson} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Encontro com Pessoa
                  </Text>
                </CreateUpdatePointButton>
                <CreateUpdatePointButton
                  onClick={() => {
                    setStep(2);
                    setExpPointEnemyOrPerson("enemy");
                    setExplorationPointType("fight");
                  }}
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
                      setHelpDataKey("addEnemy");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={ImEvil} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Encontro com Inimigo
                  </Text>
                </CreateUpdatePointButton>
              </Flex>

              <Flex justify="center">
                <StartPointButton
                  onClick={handleNewStartPoint}
                  borderColor="#e8741c"
                  bgColor="#fa8f3e"
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
                      setHelpDataKey("setNewInitialPosition");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={FaFlag} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Fazer desse a Posição Inicial do Capítulo
                  </Text>
                </StartPointButton>
              </Flex>
            </Flex>
          </ModalContent>
        )}

        {step === 2 && (
          <ModalContent>
            <ModalHeader>
              {type === "update" ? "Edição de" : "Criação de Novo"}{" "}
              {expPointEnemyOrPerson === "expPoint"
                ? "Ponto de Exploração"
                : expPointEnemyOrPerson === "person"
                ? "Dialogo com Pessoa"
                : "Inimigo"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Tabs */}
              <Flex w="full">
                <Box
                  display="flex"
                  justifyContent="center"
                  flex={1}
                  p={2}
                  borderBottom={`2px solid ${
                    selectedTab === 0 ? "DodgerBlue" : "gray"
                  }`}
                  borderRadius="md"
                  mr={2}
                  onClick={() => setSelectedTab(0)}
                  _hover={{ borderBottomColor: "DodgerBlue" }}
                >
                  <Text>Informações Básicas</Text>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  flex={1}
                  p={2}
                  borderBottom={`2px solid ${
                    selectedTab === 1 ? "DodgerBlue" : "gray"
                  }`}
                  borderRadius="md"
                  mr={2}
                  onClick={() => setSelectedTab(1)}
                  _hover={{ borderBottomColor: "DodgerBlue" }}
                >
                  <Text>
                    {explorationPointType === "fight"
                      ? "Informações dos Inimigos"
                      : "Tipo do Seção"}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  flex={1}
                  p={2}
                  borderBottom={`2px solid ${
                    selectedTab === 2 ? "DodgerBlue" : "gray"
                  }`}
                  borderRadius="md"
                  mr={2}
                  onClick={() => setSelectedTab(2)}
                  _hover={{ borderBottomColor: "DodgerBlue" }}
                >
                  <Text>Seção Pré-requisito</Text>
                </Box>
              </Flex>

              {selectedTab === 0 && (
                <Flex direction="column">
                  <Flex mt={5} alignItems="end">
                    <Flex direction="column" flex={1}>
                      <Text mb={1}>
                        Digite o{" "}
                        <Text as="span" fontWeight={600}>
                          código
                        </Text>{" "}
                        da sua seção{" "}
                        <Text
                          as="span"
                          fontWeight={300}
                          fontStyle="italic"
                          fontSize={14}
                        >
                          (obrigatório)
                        </Text>{" "}
                      </Text>
                      <Input
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        placeholder="Código da sua seção..."
                        mr={10}
                      />
                    </Flex>
                    <Text
                      fontStyle="italic"
                      ml={5}
                      flex={1}
                      fontWeight={300}
                      fontSize={14}
                    >
                      O código é utilizado para identificar a seção no
                      tabuleiro, de acordo com as fichas colocadas no mapa.
                    </Text>
                  </Flex>

                  <Divider mt={7} />

                  <Flex mt={7} alignItems="start">
                    <Flex direction="column" flex={1}>
                      <Text mb={1}>
                        Digite o{" "}
                        <Text as="span" fontWeight={600}>
                          nome
                        </Text>{" "}
                        da sua seção
                      </Text>
                      <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Nome da sua seção..."
                        mr={10}
                      />
                    </Flex>
                    <Text
                      fontStyle="italic"
                      ml={5}
                      flex={1}
                      fontWeight={300}
                      fontSize={14}
                      mt={7}
                    >
                      O nome é utilizado para identificar a seção no livro, de
                      acordo com a história que será contada. Pode ser o nome de
                      um acontecimento num ponto de exploração, objeto, pessoa
                      encontrada ou inimigo encontrado, por exemplo.
                    </Text>
                  </Flex>

                  <Divider mt={7} />

                  <Flex mt={7} alignItems="start">
                    <Flex direction="column" flex={1}>
                      <Text mb={1}>Agora adicione o texto à sua seção.</Text>
                      <Textarea
                        placeholder="Insira aqui o texto relativo à seção..."
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        height={200}
                      />
                    </Flex>
                    <Text
                      mt={7}
                      fontStyle="italic"
                      ml={5}
                      flex={1}
                      fontWeight={300}
                      fontSize={14}
                    >
                      O texto da sua seção será exibido no livro para os
                      jogadores. Pode conter informações sobre o local que o
                      jogador acabou de chegar, diálogos, eventos e etc.
                    </Text>
                  </Flex>
                </Flex>
              )}

              {selectedTab === 1 && (
                <Flex direction="column">
                  {expPointEnemyOrPerson !== "enemy" && (
                    <>
                      <Flex alignItems="start" mt={5} gap={5}>
                        <Flex direction="column" flex={1}>
                          <Text mb={2}>Selecione o tipo da sua seção.</Text>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <Select
                              value={explorationPointType}
                              onChange={(e) =>
                                setExplorationPointType(e.target.value)
                              }
                            >
                              <option value={"text"}>Texto Apenas</option>
                              <option value={"individual-challange"}>
                                Desafio de Rolagem individual
                              </option>
                              <option value={"group-challange"}>
                                Desafio de Rolagem em Grupo
                              </option>
                            </Select>

                            {/* <QuestionOutlineIcon
                            cursor="pointer"
                            z={10}
                            color="black"
                            boxSize={5}
                            top={4}
                            right={-6}
                            onClick={(e) => {
                              e.stopPropagation();
                              setHelpDataKey("expPointTypes");
                              onOpenHelp();
                            }}
                          /> */}
                          </div>
                        </Flex>
                        <Text
                          flex={1}
                          pt={2}
                          fontWeight={300}
                          fontSize={14}
                          fontStyle="italic"
                        >
                          <Text as="span" fontWeight={500}>
                            Apenas Texto
                          </Text>{" "}
                          - Seção que contém apenas o texto das aba de
                          informações básicas. <br />
                          <Text as="span" fontWeight={500}>
                            Desafio de Rolagem Individual
                          </Text>{" "}
                          - Desafio de rolagem de dados de apenas um jogador.{" "}
                          <br />
                          <Text as="span" fontWeight={500}>
                            Desafio de Rolagem em Grupo
                          </Text>{" "}
                          - Desafio de rolagem de dados de vários jogadores, que
                          pode ser realizado ao longo de várias rodadas para
                          andar com o marcador do trem.
                        </Text>
                      </Flex>
                      <Divider mt={7} />
                    </>
                  )}

                  {enemyDataArr.length > 0 &&
                    explorationPointType === "fight" && (
                      <Flex mt={5}>
                        <Flex px={8} w="full" justify="center">
                          <Carousel
                            showIndicators={false}
                            showStatus={false}
                            showArrows={false}
                          >
                            {enemyDataArr.map((e) => (
                              <div key={e.id}>
                                <img
                                  src={returnEnemyImage(e.name)}
                                  alt={e.name}
                                  style={{
                                    width: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <p className="legend">{e.name}</p>
                              </div>
                            ))}
                          </Carousel>
                        </Flex>
                      </Flex>
                    )}
                  {explorationPointType === "fight" &&
                    enemyDataArr.length > 0 && (
                      <>
                        <Text mt={5} mb={2}>
                          Selecione a quantidade de inimigos que irão aparecer.
                        </Text>
                        <HStack>
                          <Button
                            // {...dec}
                            disabled={enemiesNumber === 1}
                            onClick={() => {
                              if (enemiesNumber === 1) return;
                              setEnemiesNumber(enemiesNumber - 1);
                              setEnemyArr(enemyArr.slice(0, -1));
                            }}
                          >
                            -
                          </Button>
                          <Input
                            value={enemiesNumber}
                            //{...input}
                            textAlign="center"
                          />
                          <Button
                            // {...inc}
                            onClick={() => {
                              setEnemiesNumber(enemiesNumber + 1);
                            }}
                          >
                            +
                          </Button>
                        </HStack>
                        <Text mt={5} mb={2}>
                          Agora selecione quais inimigos irão aparecer.
                        </Text>
                        {contarAteNumero(parseInt(enemiesNumber)).map(
                          (item, index) => (
                            <Select
                              mb={2}
                              key={index}
                              placeholder="Escolha o inimigo que aparecerá"
                              value={enemyArr[index]}
                              onChange={(e) => {
                                const newArr = [...enemyArr];
                                newArr[index] = e.target.value;
                                setEnemyArr(newArr);
                              }}
                            >
                              {enemyDataArr.map((enemy) => (
                                <option key={enemy.name} value={enemy.name}>
                                  {enemy.name}
                                </option>
                              ))}
                            </Select>
                          )
                        )}
                      </>
                    )}
                  {(explorationPointType === "individual-challange" ||
                    explorationPointType === "group-challange") && (
                    <>
                      <Flex mt={7} alignItems="start" gap={5}>
                        <Flex direction="column" gap={2} flex={1} mt={5}>
                          <Flex direction="row" align="center">
                            <NumberInput
                              defaultValue={1}
                              min={1}
                              step={1}
                              value={diceAmount}
                              onChange={(e) => setDiceAmount(e)}
                              w={50}
                              mr={3}
                            >
                              <NumberInputField
                                textAlign="center"
                                pl={0}
                                pr={0}
                              />
                            </NumberInput>
                            <Text>Quantidade de Dados</Text>
                          </Flex>
                          <Flex direction="row" align="center">
                            <NumberInput
                              defaultValue={1}
                              min={1}
                              step={1}
                              max={6}
                              value={diceMinimumValue}
                              onChange={(e) => setDiceMinimumValue(e)}
                              w={50}
                              mr={3}
                            >
                              <NumberInputField
                                textAlign="center"
                                pl={0}
                                pr={0}
                              />
                            </NumberInput>
                            <Text>Valor Mínimo para o Sucesso</Text>
                          </Flex>
                          <Flex direction="row" align="center">
                            <NumberInput
                              defaultValue={1}
                              min={1}
                              step={1}
                              max={diceAmount}
                              value={diceSuccessAmout}
                              onChange={(e) => setDiceSuccessAmout(e)}
                              w={50}
                              mr={3}
                            >
                              <NumberInputField
                                textAlign="center"
                                pl={0}
                                pr={0}
                              />
                            </NumberInput>
                            <Text>
                              Quantidade de Dados com Valor Mínimo para Suceso
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex flex={1} direction="column">
                          <Text
                            fontWeight={300}
                            fontSize={14}
                            fontStyle="italic"
                          >
                            Selecione as variaveis para o desafio de rolagem de
                            acordo com o tipo da seção: <br /> <br />
                            <Text as="span" fontWeight={500}>
                              Desafio de Rolagem Individual
                            </Text>{" "}
                            - Certifique-se que a{" "}
                            <Text as="span" fontWeight={500}>
                              quantidade de dados
                            </Text>{" "}
                            seja maior que a quantidade de{" "}
                            <Text as="span" fontWeight={500}>
                              quantidade de dados com valor mínimo para o
                              sucesso
                            </Text>{" "}
                            , pois se não o desafio será impossível de ser
                            vencido.
                            <br />
                            <br />
                            <Text as="span" fontWeight={500}>
                              Desafio de Rolagem em Grupo
                            </Text>{" "}
                            - Sugere-se que a{" "}
                            <Text as="span" fontWeight={500}>
                              quantidade de dados
                            </Text>{" "}
                            seja menor que a quantidade de{" "}
                            <Text as="span" fontWeight={500}>
                              quantidade de dados com valor mínimo para o
                              sucesso
                            </Text>{" "}
                            , pois o desafio em grupo pode ser resolvido em mais
                            de uma rodada.
                          </Text>
                        </Flex>
                      </Flex>

                      <Divider mt={7} />
                    </>
                  )}
                  {(explorationPointType === "individual-challange" ||
                    explorationPointType === "group-challange" ||
                    explorationPointType === "fight") && (
                    <>
                      <Flex gap={5}>
                        <Flex direction="column" flex={1}>
                          <Text mt={5} mb={2}>
                            Agora adicione o texto de sucesso do sua seção.
                          </Text>
                          <Textarea
                            placeholder="Insira aqui o texto de sucesso"
                            value={successText}
                            onChange={(e) => setSuccessText(e.target.value)}
                            height={200}
                          />
                          <Text mt={1} fontSize={11}>
                            *Caso não exista texto de sucesso, ele será pulado
                            ao criar o pdf do livro.
                          </Text>
                        </Flex>
                        <Text
                          fontStyle="italic"
                          flex={1}
                          fontWeight={300}
                          fontSize={14}
                          mt={12}
                        >
                          O texto de sucesso é exibido ao jogador quando ele
                          completar o desafio de rolagem de dados ou vencer
                          inimigos. Nele você pode colocar dialogos da história,
                          recompensas e etc.
                        </Text>
                      </Flex>
                      <Divider mt={7} />
                    </>
                  )}
                  {explorationPointType === "individual-challange" && (
                    <Flex gap={5}>
                      <Flex direction="column" flex={1}>
                        <Text mt={5} mb={2}>
                          Agora adicione o texto de fracasso do sua seção.
                        </Text>
                        <Textarea
                          placeholder="Insira aqui o texto de fracasso"
                          value={failText}
                          onChange={(e) => setFailText(e.target.value)}
                          height={200}
                        />
                        <Text mt={1} fontSize={11}>
                          *Caso não exista texto de fracasso, ele será pulado ao
                          criar o pdf do livro.
                        </Text>
                      </Flex>
                      <Text
                        fontStyle="italic"
                        flex={1}
                        fontWeight={300}
                        fontSize={14}
                        mt={12}
                      >
                        O texto de fracasso é exibido ao jogador caso ele perca
                        o desafio de rolagem de dados individual (caso o jogador
                        perca para inimigos ele irá apenas desmaiar e para
                        desafios de rolagem em grupo, não há como o jogador
                        fracassar). Nele você pode colocar dialogos da história,
                        recompensas (ou penalidades) e etc.
                      </Text>
                    </Flex>
                  )}
                </Flex>
              )}

              {selectedTab === 2 && (
                <Flex mt={5}>
                  <Flex direction="column" flex={1}>
                    <Text mb={2}>
                      Selecione a seção que será pré-requisito para esse liberar
                      essa seção:
                    </Text>
                    <Flex
                      overflow="auto"
                      direction="column"
                      border="1px solid black"
                      h={300}
                    >
                      {formatedExpPointArr.map((expPoint, index) => {
                        if (expPoint.id === selectedExplorationPoint.id)
                          return null;
                        return (
                          <Flex
                            key={index}
                            border="1px solid black"
                            m={1}
                            p={1}
                            bgColor={
                              preRequisiteExpPoints.some(
                                (p) => p.id === expPoint.id
                              )
                                ? "rgba(255,255,0,0.5)"
                                : null
                            }
                            direction="column"
                            onClick={() => {
                              if (
                                preRequisiteExpPoints.some(
                                  (p) => p.id === expPoint.id
                                )
                              ) {
                                const newArr = preRequisiteExpPoints.filter(
                                  (p) => {
                                    return !(p.id == expPoint.id);
                                  }
                                );
                                setPreRequisiteExpPoints(newArr);
                              } else {
                                setPreRequisiteExpPoints([expPoint]);
                              }
                            }}
                          >
                            <Flex>
                              <Text fontWeight={600}>{expPoint.code} </Text>
                              {!!expPoint.name && (
                                <Text ml={1}>- {expPoint.name}</Text>
                              )}
                            </Flex>

                            <Text>
                              Posição:{" "}
                              <b>
                                {contarLetrasAteNumero(expPoint.xPosition)}
                                {expPoint.yPosition}
                              </b>{" "}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                    <Text mr={1} mb={5}>
                      *Caso não exista nenhum pré-requisito, ele será liberado
                      ao inicio do jogo.
                    </Text>
                  </Flex>
                  <Text
                    fontStyle="italic"
                    ml={5}
                    mt={50}
                    flex={1}
                    fontWeight={300}
                    fontSize={14}
                  >
                    Ao lado há uma lista de todos as seções que já foram criadas
                    no seu capítulo. Você pode selecionar uma seção para que
                    quando ele for completa, a seção que você está criando seja
                    liberada. <br /> <br />
                    Por exemplo: Caso eu selecione uma seção chamada "A" como
                    pré-requisito para a seção que estou criando, a seção que
                    estou criando só será liberada quando a seção "A" for
                    completa.
                  </Text>
                </Flex>
              )}
            </ModalBody>

            <ModalFooter mt={10} display="flex" justifyContent="flex-end">
              {type === "update" && (
                <Button colorScheme="blue" mr={3} onClick={onOpenDelete}>
                  Deletar Seção
                </Button>
              )}
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onCreatePress}
                isDisabled={code.length === 0}
              >
                {type === "add" ? "Adicionar Seção" : "Atualizar Seção"}
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}

const CreateUpdatePointButton = styled(Flex)`
  max-width: 300px;
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

const StartPointButton = styled(Flex)`
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
  margin-left: 35px;
  margin-right: 55px;
  margin-bottom: 30px;
  position: relative;
`;
