import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { CitiesContext, ICity } from '../context/CitiesContext';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';


const fetchCities = async (name: string) => {
  
  // чтобы запросы работали корректно, api просит указывать код языка, я решил сделать проверку на 2 языка: русский и англ.
  const langCode = /[а-я]/i.test(name) ? 'ru' : 'en';
  console.log(langCode);
  const result = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
    headers: {
      'x-rapidapi-key': 'db77f203c5msh8a075ff76ef51a6p1023a0jsn486435eeb022',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    },
    params: { namePrefix: name, languageCode: langCode || 'ru' }
  });

  console.log(result);
  return result.data.data;
}


export const SearchCity = () => {

  const [name, setName] = useState<string>('');
  const [isRequest, setIsRequest] = useState(false);
  const [citiesList, setCitiesList] = useState<ICity[]>([]);
  const context = useContext(CitiesContext);
  const [empty, setEmpty] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (name.trim().length > 2) {
      setIsRequest(true);
      // поскольку в api ограничение на кол-во запросов в секунду, я реализовал задержку на отправку данных к api
      const id = setTimeout(() => {
        setIsRequest(false);
        fetchCities(name)
          .then(result => {
            setError('');
            if (result.length > 0) {
              setCitiesList(result);
              setEmpty('');
            } else {
              setCitiesList([]);
              setEmpty('Ничего не найдено');
            }
          })
          .catch(err => setError('Произошла ошибка, попробуйте снова'))
      }, 1000)
      return () => clearTimeout(id);
    } else {
      setCitiesList([]);
    }
  }, [name])

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }

  return (
    <>
      {context.error && <Alert className="search__error" variant='danger'>{context.error}</Alert>}
      {empty && <Alert className="search__error" variant='warning'>{empty}</Alert>}
      {error && <Alert className="search__error" variant='danger'>{error}</Alert>}
      <div className="search__block">
        <Form.Control type="text" onChange={nameHandler} value={name} className="search__input" placeholder="Введите город" pattern='[\s\S]{3,}' />
      </div>
      {isRequest && (name.length > 2) ? 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> :
        <div className="search__items">
          {citiesList && citiesList.map((item: ICity) => {
            return (
              <Row className="search__item" key={item.id}>
                <Col xs={4}>{item.city}</Col>
                <Col xs={4}>{item.country}</Col>
                <Col xs={2}>{item.population}</Col>
                <Col xs={1}>
                  <Button variant="outline-success" onClick={() => {
                    setCitiesList([]);
                    setName('')
                    return context.addCity(item)
                    }}>
                      Добавить
                  </Button>
                </Col>
              </Row>
            )
        })}
      </div>   
      }
    </>
  )
}