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

  const [enemyDataArr, setEnemyDataArr] = useState([]);
  const [enemyArr, setEnemyArr] = useState([]);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
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

  useLayoutEffect(() => {
    const getEnemiesData = async () => {
      const enemies = await getAllEnemies();
      setEnemyDataArr(enemies?.data);
    };
    getEnemiesData();
  }, []);

  useLayoutEffect(() => {
    const newExpPointArr = expPointArr
      .map((item) => item[Object.keys(item)[0]])
      .flat();
    setFormatedExpPointArr(newExpPointArr);
    if (type === "update") {
      setEnemyArr(JSON.parse(selectedExplorationPoint.enemiesArray));

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
                Deletar Ponto de Exploração
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
                      setHelpDataKey("chapterEdit");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={ImEvil} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Adicionar Inimigo
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
                      setHelpDataKey("chapterEdit");
                      onOpenHelp();
                    }}
                  />

                  <Icon as={FaFlag} w={20} h={20} />
                  <Text fontSize="2xl" align="center">
                    Fazer desse o Ponto Inicial do Capítulo
                  </Text>
                </StartPointButton>
              </Flex>
            </Flex>
          </ModalContent>
        )}

        {step === 2 && (
          <ModalContent>
            <ModalHeader>
              Criação de Novo{" "}
              {expPointEnemyOrPerson === "expPoint"
                ? "Ponto de Exploração"
                : expPointEnemyOrPerson === "person"
                ? "Dialogo com Pessoa"
                : "Inimigo"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column">
                <Text>Digite o código do seu ponto (obrigatório)</Text>
                <Input
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  placeholder="Código do seu ponto..."
                />

                <Text mt={5}>Digite o nome do seu ponto</Text>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nome do seu ponto de exploração..."
                />

                <Flex direction="row" mt={10}>
                  <Flex direction="column">
                    <Text mb={5}>
                      Agora adicione o texto ao seu ponto de exploração.
                    </Text>
                    <Textarea
                      placeholder="Insira aqui a introdução do ponto de exploração..."
                      value={introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      height={200}
                      w={400}
                    />
                    {expPointEnemyOrPerson !== "enemy" && (
                      <>
                        <Text mt={5} mb={2}>
                          Selecione o tipo do seu ponto de exploração.
                        </Text>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Select
                            placeholder="Escolha o Tipo do Ponto de Exploração"
                            value={explorationPointType}
                            onChange={(e) =>
                              setExplorationPointType(e.target.value)
                            }
                          >
                            <option value={"text"}>Texto Apenas</option>
                            {/* <option value={'fight'}>Inimigos aparecem</option> */}
                            <option value={"individual-challange"}>
                              Desafio de Rolagem individual
                            </option>
                            <option value={"group-challange"}>
                              Desafio de Rolagem em Grupo
                            </option>
                          </Select>

                          <QuestionOutlineIcon
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
                          />
                        </div>
                      </>
                    )}
                    {explorationPointType === "fight" &&
                      enemyDataArr.length > 0 && (
                        <>
                          <Text mt={5} mb={2}>
                            Selecione a quantidade de inimigos que irão
                            aparecer.
                          </Text>
                          <HStack>
                            <Button
                              {...dec}
                              onClick={() => setEnemyArr(enemyArr.slice(0, -1))}
                            >
                              -
                            </Button>
                            <Input {...input} textAlign="center" />
                            <Button {...inc}>+</Button>
                          </HStack>
                          <Text mt={5} mb={2}>
                            Agora selecione quais inimigos irão aparecer.
                          </Text>
                          {contarAteNumero(parseInt(input.value)).map(
                            (item, index) => (
                              <Select
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
                      </>
                    )}
                    {(explorationPointType === "individual-challange" ||
                      explorationPointType === "group-challange" ||
                      explorationPointType === "fight") && (
                      <>
                        <Text mt={5} mb={2}>
                          Agora adicione o texto de sucesso do seu ponto de
                          exploração.
                        </Text>
                        <Textarea
                          placeholder="Insira aqui o texto de sucesso"
                          value={successText}
                          onChange={(e) => setSuccessText(e.target.value)}
                          height={200}
                          w={400}
                        />
                        <Text mt={1} fontSize={11}>
                          *Caso não exista texto de sucesso, ele será pulado ao
                          criar o pdf do livro.
                        </Text>
                      </>
                    )}
                    {explorationPointType === "individual-challange" && (
                      <>
                        <Text mt={5} mb={2}>
                          Agora adicione o texto de fracasso do seu ponto de
                          exploração.
                        </Text>
                        <Textarea
                          placeholder="Insira aqui o texto de fracasso"
                          value={failText}
                          onChange={(e) => setFailText(e.target.value)}
                          height={200}
                          w={400}
                        />
                        <Text mt={1} fontSize={11}>
                          *Caso não exista texto de fracasso, ele será pulado ao
                          criar o pdf do livro.
                        </Text>
                      </>
                    )}
                  </Flex>

                  <Flex direction="column">
                    <Text ml={5} mb={5}>
                      Selecione o ponto que será pré-requisito para esse ponto
                      de exploração:
                    </Text>
                    <Flex
                      overflow="auto"
                      direction="column"
                      border="1px solid black"
                      w={550}
                      h={300}
                      ml={5}
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
                    <Text ml={5} mr={1} mb={5}>
                      *Caso não exista nenhum pré-requisito, ele será liberado
                      ao inicio do jogo.
                    </Text>

                    {enemyDataArr.length > 0 &&
                      explorationPointType === "fight" && (
                        <Flex px={8}>
                          <Carousel>
                            {enemyDataArr.map((e) => (
                              <div key={e.id}>
                                <img
                                  src={returnEnemyImage(e.name)}
                                  alt={e.name}
                                  style={{
                                    width: "40%",
                                    objectFit: "cover",
                                  }}
                                />
                                <p className="legend">{e.name}</p>
                              </div>
                            ))}
                          </Carousel>
                        </Flex>
                      )}
                  </Flex>
                </Flex>
              </Flex>
            </ModalBody>

            <ModalFooter mt={10} display="flex" justifyContent="flex-end">
              {type === "update" && (
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={onOpenDelete}
                  isDisabled={code.length === 0}
                >
                  Deletar Ponto de Exploracao
                </Button>
              )}
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onCreatePress}
                isDisabled={code.length === 0}
              >
                {type === "add"
                  ? "Adicionar Ponto de Exploracao"
                  : "Atualizar Ponto de Exploracao"}
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
