import { Card, Flex, Text, Button, Input, Icon } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

import { addMap, getAllMaps, deleteMap } from "../../api/mapAPI";
import { BsTrash3Fill } from "react-icons/bs";
import { createEnemy, deleteEnemy, getAllEnemies } from "../../api/enemyAPI";

export function AddEnemy() {
  const navigate = useNavigate();
  const [enemyName, setEnemyName] = useState("");
  const [enemies, setEnemies] = useState([]);

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const enemies = await getAllEnemies();
    setEnemies(enemies?.data);
  };

  const addNewEnemy = async () => {
    const newEnemy = await createEnemy(enemyName);

    if (!newEnemy?.data?.message) {
      navigate(0);
    }
  };

  const handleDeleteEnemy = async (enemyId) => {
    const deletedEnemy = await deleteEnemy(enemyId);
    if (!deletedEnemy?.data?.message) {
      navigate(0);
    }
  };

  return (
    <Flex
      style={{ width: "100vw", minHeight: "100vh" }}
      alignItems="center"
      justify={"center"}
      backgroundColor="#384ba1"
    >
      <Card h="100%">
        <Flex p={20} align="center" justify="space-between" direction="column">
          <Text fontSize="6xl">Adicionar Inimigo</Text>

          <h5 style={{ marginTop: 10 }}>Nome do Inimigo</h5>
          <Input
            placeholder="Nome do Inimigo"
            value={enemyName}
            onChange={(e) => {
              setEnemyName(e.target.value);
            }}
          />

          <Button
            isDisabled={enemyName == ""}
            style={{ marginTop: 10 }}
            onClick={addNewEnemy}
          >
            Adicionar Novo Inimigo
          </Button>

          <Text>Current Enemies</Text>

          {enemies.length === 0 && <Text>No Enemy</Text>}

          {enemies.map((enemy) => (
            <Flex
              key={enemy.id}
              direction="row"
              justify="space-between"
              align="center"
              w="100%"
              mt={5}
            >
              <Text>{enemy.name}</Text>
              <Icon
                as={BsTrash3Fill}
                w={5}
                h={5}
                mr={3}
                onClick={() => handleDeleteEnemy(enemy.id)}
                cursor={"pointer"}
              />
            </Flex>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
}
