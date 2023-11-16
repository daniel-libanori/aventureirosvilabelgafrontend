import { Card, Flex, Text, Button, Input, Icon } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';

import { addMap, getAllMaps, deleteMap } from '../../api/mapAPI';
import {BsTrash3Fill} from "react-icons/bs";


export function AddMap() {
  const navigate = useNavigate()
  const [imageBase64, setImageBase64] = useState(null);
  const [compressedImageBase64, setCompressedImageBase64] = useState(null);
  const [linhasMap, setLinhasMap] = useState(1);
  const [colunasMap, setColunasMap] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [mapName, setMapName] = useState("");
  const [maps, setMaps] = useState([]);

  useLayoutEffect(() => {
    getData()

  }, [])

  const getData = async () => {
    const maps = await getAllMaps()
    setMaps(maps?.data)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Data = event.target.result;
      setImageBase64(event.target.result);

      const tempImage = new Image();
      tempImage.src = base64Data;

      tempImage.onload = () => {
        const width = tempImage.width;
        const height = tempImage.height;

        setImageWidth(width);
        setImageHeight(height);
      };
    };

    reader.readAsDataURL(file);
  };

  function contarAteNumero(numero) {
    if (numero == 0) return [1]

    const resultado = [];
    for (let i = 1; i <= numero; i++) {
      resultado.push(i);
    }
    return resultado;
  }
  function contarLetrasAteNumero(numero) {
    const resultado = [];
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 1; i <= numero; i++) {
      let atual = i - 1;
      let contagem = '';

      do {
        contagem = alfabeto[atual % 26] + contagem;
        atual = Math.floor(atual / 26) - 1;
      } while (atual >= 0);

      resultado.push(contagem);
    }

    return resultado;
  }

  const comprimirImage = async () => {
    const compressionQuality = 10; // Ajuste a qualidade de compressão de 0 a 100

    compressImageBase64(imageBase64, compressionQuality)
      .then((compressedBase64) => {
        setCompressedImageBase64(compressedBase64)
        //console.log('Imagem comprimida:', compressedBase64);
      })
      .catch((error) => {
        console.error('Erro ao comprimir a imagem:', error);
      });
  }

  function compressImageBase64(base64String, quality) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();

            reader.onload = () => {
              const compressedBase64 = reader.result;
              resolve(compressedBase64);
            };

            canvas.toBlob(
              (blob) => {
                reader.readAsDataURL(blob);
              },
              'image/jpeg', // Você pode ajustar o formato de saída
              quality / 100
            );
          },
          'image/jpeg', // Você pode ajustar o formato de saída
          quality / 100
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    });
  }

  const addNewMap = async () => {
    await comprimirImage()

    const newMap = await addMap(mapName, parseInt(colunasMap), parseInt(linhasMap), compressedImageBase64)
    
    if(!newMap?.data?.message){
      navigate(0)
    }
    
  }

  const handleDeleteMap = async (mapId) => {
    const deletedMap = await deleteMap(mapId)
    if(!deletedMap?.data?.message){
      navigate(0)
    }
  }

  return (
    <Flex style={{ width: "100vw", minHeight: "100vh" }} alignItems="center" justify={'center'} backgroundColor="#384ba1">


      <Card h="100%">
        <Flex p={20} align='center' justify='space-between' direction="column">
          <Text fontSize='6xl'>Adicionar Mapa</Text>

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {!!imageBase64 &&
            (<>
              <Flex position="relative" mt={5}>
                {contarAteNumero(linhasMap).map(num => (
                  <Flex pos="absolute" key={num} zIndex={3} h={imageHeight / linhasMap} display="flex" align="center" left={-5} top={(num - 1) * (imageHeight / linhasMap)}>
                    <h3>{num}</h3>
                  </Flex>))}
                <Flex h={imageHeight} w={imageWidth} wrap="wrap" zIndex={2}>
                  {contarAteNumero(linhasMap * colunasMap).map((elm,idx) => (
                    <Flex h={imageHeight / linhasMap} w={imageWidth / colunasMap} border="2px solid red"
                      zIndex={2} align="center" justify="center" key={idx}
                    />))}
                </Flex>
                <img src={imageBase64} alt="Uploaded" style={{ position: "absolute" }} />
              </Flex>
              <Flex mt={0} ml={5}>
                {contarLetrasAteNumero(colunasMap).map(e => (
                  <Flex key={e} w={imageWidth / colunasMap} h={10} justify="center" align="center" zIndex={3}>
                    <h3>{e}</h3>
                  </Flex>
                ))}
              </Flex>
            </>
            )
          }
          <h5 style={{ marginTop: 10 }}>Nome do Mapa</h5>
          <Input placeholder='Nome do mapa' value={mapName} onChange={(e) => { setMapName(e.target.value) }} />

          <h5 style={{ marginTop: 10 }}>Numero de Linhas</h5>
          <Input type='number' min="1" placeholder='Numero Linhas' value={linhasMap} onChange={(e) => { setLinhasMap(e.target.value) }} />

          <h5 style={{ marginTop: 10 }}>Numero de Colunas</h5>
          <Input type='number' min="1" placeholder='Numero Colunas' value={colunasMap} onChange={(e) => { setColunasMap(e.target.value) }} />

          <Button isDisabled={!imageBase64 || mapName == "" || linhasMap < 1 || colunasMap < 1} style={{ marginTop: 10 }} onClick={addNewMap}>Adicionar Novo Mapa</Button>
        
        
          <Text>Current Maps</Text>

          { maps.length === 0 && <Text>No Maps</Text>}

          { maps.map(map => (
              <Flex key={map.id} direction="row" justify="space-between" align="center" w="100%" mt={5}>
                <Text>{map.name}</Text>
                <Icon as={BsTrash3Fill} w={5} h={5} mr={3} onClick={()=>handleDeleteMap(map.id)} cursor={"pointer"}/>
              </Flex>
            ))
          }
        
        </Flex>
      </Card>
    </Flex>
  );
}

